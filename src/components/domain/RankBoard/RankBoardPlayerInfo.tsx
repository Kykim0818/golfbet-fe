import styled from "styled-components";
import { typo } from "../../../styles/typo";
import { getDisplayMoney } from "../../../utils/display";

type RankBoardPlayerInfoProps = {
  rank: number;
  id: string;
  nickName: string;
  imgSrc: string;
  currentScore: number;
  currentMoney: number;
  isSelf: boolean;
};

export const RankBoardPlayerInfo = ({
  rank,
  id,
  nickName,
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
        <span>{nickName}</span>
      </S.IdSection>
      <S.MoreInfo>
        <S.ScoreSection>
          <span>{currentScore === 0 ? "-" : currentScore}</span>
          <div>타</div>
        </S.ScoreSection>
        <S.Money>{getDisplayMoney(currentMoney)}원</S.Money>
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
  ProfileImg: styled.img`
    min-width: 50px;
    max-width: 50px;
    max-height: 50px;
    min-height: 50px;
    border-radius: 50%;
  `,

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
    justify-content: flex-end;
    align-items: center;
    gap: 6px;

    div {
      padding: 0px 4px;
      border-radius: 9px;
      background: var(--color-main-light-02, #f8f9fd);
      ${typo.s10w500}
      color: var(--color-sub-blue,#3181AE)
    }

    span {
      ${typo.s16w500}
      color: var(--color-main, #009eb2);
    }
  `,

  Money: styled.span`
    ${typo.s12w700}
    color: var(--color_main_darker, #003D45);
  `,
};
