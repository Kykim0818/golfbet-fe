import { useState } from "react";
import styled from "styled-components";
import { history } from "../../..";
import { GameRoomInfo } from "../../../pages/GameRoom/GameRoom";
import { CheckHoleScore } from "./CheckHoleScore";
import { EnterHoleScore } from "./EnterHoleScore";
import { typo } from "../../../styles/typo";

type EnterAndCheckScoreProps = {
  handleCloseSheet: () => void;
  gameRoomInfo: GameRoomInfo;
  holeCount: number;
  par: number;
};

type EnterAndCheckScoreStatus = "Enter" | "Check";

export const EnterAndCheckScore = ({
  handleCloseSheet,
  gameRoomInfo,
  holeCount,
  par,
}: EnterAndCheckScoreProps) => {
  const [status, setStatus] = useState<EnterAndCheckScoreStatus>("Enter");
  // 예외 : par 나 holecount 없을 경우, 닫기
  const handleNext = () => {
    setStatus("Check");
  };
  const handleBack = () => {
    history.back();
    setStatus("Enter");
  };

  return (
    <S.Wrapper>
      <S.ModalHeader>
        <div className="modalheader__title">스코어 입력하기</div>
        <img
          onClick={handleCloseSheet}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.HoleInfo>
        {holeCount}H | 파{par}
      </S.HoleInfo>
      <EnterHoleScore
        handleNext={handleCloseSheet}
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
