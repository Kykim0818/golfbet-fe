import styled, { css } from "styled-components";
import GameAbandonMark from "../../../../components/domain/GameAbandonMark";
import { typo } from "../../../../styles/typo";
import { getDisplayChangeMoney } from "../../../../utils/display";

type PlayerRowProps = {
  imgSrc: string;
  nickName: string;
  score: number;
  changeMoney: number;
  isGameQuit: boolean;
};

export const PlayerRow = ({
  imgSrc,
  nickName,
  score,
  changeMoney,
  isGameQuit,
}: PlayerRowProps) => {
  return (
    <S.Wrapper>
      <S.Profile src={imgSrc} />
      <S.NameSection>
        <S.NickName isGameQuit={isGameQuit}>{nickName}</S.NickName>
        {isGameQuit && <GameAbandonMark />}
      </S.NameSection>
      <S.ScoreAndMoney>
        <S.Score>{score}타</S.Score>
        <S.Money>{getDisplayChangeMoney(changeMoney)}원</S.Money>
      </S.ScoreAndMoney>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    border-radius: 15px;
    background-color: #fff;
    padding: 8px 15px;
  `,
  //
  Profile: styled.img`
    width: 54px;
    height: 54px;
    border-radius: 50%;
  `,
  NameSection: styled.section`
    display: flex;
    flex-grow: 1;
    gap: 9px;
  `,
  //
  NickName: styled.span<{ isGameQuit: boolean }>`
    display: flex;
    margin-left: 17px;
    ${typo.s14w700}
    ${(props) =>
      props.isGameQuit &&
      css`
        color: var(--color-gray-300, #dadce0);
      `}
  `,
  //
  ScoreAndMoney: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Score: styled.span`
    display: flex;
    justify-content: flex-end;
    ${typo.s12w700}
  `,
  Money: styled.span`
    display: flex;
    justify-content: flex-end;
    ${typo.s12w700}
    color: var(--color-main-dark,'#008395')
  `,
};
