import { GameInfo } from "../pages/MakeGame/MakeGame";

export const getDisplayBetTypeText = (value: string) => {
  if (value === "stroke") return "스트로크";
};

export const getDisplayBetTypeIconText = (value: string) => {
  if (value === "stroke") return "S";
};

export const getDisplayCenterTypeText = (gameType: GameInfo["gameType"]) => {
  if (gameType === "field") {
    return "필드";
  }
  return "스크린";
};

export const getDisplayEnterScore = (value: number) => {
  if (value > 0) return `+${value}`;
  return value;
};

export const getDisplayMoney = (value: number) => {
  if (value <= 0) return "0";
  return new Intl.NumberFormat().format(value);
};

/** Fix Score 돈 변화량 표시 UI 용 함수  */
export const getDisplayChangeMoney = (value: number) => {
  let prefix = value < 0 ? "" : "+";
  return `${prefix}${new Intl.NumberFormat().format(value)}`;
};

export const getDisplayDate = (date: string) => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (pattern.test(date)) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const newDate = new Date(`${date}`);
    const year = newDate.getFullYear() % 100;
    const month = newDate.getMonth() + 1;
    const day = date.split("-").pop();
    const displayDay = days[newDate.getDay()];

    return `${year}년 ${month}월 ${day}일 ${displayDay}요일`;
  }
  throw Error("date format Invalid");
};

const DOUBLE_CONDITION_DISPLAY: Record<string, string> = {
  ddang: "땅",
  buddy: "버디 이상",
  triple: "트리플 이상",
  double: "더블 이상",
  qudraple: "쿼드러플 이상",
  twoOrMoreTie: "2명 이상 동타",
  threeOrMoreTie: "3명 이상 동타",
};

// TODO
export const getDisplayDoubleText = (
  doubleConditions: string[],
  parCount: number
) => {
  if (doubleConditions.length === 0) return "홀판";
  // TODO: 기획 컨펌 후, 순서 설정
  return `${DOUBLE_CONDITION_DISPLAY[doubleConditions[0]]} 배판`;
};
