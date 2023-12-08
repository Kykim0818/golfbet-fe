import styled from "styled-components";
import Button from "../../../components/Button";
import { GameInfo } from "../../../pages/MakeGame/MakeGame";
import { typo } from "../../../styles/typo";
import {
  getDisplayBetTypeIconText,
  getDisplayBetTypeText,
  getDisplayCenterTypeText,
  getDisplayMoney,
} from "../../../utils/display";

type Props = {
  centerType: GameInfo["gameType"];
  name: string;
  betType: GameInfo["betType"];
  betAmountPerStroke: GameInfo["betAmountPerStroke"];
  bettingLimit: GameInfo["bettingLimit"];
  uiType?: "waitRoom" | "gameEnd";

  // 아래 2개는 waitRoom 일때만 사용 더 확장 될 시, GameInfoSection을 분리
  handleOpenRoomCenter?: () => Promise<void>;
  handleOpenRoomRule?: () => Promise<void>;
};

export const GameInfoSection = ({
  centerType,
  name,
  betType,
  betAmountPerStroke,
  bettingLimit,
  uiType = "waitRoom",
  handleOpenRoomCenter,
  handleOpenRoomRule,
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
        <div style={{ display: "flex", gap: "9px" }}>
          <S.BetIcon>{getDisplayBetTypeIconText(betType)}</S.BetIcon>
          <S.BetTypeText>{getDisplayBetTypeText(betType)}</S.BetTypeText>
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <S.BetMoneyInfo>
            <S.BetMoneyText>1타당</S.BetMoneyText>
            <S.MoneySection>
              <S.Money>{getDisplayMoney(betAmountPerStroke)}</S.Money>
              <span>원</span>
            </S.MoneySection>
          </S.BetMoneyInfo>
          <S.BetMoneyInfo>
            <S.BetMoneyText>게임 준비금</S.BetMoneyText>
            <S.MoneySection>
              <S.Money>{getDisplayMoney(bettingLimit)}</S.Money>
              <span>원</span>
            </S.MoneySection>
          </S.BetMoneyInfo>
        </div>
      </S.Info>
      {/* 3 */}
      {uiType === "waitRoom" && (
        <S.BtnGroup>
          <Button
            size="small"
            variants="custom"
            style={{ backgroundColor: "F5F5F5", color: "#004F59" }}
            onClick={handleOpenRoomCenter}
          >
            골프장 정보
          </Button>
          <Button size="small" onClick={handleOpenRoomRule}>
            규칙 보기
          </Button>
        </S.BtnGroup>
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    border-radius: 15px;
    background-color: white;
    padding: 15px;
    margin-bottom: 16px;
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
    gap: 45px;
    border-radius: 15px;
    background-color: #f8fafb;
    padding: 12px 23px;
  `,
  BetIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
    height: 19px;
    border-radius: 2px;
    background: #008395;

    // typo
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  BetTypeText: styled.div`
    ${typo.s14w700}
  `,
  BetMoneyInfo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  BetMoneyText: styled.span`
    ${typo.s10w400}
    color: #504F4F
  `,
  MoneySection: styled.div`
    display: flex;
    span {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  Money: styled.span`
    ${typo.s12w700}
    color: #008395;
  `,
  // 3
  BtnGroup: styled.div`
    display: flex;
    gap: 7.5px;
  `,
};
