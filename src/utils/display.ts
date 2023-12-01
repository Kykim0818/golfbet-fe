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
