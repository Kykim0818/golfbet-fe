import { ModalParam } from "../components/modals/type";
import { actionModal } from "../store/modal/modalSlice";
import { useAppDispatch } from "./redux";
import { increaseBackToHomePageCount, usePageRoute } from "./usePageRoute";

export const useModal = () => {
  // const navigate = useNavigate();
  const { moveBack } = usePageRoute();
  // const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const openModal = <T>(modalParam: ModalParam) =>
    new Promise<T>((resolve) => {
      const handleClose = (result: T) => {
        close();
        // ISSUE: 게임방 이동시, 모달때 패딩 페이지 넣은게 뒤로가는 것보다 게임방 이동이 먼저 일어나서, 시간을 줌
        setTimeout(() => {
          resolve(result);
        }, 100);
      };
      dispatch(actionModal.setModalStatus({ ...modalParam, handleClose }));
      increaseBackToHomePageCount();
      window.history.pushState(null, "", window.location.href);
    });

  function close() {
    moveBack();
    dispatch(actionModal.setModalStatus(null));
  }

  return {
    openModal,
  };
};
