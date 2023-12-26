import { useEffect, useRef } from "react";
import { history } from "..";
import { useAppDispatch } from "./redux";
import { useModal } from "./useModal";
import { useStrictModeEffectOnce } from "./useStrictModeEffectOnce";

type Param = {
  confirmTriggerFlag?: boolean;
  args: {
    title: string;
    msg: string;
    okBtnLabel?: string;
    cancelBtnLabel?: string;
  };
  handleClickOk: () => void;
};

/** modal 형태의 페이지 (라우팅이 없는경우) 에서 뒤로가기시 이탈처리를 한번 막아야 할 경우는 페이지 이탈처리와 다른 부분이 있음 */
export const usePreventLeaveInModal = ({
  confirmTriggerFlag = false,
  args: { title, msg, okBtnLabel, cancelBtnLabel },
  handleClickOk,
}: Param) => {
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const visibleConfirmFlag = useRef(true);
  /** prevent시에 페이지의 경우 별도 처리가 필요없지만, modal의 경우는 뒤로가기 동작시에 default 상태가 modal이 닫힌상태 이기때문에 패딩 modal을 열어줘야함
   *  page : 방지시에 page -> 패딩 page , 뒤로가기눌러도 page 이므로 유지가 됨
   *  modal : page -> modal -> 패딩 페이지, 상태에서 뒤로 가기를 누르면 패딩페이지 빠지면서, modal도 닫히므로 (모달이 열린 상태에서 뒤로가기를 누르면 modal이 닫히게 되어있음)
   *  뒤로가기를 누를때, 이전 모달형 페이지가 닫히지 않도록, 뒤로가기를 한번 막아줄 패딩 모달이 필요함
   */
  useStrictModeEffectOnce(() => {
    openModal({ id: "EMPTY" });
  }, []);

  useEffect(() => {
    const event = history.listen((listener) => {
      if (
        confirmTriggerFlag &&
        listener.action === "POP" &&
        visibleConfirmFlag.current
      ) {
        // 팝업이 뜬 상태에서 다시 뒤로가기를 누를 경우 위로 중복 팝업이 안뜨게 하기 위함
        visibleConfirmFlag.current = false;
        openModal({
          id: "CONFIRM",
          args: {
            title: title ?? "나가기",
            msg:
              msg ??
              "생성중인 게임이 있습니다. \n 페이지를 나가는 경우, 입력된 정보는 잃게 됩니다.",
            okBtnLabel: okBtnLabel ?? "나가기",
            cancelBtnLabel: cancelBtnLabel ?? "닫기",
          },
        }).then((res) => {
          // confirm 에서 ok 처리
          if (res) {
            handleClickOk();
          } else {
            // cancel 처리
            console.log("패딩 페이지 삽입");
            visibleConfirmFlag.current = true;
            openModal({ id: "EMPTY" });
          }
        });
      }
    });
    return event;
  }, [
    openModal,
    dispatch,
    handleClickOk,
    confirmTriggerFlag,
    title,
    msg,
    okBtnLabel,
    cancelBtnLabel,
  ]);
};
