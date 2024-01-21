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
} as const;

const displayOrder : Record<string, number> =  {
  buddy : 1,
  double: 2,
  triple : 2,
  qudraple: 2,
  twoOrMoreTie : 3,
  threeOrMoreTie : 3,
  ddang : 4,
}

export const getDisplayDoubleText = (
  doubleConditions: string[],
  parCount: number,
  playerCount: number,
) => {
  // 배판이 아니면 "홀판" 으로 표시
  if (doubleConditions.length === 0) return "홀판";
  // 해당 조건이 1개면 그대로 표시 (par 3 -> 더블 , par 4~5 -> 트리플 , par 6 이상 -> 쿼드러플)
  if (doubleConditions.length === 1) {
    const [ doubleCondition ] = doubleConditions;
    if(doubleCondition === 'triple'){
      if(parCount === 3) return DOUBLE_CONDITION_DISPLAY['double'];
      if(parCount >= 4 && parCount <= 5) return DOUBLE_CONDITION_DISPLAY['triple'];
      if(parCount >= 6) return DOUBLE_CONDITION_DISPLAY['qudraple']; 
    }else if(doubleCondition === 'twoOrMoreTie' || doubleCondition === 'threeOrMoreTie'){
      if(playerCount === 3) return DOUBLE_CONDITION_DISPLAY['twoOrMoreTie'];
      if(playerCount === 4) return DOUBLE_CONDITION_DISPLAY['threeOrMoreTie'];
    }else{
      return DOUBLE_CONDITION_DISPLAY[doubleCondition];
    }
  }
  /**
   * 표시 우선 순위 
   * 1 버디 
   * 2 더블 ,트리플, 쿼드러플 
   * 3 과반수 이상 동타
   * 4 땅
   * 땅이 안겹치면 ~~외 로 표시
   * 땅이 겹치면 ~~외(땅) 표시
   */
  doubleConditions.sort((a,b) => displayOrder[a] - displayOrder[b])
  const isDdangInclude = doubleConditions.includes('ddang');

  return `${DOUBLE_CONDITION_DISPLAY[doubleConditions[0]]} 배판 외${isDdangInclude ? '(땅)' : ''}`;
};
