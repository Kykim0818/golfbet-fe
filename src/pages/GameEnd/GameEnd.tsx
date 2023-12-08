import styled from "styled-components";
import Button from "../../components/Button";
import TitleAsset from "../../components/TitleAsset";
import GameInfoSection from "../../components/domain/GameInfoSection";
import RankBoard from "../../components/domain/RankBoard";
import ScoreBoard from "../../components/domain/ScoreBoard";
import { usePageRoute } from "../../hooks/usePageRoute";
import { PageStyle } from "../../styles/page";
import { typo } from "../../styles/typo";
import { getUserId } from "../../utils/getUserId";
import { divideFrontAndBackScores } from "../../utils/score";
import { testGameRoomInfo } from "../GameRoom/InGame/InGame";

export const GameEnd = () => {
  const { goHome } = usePageRoute();
  const gameRoomInfo = testGameRoomInfo.gameRoomInfo;
  const players = gameRoomInfo.players;
  const userId = getUserId();
  const rank = players.findIndex((player) => player.userId === userId) + 1;
  //
  const me = players[rank - 1];
  // 본인 점수 픽
  const scores = divideFrontAndBackScores(me.holeScores);
  return (
    <PageStyle.Wrapper>
      <TitleAsset title="게임종료" />
      <S.Body>
        <GameInfoSection
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
            pars={gameRoomInfo.gameInfo.golfCenter.backNineCourse.pars}
            holeScores={scores.backNineScores}
          />
        </S.ScoreBoardWrapper>

        <S.TitleSection>
          <span>플레이어 스코어</span>
        </S.TitleSection>
        <S.Mid>
          <RankBoard players={players} />
        </S.Mid>
      </S.Body>
      <PageStyle.Footer>
        <Button onClick={() => goHome()}>확인</Button>
      </PageStyle.Footer>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    padding: 12px 15px 0px 15px;
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
      min-width: 47px;
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
