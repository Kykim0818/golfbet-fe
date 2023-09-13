import styled from "styled-components";

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
      <S.ProfileImg src={imgSrc} alt="profile_image" />
      {isSelf && <S.SelfIcon />}
      <S.Id>{id}</S.Id>
      <S.Section>
        <div>
          <S.Score>{currentScore === 0 ? "-" : currentScore}</S.Score>
          <S.ScoreUnit>타</S.ScoreUnit>
        </div>
        <S.Money>{currentMoney}</S.Money>
      </S.Section>
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
  `,
  RankIcon: styled.img``,
  SelfIcon: styled.img``,
  ProfileImg: styled.img``,

  Id: styled.span``,

  Section: styled.section`
    display: flex;
    flex-direction: column;
  `,
  Score: styled.span``,
  ScoreUnit: styled.span``,
  Money: styled.span``,
};
