import styled from "styled-components";
import { useAppSelector } from "../../../hooks/redux";
import { GameRoomUser } from "../../../pages/GameRoom/GameRoom";
import { deepClone } from "../../../utils/deepClone";
import { RankBoardPlayerInfo } from "./RankBoardPlayerInfo";
import { getPlayersRank } from "../../../utils/getPlayersRank";

type RankBoardProps = {
  players: GameRoomUser[];
};

export const RankBoard = ({ players }: RankBoardProps) => {
  // # 점수 별로 소팅
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const sortedPlayerByScore = getPlayersRank(players);
  const userId = userInfo.userId;
  return (
    <S.Wrapper>
      {sortedPlayerByScore.map((player, index) => {
        return (
          <RankBoardPlayerInfo
            key={player.userId}
            rank={index + 1}
            id={player.userId}
            nickName={player.nickName}
            imgSrc={player.imgSrc}
            isSelf={player.userId === userId}
            currentMoney={player.currentMoney}
            currentScore={player.currentScore}
            isGameQuit={player.isGameQuit}
          />
        );
      })}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};
