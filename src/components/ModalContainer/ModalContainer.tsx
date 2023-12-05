import { useEffect } from "react";
import { history } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actionModal } from "../../store/modal/modalSlice";
import { Modal } from "../Modal/Modal";
import EnterAndCheckScore from "../domain/EnterAndCheckScore";
import Alert from "../modals/Alert";
import { Confirm } from "../modals/Confirm/Confirm";
import { ModalParam, getModalTypeById } from "../modals/type";

export const ModalContainer = () => {
  const modalStatus = useAppSelector((state) => state.modal.status);
  const dispatch = useAppDispatch();
  // 뒤로가기
  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP") {
        dispatch(actionModal.closeModal());
      }
    });
    return event;
  }, [dispatch]);

  return (
    <>
      {modalStatus.map((modal, index) => {
        return (
          <Modal
            key={`${modal.id + index}`}
            modalType={getModalTypeById(modal.id)}
          >
            {modalChildrenSelector(modal)}
          </Modal>
        );
      })}
    </>
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
      return (
        <Confirm
          title={modalParam.args.title}
          okBtnLabel={modalParam.args.okBtnLabel}
          cancelBtnLabel={modalParam.args.cancelBtnLabel}
          contentTxt={modalParam.args.msg}
          handleBtnClick={modalParam.handleClose}
        />
      );

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
