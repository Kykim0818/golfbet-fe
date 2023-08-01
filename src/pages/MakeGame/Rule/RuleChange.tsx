import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import ToggleGroup from "../../../components/ToggleGroup";
import { deepClone } from "../../../utils/deepClone";
import { BetMoney } from "../BetMoney";
import { useGameInfo } from "../MakeGame";
import { GAME_RULES } from "./constant";
import { getDisplayText } from "./getDisplayText";
import {
  Rules,
  isDdangValue,
  isHandiTypeValue,
  isNearestTypeValue,
  isSpecialBetRequirementsValue,
} from "./type";

export const RuleChange = () => {
  const navigate = useNavigate();
  const { gameInfo } = useGameInfo();

  const multiSelectOptions: Rules["ruleType"][] = ["specialBetRequirements"];
  const rules = getRule(gameInfo.playerCount);

  const [currentRule, setCurrentRule] = useState(gameInfo.gameRule);

  const handleOnChange = (ruleType: Rules["ruleType"], values: string[]) => {
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

  return (
    <Styled.Wrapper>
      <TitleAsset
        title="게임 규칙"
        handleBack={() => navigate("make_game")}
        visibleBack
      />
      <Styled.Body>
        {rules.map((rule) => {
          return (
            <Styled.Option>
              <span>{rule.title}</span>
              <ToggleGroup
                isMultiSelect={multiSelectOptions.includes(rule.optionType)}
                selectedValues={currentRule[rule.optionType]}
                group={rule.options}
                onChange={(values) => handleOnChange(rule.optionType, values)}
              />
            </Styled.Option>
          );
        })}
        {currentRule.nearestType[0] === "specified" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <h5>니어리스트 별도 금액</h5>
            <BetMoney
              value={0}
              fixedText="1타당"
              placeHolder="금액을 입력해주세요"
              plusMoneyArr={[1000, 5000, 10000]}
            />
          </div>
        )}
      </Styled.Body>
      <Styled.Footer>
        <Button
          onClick={() => {
            // TODO: 뒤로가기
            gameInfo.gameRule = currentRule;
            navigate(-1);
          }}
        >
          수정하기
        </Button>
      </Styled.Footer>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
  `,
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
    //
    if (ruleInfo.optionType === "specialBetRequirements") {
      if (playerCount === 3) {
        ruleInfo.options.push("twoOrMorePlayersTied");
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
        label: getDisplayText(ruleTypes, value),
        value,
      };
    });
  }
};
