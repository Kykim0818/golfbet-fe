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
    options: {
      label: string;
      value: Rules["value"];
    }[];
  }
> = {
  handiType: {
    title: "핸디캡",
    optionType: "handiType" satisfies HandiType["ruleType"],
    options: [
      { label: "없음", value: "none" },
      { label: "선핸디", value: "pre" },
      { label: "후앤디", value: "post" },
    ] satisfies { label: string; value: HandiType["value"] }[],
  },
  specialBetRequirements: {
    title: "배판(복수 선택 가능)",
    optionType:
      "specialBetRequirements" satisfies SpecialBetRequirements["ruleType"],
    options: [
      { label: "없음", value: "none" },
      { label: "버디 이상", value: "buddy" },
      { label: "트리플 이상", value: "tripple" },
    ] satisfies { label: string; value: SpecialBetRequirements["value"] }[],
  },
  ddang: {
    title: "땅",
    optionType: "ddang" satisfies Ddang["ruleType"],
    options: [
      { label: "없음", value: "none" },
      { label: "꼴등만", value: "last" },
    ] satisfies { label: string; value: Ddang["value"] }[],
  },
  nearestType: {
    title: "니어리스트",
    optionType: "nearestType" satisfies NearestType["ruleType"],
    options: [
      { label: "게임에 포함", value: "ingame" },
      { label: "별도 지정", value: "specified" },
    ] satisfies { label: string; value: NearestType["value"] }[],
  },
};
