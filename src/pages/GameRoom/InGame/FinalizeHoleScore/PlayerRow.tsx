import styled from "styled-components";
import { typo } from "../../../../styles/typo";
import { getDisplayChangeMoney } from "../../../../utils/display";

type PlayerRowProps = {
  imgSrc: string;
  nickName: string;
  score: number;
  changeMoney: number;
};

export const PlayerRow = ({
  imgSrc,
  nickName,
  score,
  changeMoney,
}: PlayerRowProps) => {
  return (
    <S.Wrapper>
      <S.Profile src={imgSrc} />
      <S.NickName>{nickName}</S.NickName>
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
  //
  NickName: styled.span`
    display: flex;
    flex-grow: 1;
    margin-left: 17px;
    ${typo.s14w700}
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
