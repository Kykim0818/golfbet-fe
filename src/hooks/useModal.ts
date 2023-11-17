import { useEffect } from "react";
import { ModalParam } from "../components/modals/type";
import { actionModal } from "../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { increaseBackToHomePageCount, usePageRoute } from "./usePageRoute";

export const useModal = () => {
  const { moveBack } = usePageRoute();
  // const [open, setOpen] = useState(false);
  const modalStatus = useAppSelector((state) => state.modal.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (modalStatus) {
      increaseBackToHomePageCount();
      window.history.pushState(null, "", window.location.href);
      // window.addEventListener("popstate", preventGoBack);
    }
  }, [modalStatus]);

  const openModal = <T>(modalParam: ModalParam) =>
    new Promise<T>((resolve) => {
      const handleClose = (result: T) => {
        close();
        resolve(result);
      };
      dispatch(actionModal.setModalStatus({ ...modalParam, handleClose }));
    });

  function close() {
    moveBack();
    dispatch(actionModal.setModalStatus(null));
  }

  return {
    openModal,
  };
};
