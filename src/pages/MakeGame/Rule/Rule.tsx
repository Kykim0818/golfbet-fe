import styled from "styled-components";
import { GameInfo } from "../MakeGame";
import { HandiType } from "./type";

type RuleProps = {
  rule: GameInfo["gameRule"];
};

export const Rule = ({ rule }: RuleProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Detail>
        <div>핸디</div>
        <div>{getHandiDisplayTxt(rule.handiType[0])}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <div>배판</div>
        <div>{rule.specialBetRequirements.join(",")}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <div>땅</div>
        <div>{rule.ddang[0] === "none" ? "없음" : "꼴등"}</div>
      </Styled.Detail>
      <Styled.Line />
      <Styled.Detail>
        <div>니어</div>
        <div>{rule.nearestType}</div>
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

const getHandiDisplayTxt = (handiType: HandiType["value"]) => {
  if (handiType === "none") return "없음";
  if (handiType === "pre") return "선핸디";
  if (handiType === "post") return "후핸디";
};
