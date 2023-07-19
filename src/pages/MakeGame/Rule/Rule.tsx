import styled from "styled-components";
import { GameInfo } from "../MakeGame";
import { getDisplayText } from "./getDisplayText";
import { SpecialBetRequirements } from "./type";

type RuleProps = {
  rule: GameInfo["gameRule"];
};

export const Rule = ({ rule }: RuleProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Detail>
        <div>핸디</div>
        <div>{getDisplayText("handiType", rule.handiType[0])}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <div>배판</div>
        <div>
          {getSpecialBetRequirementsDiplay(rule.specialBetRequirements)}
        </div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <div>땅</div>
        <div>{getDisplayText("handiType", rule.handiType[0])}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <div>니어</div>
        <div>{getDisplayText("nearestType", rule.nearestType[0])}</div>
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
