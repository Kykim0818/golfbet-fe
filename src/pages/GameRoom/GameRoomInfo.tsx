import styled from "styled-components";
import Button from "../../components/Button";
import { GameInfo } from "../MakeGame/MakeGame";

type Props = {
  centerType: GameInfo["gameType"];
  name: string;
  betType: GameInfo["betType"];
  betAmountPerStroke: GameInfo["betAmountPerStroke"];
  bettingLimit: GameInfo["bettingLimit"];
};

export const GameRoomInfo = ({
  centerType,
  name,
  betType,
  betAmountPerStroke,
  bettingLimit,
}: Props) => {
  return (
    <S.Wrapper>
      {/* 1 */}
      <S.CenterNameSection>
        <S.CenterType>{getDisplayCenterTypeText(centerType)}</S.CenterType>
        <S.CenterName>{name}</S.CenterName>
      </S.CenterNameSection>
      {/* 2 */}
      <S.Info>
        <div>{getDisplayText(betType)}</div>
        <div style={{ display: "flex" }}>
          <S.BetInfo>
            <span>1타당</span>
            <span>{betAmountPerStroke}원</span>
          </S.BetInfo>
          <S.BetInfo>
            <span>한도</span>
            <span>{bettingLimit}원</span>
          </S.BetInfo>
        </div>
      </S.Info>
      {/* 3 */}
      <S.BtnGroup>
        <Button
          size="small"
          variants="custom"
          style={{ backgroundColor: "F5F5F5", color: "#004F59" }}
        >
          골프장 정보
        </Button>
        <Button size="small">규칙 보기</Button>
      </S.BtnGroup>
    </S.Wrapper>
  );
};

const getDisplayText = (value: string) => {
  if (value === "Stroke") return "스트로크";
};

const getDisplayCenterTypeText = (gameType: GameInfo["gameType"]) => {
  if (gameType === "field") {
    return "필드";
  }
  return "스크린";
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    border-radius: 15px;
    background-color: white;
    padding: 15px;
  `,
  CenterNameSection: styled.div`
    display: flex;
    gap: 10px;
  `,
  // 1
  CenterName: styled.span`
    display: flex;
    align-items: center;
    // typo
    color: #504f4f;
    font-size: 16px;
    font-weight: 700;
  `,
  CenterType: styled.span`
    border-radius: 10px;
    background: #e6f7f9;
    padding: 5px 12px;
    // typo
    color: var(--color-main-dark, #008395);
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  `,

  // 2
  Info: styled.div`
    display: flex;
    align-items: center;
  `,
  BetInfo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  // 3
  BtnGroup: styled.div`
    display: flex;
    gap: 7.5px;
  `,
};
