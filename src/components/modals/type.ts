import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";
import { RuleChangeProps } from "../../pages/MakeGame/Rule/RuleChange";
import { SetupCheckProps } from "../../pages/MakeGame/SetupCheck/SetupCheck";

const MODAL_TYPE = {
  /** 기본  */
  CENTER: 0,
  /** 바텀 시트  */
  BOTTOM_SHEET: 1,
  /** 페이지 형 */
  PAGE: 2,
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];
export type ModalParam =
  | AlertParam
  | ConfirmParam
  | RegionSelectParam
  | EnterAndCheckScoreParam
  | SetupCheckParam
  | RuleChangeParam;

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

type RegionSelectParam = {
  id: "REGION_SELECT";
  args: {};
};
type EnterAndCheckScoreParam = {
  id: "ENTER_AND_CHECK_SCORE";
  args: {
    gameRoomInfo: GameRoomInfo;
    holeCount: number;
    par: number;
  };
};

type SetupCheckParam = {
  id: "SETUP_CHECK";
  args: SetupCheckProps;
};
type RuleChangeParam = {
  id: "RULE_CHANGE";
  args: RuleChangeProps;
};

export const getModalTypeById = (id: ModalParam["id"]) => {
  switch (id) {
    case "RULE_CHANGE":
    case "SETUP_CHECK":
      return 2;

    case "REGION_SELECT":
    case "ENTER_AND_CHECK_SCORE":
      return 1;

    default:
      return 0;
  }
};
