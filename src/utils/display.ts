import { GameInfo } from "../pages/MakeGame/MakeGame";

export const getDisplayBetTypeText = (value: string) => {
  if (value === "Stroke") return "스트로크";
};

export const getDisplayBetTypeIconText = (value: string) => {
  if (value === "Stroke") return "S";
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
