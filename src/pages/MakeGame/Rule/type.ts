// private
const RULE = {
  TYPE: {
    HANDI_TYPE: "handiType",
    SPECIAL_BET_REQUIREMENTS: "specialBetRequirements",
    DDANG: "ddang",
    NEAREST_TYPE: "nearestType",
  },
  HANDI_TYPE_VALUES: ["none", "pre", "post"],
  SPECIAL_BET_REQUIREMENTS_VALUES: [
    "none",
    "buddy",
    "tripple",
    "twoOrMorePlayersTied",
    "threeOrMorePlayersTied",
  ],
  DDANG_VALUES: ["none", "last"],
  NEAREST_TYPE_VALUES: ["ingame", "specified"],
} as const;

type HandiValueType = (typeof RULE.HANDI_TYPE_VALUES)[number];
type SpecialBetRequirementsValueType =
  (typeof RULE.SPECIAL_BET_REQUIREMENTS_VALUES)[number];
type DdangValueType = (typeof RULE.DDANG_VALUES)[number];
type NearestTypeValueType = (typeof RULE.NEAREST_TYPE_VALUES)[number];

// public
export type HandiType = {
  ruleType: typeof RULE.TYPE.HANDI_TYPE;
  value: HandiValueType;
};

export type SpecialBetRequirements = {
  ruleType: typeof RULE.TYPE.SPECIAL_BET_REQUIREMENTS;
  value: SpecialBetRequirementsValueType;
};

export type Ddang = {
  ruleType: typeof RULE.TYPE.DDANG;
  value: DdangValueType;
};

export type NearestType = {
  ruleType: typeof RULE.TYPE.NEAREST_TYPE;
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
  return value.every((value) => RULE.HANDI_TYPE_VALUES.includes(value));
};

export const isSpecialBetRequirementsValue = (
  value: any[]
): value is SpecialBetRequirementsValueType[] => {
  return value.every((value) =>
    RULE.SPECIAL_BET_REQUIREMENTS_VALUES.includes(value)
  );
};

export const isDdangValue = (value: any[]): value is DdangValueType[] => {
  return value.every((value) => RULE.DDANG_VALUES.includes(value));
};

export const isNearestTypeValue = (
  value: any[]
): value is NearestTypeValueType[] => {
  return value.every((value) => RULE.NEAREST_TYPE_VALUES.includes(value));
};
