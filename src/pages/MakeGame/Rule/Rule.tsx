import styled from "styled-components";
import { GameInfo } from "../MakeGame";
import { getDisplayText } from "./getDisplayText";
import { NearestType, SpecialBetRequirements } from "./type";

type RuleProps = {
  rule: GameInfo["gameRule"];
};

export const Rule = ({ rule }: RuleProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Detail>
        <Styled.Label>핸디</Styled.Label>
        <div>{getDisplayText("handiType", rule.handiType[0])}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <Styled.Label>배판</Styled.Label>
        <div>
          {getSpecialBetRequirementsDiplay(rule.specialBetRequirements)}
        </div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <Styled.Label>땅</Styled.Label>
        <div>{getDisplayText("ddang", rule.ddang[0])}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <Styled.Label>니어</Styled.Label>
        <div>{getDisplayNearest(rule.nearestType[0], 0)}</div>
      </Styled.Detail>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 20px;
    //
    background-color: #ffffff;
  `,
  Detail: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Label: styled.div`
    // TODO typo
    color: var(--sub-text-grey, #bcbcbc);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  Line: styled.div`
    height: 1px;
    background-color: #e3e3e3;
    margin: 15.5px 0px;
  `,
};

const getSpecialBetRequirementsDiplay = (
  values: SpecialBetRequirements["value"][]
) => {
  return values
    .map((value) => getDisplayText("specialBetRequirements", value))
    .join(",");
};

const getDisplayNearest = (value: NearestType["value"], amount: number) => {
  if (value === "ingame") return getDisplayText("nearestType", value);
  return amount;
};
