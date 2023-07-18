import styled from "styled-components";
import TitleAsset from "../../../components/TitleAsset";
import ToggleGroup from "../../../components/ToggleGroup";
import { deepClone } from "../../../utils/deepClone";
import { GAME_RULES } from "./constant";
import {
  GameRule,
  Rules,
  isDdangValue,
  isHandiTypeValue,
  isNearestTypeValue,
  isSpecialBetRequirementsValue,
} from "./type";

type RuleChangeProps = {
  gameRule: GameRule;
  playerCount: number;
  handleClose: () => void;
  onChange: (rule: GameRule) => void;
};

export const RuleChange = ({
  gameRule,
  playerCount,
  handleClose,
  onChange,
}: RuleChangeProps) => {
  const rules = getRule(playerCount);

  const handleOnChange = (ruleType: Rules["ruleType"], values: string[]) => {
    let changedRule = deepClone(gameRule);
    if (ruleType === "handiType" && isHandiTypeValue(values)) {
      changedRule.handiType = values;
    } else if (
      ruleType === "specialBetRequirements" &&
      isSpecialBetRequirementsValue(values)
    ) {
      changedRule.specialBetRequirements = values;
    } else if (ruleType === "ddang" && isDdangValue(values)) {
      changedRule.ddang = values;
    } else if (ruleType === "nearestType" && isNearestTypeValue(values)) {
      changedRule.nearestType = values;
    } else {
      throw new Error(`ruleType : ${ruleType}, values: ${values} is invalid`);
    }
    onChange(changedRule);
  };

  return (
    <Styled.Wrapper>
      <TitleAsset title="게임 규칙" handleBack={handleClose} visibleBack />
      <Styled.Body>
        {rules.map((rule) => {
          return (
            <Styled.Option>
              <span>{rule.title}</span>
              <ToggleGroup
                selectedValues={gameRule[rule.optionType]}
                group={rule.options}
                onChange={(values) => handleOnChange(rule.optionType, values)}
              />
            </Styled.Option>
          );
        })}
      </Styled.Body>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Body: styled.section`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 40px;
    padding: 0px 26px;
  `,
  Option: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    > span {
      color: var(--color-main-darker, #003d45);
      font-size: 15px;
      font-weight: 500;
      line-height: normal;
    }
  `,
};

const getRule = (playerCount: number) => {
  const newRule = [];
  // handiType
  newRule.push(GAME_RULES.handiType);

  // specialBetRequirements
  let optionSpecialBetRequirements = deepClone(
    GAME_RULES.specialBetRequirements
  );
  if (playerCount === 3) {
    optionSpecialBetRequirements.options.push({
      label: "2명이상 동타",
      value: "twoOrMorePlayersTied",
    });
  }
  newRule.push(optionSpecialBetRequirements);

  //
  newRule.push(GAME_RULES.ddang);
  newRule.push(GAME_RULES.nearestType);

  //
  return newRule;
};
