import { useState } from "react";
import styled from "styled-components";
import { GameRoomInfo } from "../../../pages/GameRoom/GameRoom";
import { CheckHoleScore } from "./CheckHoleScore";
import { EnterHoleScore } from "./EnterHoleScore";

type EnterAndCheckScoreProps = {
  gameRoomInfo: GameRoomInfo;
  holeCount: number;
  par: number;
};

type EnterAndCheckScoreStatus = "Enter" | "Check";

export const EnterAndCheckScore = ({
  gameRoomInfo,
  holeCount,
  par,
}: EnterAndCheckScoreProps) => {
  const [status, setStatus] = useState<EnterAndCheckScoreStatus>("Enter");
  // 예외 : par 나 holecount 없을 경우, 닫기

  const handleBack = () => {
    setStatus("Enter");
  };
  return (
    <S.Wrapper>
      <S.Header>
        <div>스코어 입력하기</div>
        <span>
          {holeCount}H | 파{par}
        </span>
      </S.Header>
      {status === "Enter" ? (
        <EnterHoleScore
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
