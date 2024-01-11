import styled from "styled-components";
import { getDisplayMoney } from "../../../../utils/display";

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
        <S.Money>{getDisplayMoney(changeMoney)}원</S.Money>
      </S.ScoreAndMoney>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
  `,
  //
  Profile: styled.img``,
  //
  NickName: styled.span``,
  //
  ScoreAndMoney: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Score: styled.span``,
  Money: styled.span``,
};
