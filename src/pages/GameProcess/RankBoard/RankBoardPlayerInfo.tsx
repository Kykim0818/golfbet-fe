import styled from "styled-components";
import { typo } from "../../../styles/typo";

type RankBoardPlayerInfoProps = {
  rank: number;
  id: string;
  imgSrc: string;
  currentScore: number;
  currentMoney: number;
  isSelf: boolean;
};

export const RankBoardPlayerInfo = ({
  rank,
  id,
  imgSrc,
  currentMoney,
  currentScore,
  isSelf,
}: RankBoardPlayerInfoProps) => {
  return (
    <S.Wrapper>
      <S.RankIcon src={getRankIconPath(rank)} alt="rank_icon" />
      <S.ProfileImgSection>
        <S.ProfileImg src={imgSrc} alt="avatar" />
      </S.ProfileImgSection>
      <S.IdSection>
        {isSelf && <div>나</div>}
        <span>{id}</span>
      </S.IdSection>
      <S.MoreInfo>
        <S.ScoreSection>
          <span>{currentScore === 0 ? "-" : currentScore}</span>
          <div>타</div>
        </S.ScoreSection>
        <S.Money>{currentMoney}원</S.Money>
      </S.MoreInfo>
    </S.Wrapper>
  );
};

function getRankIconPath(rank: number) {
  switch (rank) {
    case 1:
      return process.env.PUBLIC_URL + "/assets/svg/ic_rank_1st.svg";
    case 2:
      return process.env.PUBLIC_URL + "/assets/svg/ic_rank_2nd.svg";
    case 3:
      return process.env.PUBLIC_URL + "/assets/svg/ic_rank_3rd.svg";
    case 4:
      return process.env.PUBLIC_URL + "/assets/svg/ic_rank_4th.svg";

    default:
      return "-";
  }
}

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 4px 20px 6px 12px;
    min-height: 40px;
  `,
  RankIcon: styled.img`
    margin-right: 12px;
  `,
  SelfIcon: styled.img``,
  ProfileImgSection: styled.div`
    display: flex;
    align-items: center;
    min-width: 50px;
    max-width: 50px;
    max-height: 50px;
    min-height: 50px;

    margin-right: 15px;
  `,
  ProfileImg: styled.img``,

  //
  IdSection: styled.div`
    display: flex;
    flex-grow: 1;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      background-color: #f8f9fd;
      border-radius: 50%;
      ${typo.s10w500}
      color: #3181AE;
    }
    span {
      margin-left: 5px;
      ${typo.s14w700}
    }
  `,

  MoreInfo: styled.section`
    display: flex;
    flex-direction: column;
  `,
  ScoreSection: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    div {
      padding: 3px 5px;
      border-radius: 10px;
      background: #f8f9fd;
      ${typo.s8w500}
      color: #3181AE;
    }

    span {
      ${typo.s16w700}
      color: var(--color_main_darker, #003D45);
    }
  `,

  Money: styled.span`
    ${typo.s12w700}
    color: var(--color-main-dark, #008395);
  `,
};
