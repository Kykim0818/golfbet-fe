import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actionModal } from "../../store/modal/modalSlice";
import { Modal } from "../Modal/Modal";
import EnterAndCheckScore from "../domain/EnterAndCheckScore";
import Alert from "../modals/Alert";
import { ModalParam, getModalTypeById } from "../modals/type";

export const ModalContainer = () => {
  const modalStatus = useAppSelector((state) => state.modal.status);
  const dispatch = useAppDispatch();
  const closeModalByUi = () => {
    dispatch(actionModal.setModalStatus(null));
  };

  return <>{modalStatus && modalSelector(modalStatus, closeModalByUi)}</>;
};

const modalSelector = (
  modalParam: ModalParam & {
    handleClose: (result?: unknown) => void;
  },
  closeModalByUi: () => void
) => {
  return (
    <Modal
      modalType={getModalTypeById(modalParam.id)}
      closeModalByUI={closeModalByUi}
    >
      {modalChildrenSelector(modalParam)}
    </Modal>
  );
};

const modalChildrenSelector = (
  modalParam: ModalParam & { handleClose: (result?: unknown) => void }
) => {
  switch (modalParam.id) {
    case "ALERT":
      return (
        <Alert
          title={modalParam.args.title}
          btnLabel={modalParam.args.okBtnLabel}
          contentTxt={modalParam.args.msg}
          handleBtnClick={modalParam.handleClose}
        />
      );
    case "CONFIRM":
      return <div>confirm</div>;

    case "REGION_SELECT":
      return <div>Hello</div>;
    case "ENTER_AND_CHECK_SCORE":
      return (
        <EnterAndCheckScore
          gameRoomInfo={modalParam.args.gameRoomInfo}
          holeCount={modalParam.args.holeCount}
          par={modalParam.args.par}
          handleCloseSheet={modalParam.handleClose}
        />
      );
    default:
      return null;
  }
};
