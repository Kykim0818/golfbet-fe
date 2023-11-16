import { useAppSelector } from "../../hooks/redux";
import { Modal } from "../Modal/Modal";
import EnterAndCheckScore from "../domain/EnterAndCheckScore";
import Alert from "../modals/Alert";
import { ModalParam, getModalTypeById } from "../modals/type";

export const ModalContainer = () => {
  const modalStatus = useAppSelector((state) => state.modal.status);
  return <>{modalStatus && modalSelector(modalStatus)}</>;
};

const modalSelector = (
  modalParam: ModalParam & { handleClose: (result?: unknown) => void }
) => {
  return (
    <Modal
      closeModalByUI={modalParam.handleClose}
      modalType={getModalTypeById(modalParam.id)}
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
