import { DISPLAY_TEXT } from "./constant";
import { Rules } from "./type";

export const getDisplayText = (
  ruleType: Rules["ruleType"],
  value: Rules["value"]
) => {
  const displayText = DISPLAY_TEXT[ruleType + "_" + value];
  if (displayText === undefined) {
    console.log("getDisplayText", ruleType, value);
    return "Unknown";
  }
  return displayText;
};
