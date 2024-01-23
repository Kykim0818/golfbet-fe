import { useEffect } from "react";
import { history } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import DeclareDdang from "../../pages/GameRoom/InGame/DeclareDdang";
import { EnterHoleScore } from "../../pages/GameRoom/InGame/EnterHoleScore/EnterHoleScore";
import FinalizeHoleScore from "../../pages/GameRoom/InGame/FinalizeHoleScore";
import SelectNearLong from "../../pages/GameRoom/InGame/SelectNearLong";
import ViewRule from "../../pages/GameRoom/InGame/ViewRule";
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
import Alert from "../modals/Alert";
import { Confirm } from "../modals/Confirm/Confirm";
import { Empty } from "../modals/Empty/Empty";
import { ModalParam, getModalTypeById } from "../modals/type";

export const ModalContainer = () => {
  const modalStatus = useAppSelector((state) => state.modal.status);
  const dispatch = useAppDispatch();
  // 뒤로가기
  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP" && modalStatus.length > 0) {
        // 단순 뒤로가기를 통해 모달이 닫히는 경우에도 useModal - openModal에 return으로 false를 반환해주기 위한 작업
        // ISSUE: settTimeout을 사용한 이유는 confirm에서 ok를 눌럿을 경우, result (true) 를 하는 시점보다 pop 햇을때 리스너가 더 빨리 실행되어서 처리함
        setTimeout(() => {
          modalStatus?.[modalStatus.length - 1].handleCloseWithoutMoveBack(
            false
          );
        }, 100);
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
    case "VIEW_RULE":
      return <ViewRule gameRoomInfo={modalParam.args.gameRoomInfo} />;
    case "DECLARE_DDANG":
      return (
        <DeclareDdang
          lastPlayers={modalParam.args.lastPlayers}
          handleModalResult={modalParam.handleClose}
        />
      );
    // modal bottom sheet
    case "REGION_SELECT":
      return <div>Hello</div>;
    case "ENTER_HOLE_SCORE":
      return <EnterHoleScore handleModalResult={modalParam.handleClose} />;
    case "FINALIZE_HOLE_SCORE":
      return (
        <FinalizeHoleScore
          gameRoomInfo={modalParam.args.gameRoomInfo}
          playerScores={modalParam.args.playerScores}
          nearLong={modalParam.args.nearLong}
          handleModalResult={modalParam.handleClose}
        />
      );
    case "SELECT_NEAR_LONG":
      return (
        <SelectNearLong
          nearLongType={modalParam.args.nearLongType}
          players={modalParam.args.players}
          handleModalResult={modalParam.handleClose}
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
    case "EMPTY":
      return <Empty />;
    default:
      return null;
  }
};
