import { EnterScoreResult } from "./EnterHoleScore/EnterHoleScore";
import { InGameInfo } from "./type";

/** 꼴등 찾기 */
export const findLastRankPlayer = (
  playerScores: EnterScoreResult["playerScores"]
) => {
  let maxStroke = Number.MIN_SAFE_INTEGER;
  Object.entries(playerScores).forEach(([_, score]) => {
    if (maxStroke < score) maxStroke = score;
  });

  let lastRankPlayers: string[] = [];
  Object.entries(playerScores).forEach(([userId, score]) => {
    if (maxStroke === score) lastRankPlayers.push(userId);
  });
  return lastRankPlayers;
};

export const isApplyDdang = (
  holeIdx: number,
  holeInfo: InGameInfo["holeInfos"]
) => {
  if (holeIdx === 0 || holeIdx > 17) return false;
  return holeInfo[holeIdx - 1].ddang ?? false;
};
