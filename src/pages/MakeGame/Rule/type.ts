// private
const RULE = {
  HANDI_TYPES: ["none", "pre", "post"],
  SPECIAL_BET_REQUIREMENTS: [
    "none",
    "buddy",
    "tripple",
    "twoOrMorePlayersTied",
    "threeOrMorePlayersTied",
  ],
  DDANG: ["none", "last"],
  NEAREST_TYPE: ["ingame", "specified"],
} as const;

type HandiValueType = (typeof RULE.HANDI_TYPES)[number];
type SpecialBetRequirementsValueType =
  (typeof RULE.SPECIAL_BET_REQUIREMENTS)[number];
type DdangValueType = (typeof RULE.DDANG)[number];
type NearestTypeValueType = (typeof RULE.NEAREST_TYPE)[number];

// public
export type HandiType = {
  ruleType: "handiType";
  value: HandiValueType;
};

export type SpecialBetRequirements = {
  ruleType: "specialBetRequirements";
  value: SpecialBetRequirementsValueType;
};

export type Ddang = {
  ruleType: "ddang";
  value: DdangValueType;
};

export type NearestType = {
  ruleType: "nearestType";
  value: NearestTypeValueType;
};

export type Rules = HandiType | SpecialBetRequirements | Ddang | NearestType;

export type GameRule = {
  handiType: HandiValueType[];
  specialBetRequirements: SpecialBetRequirementsValueType[];
  ddang: DdangValueType[];
  nearestType: NearestTypeValueType[];
};

// typeGuard
export const isHandiTypeValue = (value: any[]): value is HandiValueType[] => {
  return value.every((value) => RULE.HANDI_TYPES.includes(value));
};

export const isSpecialBetRequirementsValue = (
  value: any[]
): value is SpecialBetRequirementsValueType[] => {
  return value.every((value) => RULE.SPECIAL_BET_REQUIREMENTS.includes(value));
};

export const isDdangValue = (value: any[]): value is DdangValueType[] => {
  return value.every((value) => RULE.DDANG.includes(value));
};

export const isNearestTypeValue = (
  value: any[]
): value is NearestTypeValueType[] => {
  return value.every((value) => RULE.NEAREST_TYPE.includes(value));
};
