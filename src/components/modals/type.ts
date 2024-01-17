import { DeclareDdangProps } from "../../pages/GameRoom/InGame/DeclareDdang/DelcareDdang";
import { FixHoleScoreProps } from "../../pages/GameRoom/InGame/FixHoleScore/FixHoleScore";
import { SelectNearLongProps } from "../../pages/GameRoom/InGame/SelectNearLong/SelectNearLong";
import { ViewRuleProps } from "../../pages/GameRoom/InGame/ViewRule/ViewRule";
import { RoomCenterProps } from "../../pages/GameRoom/WaitRoom/RoomCenter/RoomCenter";
import { RoomQrProps } from "../../pages/GameRoom/WaitRoom/RoomQr/RoomQr";
import { RoomRuleProps } from "../../pages/GameRoom/WaitRoom/RoomRule/RoomRule";
import { MakeGolfCenterDetailProps } from "../../pages/MakeGame/MakeGolfCenter/MakeGolfCenterDetail";
import { RuleChangeProps } from "../../pages/MakeGame/Rule/RuleChange";
import { SelectGolfCenterProps } from "../../pages/MakeGame/SelectGolfCenter/SelectGolfCenter";
import { SetupCheckProps } from "../../pages/MakeGame/SetupCheck/SetupCheck";

const MODAL_TYPE = {
  /** 기본  */
  CENTER: 0,
  /** 바텀 시트  */
  BOTTOM_SHEET: 1,
  /** 페이지 형 */
  PAGE: 2,
  /** 패딩 */
  EMPTY: 3,
  /** 기본인데 뒤에 내용이 가려지는 모달 */
  BACKGROUND_CNETER: 4,
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export type ModalParam =
  //
  | AlertParam
  | ConfirmParam
  | DeclareDdangParam
  | ViewRuleParam
  //
  | RegionSelectParam
  | EnterHoleScoreParam
  | FixHoleScoreParam
  | SelectNearLongParam
  //
  | SetupCheckParam
  | RuleChangeParam
  | SelectGolfCenterParam
  | MakeGolfCenterParam
  | MakeGolfCenterDetailParam
  | RoomCenterParam
  | RoomRuleParam
  | RoomQrParam
  | EmptyParam;

type AlertParam = {
  id: "ALERT";
  args: {
    title: string;
    msg: string;
    okBtnLabel: string;
  };
};
type ConfirmParam = {
  id: "CONFIRM";
  args: {
    title: string;
    msg: string;
    okBtnLabel?: string;
    cancelBtnLabel?: string;
  };
};
type DeclareDdangParam = {
  id: "DECLARE_DDANG_PARAM";
  args: DeclareDdangProps;
};

type EmptyParam = {
  id: "EMPTY";
};
type ViewRuleParam = {
  id: "VIEW_RULE";
  args: ViewRuleProps;
};

// bottom sheet
type RegionSelectParam = {
  id: "REGION_SELECT";
  args: {};
};
type EnterHoleScoreParam = {
  id: "ENTER_HOLE_SCORE";
};
type FixHoleScoreParam = {
  id: "FIX_HOLE_SCORE";
  args: FixHoleScoreProps;
};
type SelectNearLongParam = {
  id: "SELECT_NEAR_LONG";
  args: SelectNearLongProps;
};

type SetupCheckParam = {
  id: "SETUP_CHECK";
  args: SetupCheckProps;
};
type RuleChangeParam = {
  id: "RULE_CHANGE";
  args: RuleChangeProps;
};
type SelectGolfCenterParam = {
  id: "SELECT_GOLF_CENTER";
  args: SelectGolfCenterProps;
};
type MakeGolfCenterParam = {
  id: "MAKE_GOLF_CENTER";
};
type MakeGolfCenterDetailParam = {
  id: "MAKE_GOLF_CENTER_DETAIL";
  args: MakeGolfCenterDetailProps;
};
type RoomCenterParam = {
  id: "ROOM_CENTER";
  args: RoomCenterProps;
};
type RoomRuleParam = {
  id: "ROOM_RULE";
  args: RoomRuleProps;
};
type RoomQrParam = {
  id: "ROOM_QR";
  args: RoomQrProps;
};

export const getModalTypeById = (id: ModalParam["id"]) => {
  switch (id) {
    case "EMPTY":
      return MODAL_TYPE.EMPTY;

    case "RULE_CHANGE":
    case "SETUP_CHECK":
    case "SELECT_GOLF_CENTER":
    case "MAKE_GOLF_CENTER":
    case "MAKE_GOLF_CENTER_DETAIL":
    case "ROOM_CENTER":
    case "ROOM_RULE":
    case "ROOM_QR":
      return MODAL_TYPE.PAGE;

    case "REGION_SELECT":
    case "ENTER_HOLE_SCORE":
    case "FIX_HOLE_SCORE":
    case "SELECT_NEAR_LONG":
      return MODAL_TYPE.BOTTOM_SHEET;

    case "DECLARE_DDANG_PARAM":
      return MODAL_TYPE.BACKGROUND_CNETER;

    default:
      return MODAL_TYPE.CENTER;
  }
};
