import styled from "styled-components";
import { GameRoomInfo } from "../../GameRoom";

type ViewScoreProps = {
  gameRoomInfo: GameRoomInfo;
};

export const ViewScore = ({ gameRoomInfo }: ViewScoreProps) => {
  // 진행중인 홀 - 1 홀까지 점수 표시
  // 선택 한 홀 만큼 가로로 스크롤 당겨 줘야 함
  return <S.Wrapper></S.Wrapper>;
};

const S = {
  Wrapper: styled.div`
    display: flex;
  `,
};
