import {
  Ddang,
  HandiType,
  NearestType,
  Rules,
  SpecialBetRequirements,
} from "./type";

export const GAME_RULES: Record<
  Rules["ruleType"],
  {
    title: string;
    optionType: Rules["ruleType"];
    options: Rules["value"][];
  }
> = {
  handiType: {
    title: "핸디캡",
    optionType: "handiType" satisfies HandiType["ruleType"],
    options: [
      "none",
      "frontHandicap",
      "backHandicap",
    ] satisfies HandiType["value"][],
  },
  specialBetRequirements: {
    title: "배판(복수 선택 가능)",
    optionType:
      "specialBetRequirements" satisfies SpecialBetRequirements["ruleType"],
    options: [
      "none",
      "buddy",
      "triple",
    ] satisfies SpecialBetRequirements["value"][],
  },
  ddang: {
    title: "땅",
    optionType: "ddang" satisfies Ddang["ruleType"],
    options: ["none", "onlyLastPlace"] satisfies Ddang["value"][],
  },
  nearestType: {
    title: "니어리스트",
    optionType: "nearestType" satisfies NearestType["ruleType"],
    options: [
      "includeInGame",
      "separateAmount",
    ] satisfies NearestType["value"][],
  },
};

export const DISPLAY_TEXT: Record<string, string> = {
  handiType_none: "없음",
  handiType_frontHandicap: "선핸디",
  handiType_backHandicap: "후핸디",
  specialBetRequirements_none: "없음",
  specialBetRequirements_buddy: "버디",
  specialBetRequirements_triple: "트리플",
  specialBetRequirements_twoOrMoreTie: "2명이상 동타",
  specialBetRequirements_threeOrMoreTie: "3명이상 동타",
  ddang_none: "없음",
  ddang_onlyLastPlace: "꼴등만",
  nearestType_includeInGame: "게임에 포함",
  nearestType_separateAmount: "별도 지정",
};
