import styled from "styled-components";
import TitleAsset from "../../components/TitleAsset";
import { usePageRoute } from "../../hooks/usePageRoute";
import { PageStyle } from "../../styles/page";
import RankBoard from "../GameProcess/RankBoard";
import { typo } from "../../styles/typo";
import ScoreBoard from "../../components/domain/ScoreBoard";
import { GameRoomInfo } from "../GameRoom/WaitRoom/GameRoomInfo";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UNIQUE_QUERY_KEY } from "../../service/api/constant";
import { apiGetGameRoom } from "../../service/api/gameRoom";
import { getUserId } from "../../utils/getUserId";
import { divideFrontAndBackScores } from "../../utils/score";
import { getDisplayDate } from "../../utils/display";
import { ScoreHistroyRankBoard } from "./ScoreHistoryRankBoard";

export const ScoreHistoryDetail = () => {
  const { moveBack } = usePageRoute();
  // gameId Url 파싱, 게임정보 가져오기 쿼리 후 데이터 입력,
  const params = useParams();
  const gameId = params.gameId;
  const userId = getUserId();
  const { data } = useQuery(
    [UNIQUE_QUERY_KEY.GET_GAME_ROOM_INFO],
    () => apiGetGameRoom(gameId ?? ""),
    {
      retry: 0,
    }
  );
  if (data === undefined) return <div>Loading ....</div>;
  const gameRoomInfo = data?.data.gameRoomInfo;
  const rank =
    gameRoomInfo.players.findIndex((player) => player.userId === userId) + 1;
  const me = gameRoomInfo.players[rank - 1];
  // 본인 점수 픽
  const scores = divideFrontAndBackScores(me.holeScores);

  return (
    <PageStyle.Wrapper>
      <TitleAsset visibleBack handleBack={moveBack} title="상세정보" />
      <S.Body>
        <S.DateSection>
          <S.GameId>{gameRoomInfo.gameInfo.gameId}</S.GameId>
          <S.Date>{getDisplayDate(gameRoomInfo.gameInfo.startDate)}</S.Date>
        </S.DateSection>
        <GameRoomInfo
          centerType={gameRoomInfo?.gameInfo.gameType}
          name={gameRoomInfo?.gameInfo.golfCenter.name}
          betType={gameRoomInfo?.gameInfo.betType}
          betAmountPerStroke={gameRoomInfo?.gameInfo.betAmountPerStroke}
          bettingLimit={gameRoomInfo?.gameInfo.bettingLimit}
          uiType="gameEnd"
        />
        <S.TitleSection>
          <span>내 스코어</span>
          <div>{rank}위</div>
        </S.TitleSection>
        <S.ScoreBoardWrapper>
          <S.Summary>
            <div>113타 | 80,000원</div>
            <span>(니어 +10,000원)</span>
          </S.Summary>
          <ScoreBoard
            pars={gameRoomInfo.gameInfo.golfCenter.frontNineCourse.pars}
            holeScores={scores.frontNineScores}
          />
          <ScoreBoard
            pars={gameRoomInfo.gameInfo.golfCenter.frontNineCourse.pars}
            holeScores={scores.backNineScores}
          />
        </S.ScoreBoardWrapper>

        <S.TitleSection>
          <span>플레이어 스코어</span>
        </S.TitleSection>
        <S.Mid>
          <ScoreHistroyRankBoard
            players={gameRoomInfo.players}
            frontNinePars={
              gameRoomInfo.gameInfo.golfCenter.frontNineCourse.pars
            }
            backNinePars={gameRoomInfo.gameInfo.golfCenter.backNineCourse.pars}
          />
        </S.Mid>
      </S.Body>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 12px 15px 0px 15px;
    overflow: auto;
  `,

  DateSection: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  `,
  GameId: styled.span`
    color: var(--color-grey-800, "#3C4043");
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  Date: styled.span`
    ${typo.s16w700};
    color: var(--color-main-darker, #003d45);
  `,

  TitleSection: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    margin-bottom: 13px;
    span {
      ${typo.s15w500}
      color: var(--color-main-darker, #003D45);
    }
    div {
      display: flex;
      padding: 5px 10px;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      background-color: #008395;

      color: var(--color-main-light-light, #e6f7f9);
      font-size: 10px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `,

  ScoreBoardWrapper: styled.div`
    margin-bottom: 22px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fefefe;
  `,
  Summary: styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    margin: 16px 0px;

    div {
      ${typo.s16w700}
      color: var(--color-main-dark, #008395);
    }
    span {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--text-grey, #494949);
    }
  `,
  // # Rank
  Mid: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
};
