import { useEffect } from "react";
import { history } from "..";
import { useModal } from "./useModal";
import { useStrictModeEffectOnce } from "./useStrictModeEffectOnce";

type Param = {
  confirmTriggerFlag?: boolean;
};

/**
 * 아예 모달에서 뒤로가기 방지 훅
 * @param param0
 */
export const usePreventBackInModal = ({
  confirmTriggerFlag = false,
}: Param) => {
  const { openModal } = useModal();
  // strictMode 에서는 패딩이 2번 작동하여 문제 발생
  useStrictModeEffectOnce(() => {
    openModal({ id: "EMPTY" });
  }, []);

  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP" && confirmTriggerFlag) {
        // 뒤로가기가 눌렸으니, 취소 했을 때 다시 뒤로가기시에 팝업 떠야해서 다시 패딩 추가
        openModal({ id: "EMPTY" });
      }
    });
    return event;
  }, [confirmTriggerFlag]);
};
