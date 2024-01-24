import styled from "styled-components";
import { UNENTERED_HOLE_SCORE } from "../../../../service/socketIo/util";
import { typo } from "../../../../styles/typo";
import { GameRoomUser } from "../../GameRoom";

type ProgressPlayerRowProps = {
  isSelf: boolean;
  player: GameRoomUser;
  selectHole: number;
};

export const ProgressPlayerRow = ({
  isSelf,
  player,
  selectHole,
}: ProgressPlayerRowProps) => {
  const { imgSrc, nickName, holeScores } = player;
  return (
    <S.Wrapper>
      <S.ProfileImgSection>
        <S.ProfileImg src={imgSrc} alt="avatar" />
      </S.ProfileImgSection>
      <S.NickNameSection>
        {isSelf && <div>나</div>}
        <span>{nickName}</span>
      </S.NickNameSection>
      <S.Score>
        {holeScores[selectHole - 1] === UNENTERED_HOLE_SCORE
          ? "입력 중"
          : `${holeScores[selectHole - 1]}타`}
      </S.Score>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 4px 20px 6px 12px;
    min-height: 40px;
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
  NickNameSection: styled.div`
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

  Score: styled.span`
    ${typo.s16w700}
    color: var(--color_main_darker, #003D45);
  `,
};
