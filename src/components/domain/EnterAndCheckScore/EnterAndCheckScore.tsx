import { useState } from "react";
import styled from "styled-components";
import { history } from "../../..";
import { GameRoomInfo } from "../../../pages/GameRoom/GameRoom";
import { CheckHoleScore } from "./CheckHoleScore";
import { EnterHoleScore } from "./EnterHoleScore";

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
      <S.Header>
        <div>
          <div>스코어 입력하기</div>
          <img
            onClick={handleCloseSheet}
            src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
            alt="close"
          />
        </div>
        <span>
          {holeCount}H | 파{par}
        </span>
      </S.Header>
      {status === "Enter" ? (
        <EnterHoleScore
          handleNext={handleNext}
          players={gameRoomInfo.players}
          holeCount={holeCount}
          par={par}
        />
      ) : (
        <CheckHoleScore handleBack={handleBack} />
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Header: styled.header`
    display: flex;
  `,
};
