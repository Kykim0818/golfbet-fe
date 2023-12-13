import { useEffect, useRef } from "react";
import { history } from "..";
import { useAppDispatch } from "./redux";
import { useModal } from "./useModal";
import { usePageRoute } from "./usePageRoute";

type Param = {
  confirmTriggerFlag?: boolean;
  args: {
    title: string;
    msg: string;
    okBtnLabel?: string;
    cancelBtnLabel?: string;
  };
};

export const usePreventLeaveInModal = ({
  confirmTriggerFlag = false,
  args: { title, msg, okBtnLabel, cancelBtnLabel },
}: Param) => {
  const { openModal } = useModal();
  const { moveBack } = usePageRoute();
  const dispatch = useAppDispatch();

  const visibleConfirmFlag = useRef(true);

  useEffect(() => {
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
            moveBack();
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
    moveBack,
    confirmTriggerFlag,
    title,
    msg,
    okBtnLabel,
    cancelBtnLabel,
  ]);
};
