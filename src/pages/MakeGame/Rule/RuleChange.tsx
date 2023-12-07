import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import ToggleGroup from "../../../components/ToggleGroup";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { PageStyle } from "../../../styles/page";
import { deepClone } from "../../../utils/deepClone";
import { BetMoney } from "../BetMoney";
import { GameInfo } from "../MakeGame";
import { GAME_RULES } from "./constant";
import { getDisplayRuleText } from "./getDisplayText";
import {
  GameRule,
  Rules,
  isDdangValue,
  isHandiTypeValue,
  isNearestTypeValue,
  isSpecialBetRequirementsValue,
} from "./type";

export type RuleChangeProps = {
  gameInfo: GameInfo;
  handleModalResult?: (result: {
    changedRule: GameRule;
    changedNearestAmount: number;
  }) => void;
};

export const RuleChange = ({
  gameInfo,
  handleModalResult,
}: RuleChangeProps) => {
  const { moveBack } = usePageRoute();

  const multiSelectOptions: Rules["ruleType"][] = ["specialBetRequirements"];
  const rules = getRule(gameInfo.playerCount);

  const [currentRule, setCurrentRule] = useState(gameInfo.gameRule);
  const [currentNearestAmount, setCurrentNearestAmount] = useState(
    gameInfo.nearestAmount
  );

  const handleRuleChange = (ruleType: Rules["ruleType"], values: string[]) => {
    let changedRule = deepClone(currentRule);
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
    setCurrentRule(changedRule);
  };

  const handleChangeNearestAmount = (money: number) => {
    setCurrentNearestAmount(money);
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset title="게임 규칙" handleBack={moveBack} visibleBack />
      <Styled.Body>
        {rules.map((rule) => {
          return (
            <Styled.Option key={rule.title}>
              <span>{rule.title}</span>
              <ToggleGroup
                isMultiSelect={multiSelectOptions.includes(rule.optionType)}
                multiSelectResetValue="none"
                selectedValues={currentRule[rule.optionType]}
                group={rule.options}
                onChange={(values) => handleRuleChange(rule.optionType, values)}
              />
            </Styled.Option>
          );
        })}
        {currentRule.nearestType[0] === "separateAmount" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <h5>니어리스트 별도 금액</h5>
            <BetMoney
              value={currentNearestAmount}
              fixedText="1타당"
              placeHolder="금액을 입력해주세요"
              plusMoneyArr={[1000, 5000, 10000]}
              onChange={handleChangeNearestAmount}
            />
          </div>
        )}
      </Styled.Body>
      <Styled.Footer>
        <Button
          onClick={() => {
            // TODO: 뒤로가기
            handleModalResult?.({
              changedRule: currentRule,
              changedNearestAmount: currentNearestAmount,
            });
          }}
        >
          수정하기
        </Button>
      </Styled.Footer>
    </PageStyle.Wrapper>
  );
};

const Styled = {
  Body: styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 25px;
    margin-top: 40px;
    padding: 0px 26px;

    overflow: auto;
  `,
  Footer: styled.footer`
    padding: 0px 20px 20px 20px;
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
  const copyRules = deepClone(GAME_RULES);
  //
  const newRule: {
    title: string;
    optionType: Rules["ruleType"];
    options: {
      label: string;
      value: Rules["value"];
    }[];
  }[] = Object.keys(copyRules).map((rule) => {
    const ruleInfo = copyRules[rule as Rules["ruleType"]];
    // TODO: 4인이상 생길 경우 과반수 이상 규칙 추가 필요
    if (ruleInfo.optionType === "specialBetRequirements") {
      if (playerCount === 3) {
        ruleInfo.options.push("twoOrMoreTie");
      }
      if (playerCount === 4) {
        ruleInfo.options.push("threeOrMoreTie");
      }
    }
    //
    return {
      title: ruleInfo.title,
      optionType: ruleInfo.optionType,
      options: makeOptions(ruleInfo.optionType, ruleInfo.options),
    };
  });
  //
  return newRule;

  function makeOptions(ruleTypes: Rules["ruleType"], values: Rules["value"][]) {
    return values.map((value) => {
      return {
        label: getDisplayRuleText(ruleTypes, value),
        value,
      };
    });
  }
};
