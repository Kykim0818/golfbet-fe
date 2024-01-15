import { EnterScoreResult } from "./EnterHoleScore/EnterHoleScore";

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
