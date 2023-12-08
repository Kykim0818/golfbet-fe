import { useEffect } from "react";
import { history } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RoomCenter } from "../../pages/GameRoom/WaitRoom/RoomCenter/RoomCenter";
import { RoomQr } from "../../pages/GameRoom/WaitRoom/RoomQr/RoomQr";
import { RoomRule } from "../../pages/GameRoom/WaitRoom/RoomRule/RoomRule";
import MakeGolfCenter from "../../pages/MakeGame/MakeGolfCenter";
import { MakeGolfCenterDetail } from "../../pages/MakeGame/MakeGolfCenter/MakeGolfCenterDetail";
import { RuleChange } from "../../pages/MakeGame/Rule/RuleChange";
import SelectGolfCenter from "../../pages/MakeGame/SelectGolfCenter";
import SetupCheck from "../../pages/MakeGame/SetupCheck";
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
      if (listener.action === "POP" && modalStatus.length > 0) {
        dispatch(actionModal.closeModal());
      }
    });
    return event;
  }, [dispatch, modalStatus]);

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
    // modal
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
    // modal bottom sheet
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
    // modal page
    case "SETUP_CHECK":
      return (
        <SetupCheck
          gameInfo={modalParam.args.gameInfo}
          handleModalResult={modalParam.handleClose}
        />
      );
    case "RULE_CHANGE":
      return (
        <RuleChange
          gameInfo={modalParam.args.gameInfo}
          handleModalResult={modalParam.handleClose}
        />
      );

    case "SELECT_GOLF_CENTER":
      return (
        <SelectGolfCenter
          gameInfo={modalParam.args.gameInfo}
          golfCenterList={modalParam.args.golfCenterList}
          handleModalResult={modalParam.handleClose}
        />
      );

    case "MAKE_GOLF_CENTER":
      return <MakeGolfCenter handleModalResult={modalParam.handleClose} />;

    case "MAKE_GOLF_CENTER_DETAIL":
      return (
        <MakeGolfCenterDetail
          userCustomCenterInfo={modalParam.args.userCustomCenterInfo}
          handleModalResult={modalParam.handleClose}
        />
      );

    case "ROOM_CENTER":
      return (
        <RoomCenter
          gameRoomInfo={modalParam.args.gameRoomInfo}
          userId={modalParam.args.userId}
          handleModalResult={modalParam.handleClose}
        />
      );
    case "ROOM_RULE":
      return (
        <RoomRule
          gameRoomInfo={modalParam.args.gameRoomInfo}
          userId={modalParam.args.userId}
          handleModalResult={modalParam.handleClose}
        />
      );
    case "ROOM_QR":
      return <RoomQr gameRoomInfo={modalParam.args.gameRoomInfo} />;
    default:
      return null;
  }
};
