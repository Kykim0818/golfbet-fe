import { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import TitleAsset from "../../../../components/TitleAsset";
import ToggleGroup from "../../../../components/ToggleGroup";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { PageStyle } from "../../../../styles/page";
import { deepClone } from "../../../../utils/deepClone";
import { BetMoney } from "../../../MakeGame/BetMoney";
import { GAME_RULES } from "../../../MakeGame/Rule/constant";
import { getDisplayRuleText } from "../../../MakeGame/Rule/getDisplayText";
import {
  GameRule,
  Rules,
  isDdangValue,
  isHandiTypeValue,
  isNearestTypeValue,
  isSpecialBetRequirementsValue,
} from "../../../MakeGame/Rule/type";
import { GameRoomInfo } from "../../GameRoom";

export type RoomRuleProps = {
  gameRoomInfo: GameRoomInfo;
  userId: string;
  handleModalResult?: (result: {
    changedRule: GameRule;
    changedNearestAmount: number;
  }) => void;
};

export const RoomRule = ({
  gameRoomInfo: { gameInfo, hostUserId },
  userId,
  handleModalResult,
}: RoomRuleProps) => {
  const { moveBack } = usePageRoute();
  const isRoomMaker = userId === hostUserId;
  const multiSelectOptions: Rules["ruleType"][] = ["specialBetRequirements"];
  const rules = getRule(gameInfo.playerCount);

  const [currentRule, setCurrentRule] = useState(gameInfo.gameRule);
  const [currentNearestAmount, setCurrentNearestAmount] = useState(
    gameInfo.nearestAmount
  );

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

  const handleChangeNearestAmount = (money: number) => {
    setCurrentNearestAmount(money);
  };

  const handleUpdateRoomRule = () => {
    console.log("update Game Info", currentRule, currentNearestAmount);
    if (gameInfo.gameId) {
      handleModalResult?.({
        changedRule: currentRule,
        changedNearestAmount: currentNearestAmount,
      });
    }
    console.log("gmaeInfo.gameId is undefined");
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset title="규칙 상세" handleBack={moveBack} visibleBack />
      <Styled.Body>
        {rules.map((rule) => {
          return (
            <Styled.Option key={rule.title}>
              <span>{rule.title}</span>
              <ToggleGroup
                disable={isRoomMaker === false}
                isMultiSelect={multiSelectOptions.includes(rule.optionType)}
                multiSelectResetValue="none"
                selectedValues={currentRule[rule.optionType]}
                group={rule.options}
                onChange={(values) => {
                  handleOnChange(rule.optionType, values);
                }}
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
              disable={isRoomMaker === false}
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
        {isRoomMaker && (
          <Button onClick={handleUpdateRoomRule}>수정하기</Button>
        )}
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
