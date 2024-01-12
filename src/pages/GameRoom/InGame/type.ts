// 진행중인 게임 정보
export type InGameInfo = {
  userEventHistory: [];
  holeInfos: HoleInfo[];
};

type HoleInfo = {
  /** 땅을 선언한 유저 id 배열, 최초 확정시에만 ddang 이 설정되고 수정 시에는 해당 값 수정 못함 */
  ddang: string[]; //
  /** 적용되는 배판 조건 */
  doubleConditions: string[];
  /** 실제 홀 넘버 (index 아님 주의) */
  hole: number;
  par: number; // 해당 홀 Par 수
  /** key 는 string : userId  */
  players: Record<string, PlayerInfo>;
};

type PlayerInfo = {
  /** 해당 홀의 기록 타수 */
  strokes: number;
  /** 점수 결과에 따른 금액 변화량 */
  moneyChange: number;
  /** 이전에 보유한 금액 */
  previousMoney: number;
  /** 해당 홀에서의 금액 변경 후 남은 잔액 */
  remainingMoney: number;
};
