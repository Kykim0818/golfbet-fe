import { useEffect, useRef } from "react";
import { history } from "..";
import { actionModal } from "../store/modal/modalSlice";
import { useAppDispatch } from "./redux";
import { useModal } from "./useModal";
import { increaseBackToHomePageCount } from "./usePageRoute";
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

export const usePreventLeave = ({
  confirmTriggerFlag = false,
  args: { title, msg, okBtnLabel, cancelBtnLabel },
  handleClickOk,
}: Param) => {
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const visibleConfirmFlag = useRef(true);

  // strictMode 에서는 패딩이 2번 작동하여 문제 발생
  useStrictModeEffectOnce(() => {
    window.history.pushState(null, "", window.location.href);
    increaseBackToHomePageCount();
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
        }).then((res: any) => {
          // confirm 에서 ok 처리
          console.log(res);
          if (res) {
            handleClickOk();
          } else {
            // cancel 처리
            console.log("패딩 페이지 삽입");
            dispatch(actionModal.closeModal());
            // 다시 confirm 표시되게 값 변경
            visibleConfirmFlag.current = true;
            // 뒤로가기가 눌렸으니, 취소 했을 때 다시 뒤로가기시에 팝업 떠야해서 다시 패딩 추가
            window.history.pushState(null, "", window.location.href);
            increaseBackToHomePageCount();
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
