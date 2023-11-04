import styled from "styled-components";
import { GameHistory } from "../../../service/api/gameScore";
import { typo } from "../../../styles/typo";
import { getDisplayCenterTypeText } from "../../../utils/display";

type Props = GameHistory;

export const GameSummary = ({
  date,
  gameType,
  centerName,
  players,
  score,
  totalMoneyChange,
}: Props) => {
  return (
    <S.Wrapper>
      <S.BlueMarker
        src={process.env.PUBLIC_URL + "/assets/svg/ic_blue_marker.svg"}
      />
      <S.TitleColumn>
        <S.Txt1>{date}</S.Txt1>
        <div style={{ display: "flex", gap: "10px" }}>
          <S.Chip>{getDisplayCenterTypeText(gameType)}</S.Chip>
          <S.Txt2>{centerName}</S.Txt2>
        </div>
      </S.TitleColumn>
      <S.ResultColumn>
        {/* RC1 */}
        <S.Result>
          <S.Txt1>참여인원</S.Txt1>
          <S.TxtGroup>
            <S.Txt3>{players}</S.Txt3>
            <S.TxtUnit>명</S.TxtUnit>
          </S.TxtGroup>
        </S.Result>
        {/* RC2 */}
        <S.Result>
          <S.Txt1>스코어</S.Txt1>
          <S.TxtGroup>
            <S.Txt3>{score}</S.Txt3>
            <S.TxtUnit>타</S.TxtUnit>
          </S.TxtGroup>
        </S.Result>
        {/* RC3 */}
        <S.Result>
          <S.Txt1>참여인원</S.Txt1>
          <S.TxtGroup>
            <S.Txt3>{totalMoneyChange}</S.Txt3>
            <S.TxtUnit>P</S.TxtUnit>
          </S.TxtGroup>
        </S.Result>
      </S.ResultColumn>
    </S.Wrapper>
  );
};

const S = {
  BlueMarker: styled.img`
    position: absolute;
    top: 0px;
    right: 19px;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 13px;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
  `,
  TitleColumn: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 15px;
    padding: 10px 15px;
    /* opacity: 0.3; */
    background-color: rgba(217, 243, 246, 0.3);
  `,
  ResultColumn: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  Result: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  TxtGroup: styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
  `,
  Txt1: styled.span`
    ${typo.s14w400}
  `,
  Txt2: styled.span`
    ${typo.s14w700};
    color: #3c4043;
  `,
  Txt3: styled.span`
    ${typo.s16w700};
    color: var(--color-main-darker, #003d45);
  `,
  TxtUnit: styled.span`
    color: #3c4043;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  Chip: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 12px;
    border-radius: 10px;

    background-color: var(--color-sub-blue, #3181ae);

    // typo
    ${typo.s12w500}
    color: #fff;
  `,
};
