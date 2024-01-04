import styled from "styled-components";
import { typo } from "../../../../styles/typo";
import { EnterHoleScore } from "./EnterHoleScore";
import { useAppSelector } from "../../../../hooks/redux";
import { usePageRoute } from "../../../../hooks/usePageRoute";

type EnterScoreProps = {
  handleModalResult?: (result: any) => void;
};

export const EnterScore = ({ handleModalResult }: EnterScoreProps) => {
  const { moveBack } = usePageRoute();
  const gameRoomInfo = useAppSelector((state) => state.game.gameRoomInfo);
  // 예외 : par 나 holecount 없을 경우, 닫기
  if (gameRoomInfo === undefined) moveBack();
  return (
    <S.Wrapper>
      <S.ModalHeader>
        <div className="modalheader__title">스코어 입력하기</div>
        <img
          onClick={() => handleModalResult?.(true)}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.HoleInfo>holeCount H | 파 par</S.HoleInfo>
      <EnterHoleScore
        handleNext={() => handleModalResult?.(true)}
        players={gameRoomInfo.players}
        holeCount={holeCount}
        par={par}
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ModalHeader: styled.div`
    display: flex;
    justify-content: center;

    .modalheader__title {
      top: 25px;
      position: absolute;
      ${typo.s16w700}
      color: var(--color-main, #009EB2);
    }
    img {
      top: 25px;
      position: absolute;
      right: 16.5px;
    }
  `,
  HoleInfo: styled.span`
    display: flex;
    justify-content: center;

    color: var(--color-main-darker, #003d45);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 20px;
  `,
};
