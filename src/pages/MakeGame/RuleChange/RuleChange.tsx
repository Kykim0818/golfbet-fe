import TitleAsset from "../../../components/TitleAsset";
import Toggle from "../../../components/Toggle";
import ToggleGroup from "../../../components/ToggleGroup";
import { GameInfo } from "../MakeGame";

type RuleChangeProps = {
  gameRule?: GameInfo["gameRule"];
  handleClose: () => void;
};

export const RuleChange = ({ gameRule, handleClose }: RuleChangeProps) => {
  return (
    <div>
      <TitleAsset title="게임 규칙" handleBack={handleClose} visibleBack />
      <h5>핸디캡</h5>
      <ToggleGroup value={["None"]} group={convertToggleInfo(HANDI_OPTION)} />
    </div>
  );
};

const HANDI_OPTION: GameInfo["gameRule"]["handiType"][] = [
  "None",
  "Post",
  "Pre",
];
const SPECIAL_BET_REQUIREMENT_OPTION: GameInfo["gameRule"]["spcialBetRequirements"] =
  ["없음", "버디 이상", "트리플 이상", "2명 이상 동타"];
const DDANG_OPTION: GameInfo["gameRule"]["ddang"][] = ["None", "꼴등만"];
const NEAREAST_OPTION: GameInfo["gameRule"]["nearestType"][] = [
  "별도 지정",
  "게임에 포함",
];

const convertToggleInfo = (options: string[]) => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};
