import { useCallback } from "react";
import { ModalParam } from "../components/modals/type";
import { actionModal } from "../store/modal/modalSlice";
import { useAppDispatch } from "./redux";
import { increaseBackToHomePageCount, usePageRoute } from "./usePageRoute";

export const useModal = () => {
  // const navigate = useNavigate();
  const { moveBack } = usePageRoute();
  // const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const openModal = useCallback(
    <T>(modalParam: ModalParam) => {
      return new Promise<T>((resolve) => {
        const handleClose = (result: T) => {
          moveBack();
          // ISSUE: 게임방 이동시, 모달때 패딩 페이지 넣은게 뒤로가는 것보다 게임방 이동이 먼저 일어나서, 시간을 줌
          setTimeout(() => {
            resolve(result);
          }, 100);
        };
        const handleCloseWithoutMoveBack = (result: T) => {
          resolve(result);
        };
        dispatch(
          actionModal.openModal({
            ...modalParam,
            handleClose,
            handleCloseWithoutMoveBack,
          })
        );
        increaseBackToHomePageCount();
        window.history.pushState(null, "", window.location.href);
      });
    },
    [moveBack, dispatch]
  );

  // const openModal = <T>(modalParam: ModalParam) =>

  return {
    openModal,
  };
};
