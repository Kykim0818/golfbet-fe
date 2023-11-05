import styled from "styled-components";
import { PageStyle } from "../../styles/page";
import { usePageRoute } from "../../hooks/usePageRoute";
import TitleAsset from "../../components/TitleAsset";
import { useQuery } from "@tanstack/react-query";
import { apiGetUserGameHistories } from "../../service/api/gameScore";
import { typo } from "../../styles/typo";
import GameSummary from "../../components/domain/GameSummary";

export const ScoreHistory = () => {
  const { goHome, movePage } = usePageRoute();
  const { isLoading, error, data } = useQuery(["userGameHistory"], () =>
    apiGetUserGameHistories()
  );
  return (
    <PageStyle.Wrapper>
      <TitleAsset title="스코어" />
      <S.Body>
        {data && data.gameHistories.length <= 0 ? (
          <S.Empty>
            <img
              src={process.env.PUBLIC_URL + "assets/svg/img/no_history.svg"}
            />
            <S.Txt>기록된 정보가 없습니다.</S.Txt>
          </S.Empty>
        ) : (
          data?.gameHistories.map((gameHistory) => (
            <GameSummary
              key={gameHistory.gameId}
              gameId={gameHistory.gameId}
              date={gameHistory.date}
              centerName={gameHistory.centerName}
              gameType={gameHistory.gameType}
              players={gameHistory.players}
              score={gameHistory.score}
              totalMoneyChange={gameHistory.totalMoneyChange}
            />
          ))
        )}
      </S.Body>
      <S.Footer>
        <S.FooterC1 onClick={goHome}>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_home.svg"}
          />
        </S.FooterC1>
        <S.FooterB>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_score.svg"}
            alt="no icons"
          />
        </S.FooterB>
        <S.FooterB onClick={() => movePage("/setting")}>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_menu.svg"}
            alt="no icons"
          />
        </S.FooterB>
      </S.Footer>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
    padding: 0 26px;
    flex-grow: 1;
  `,
  Empty: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
    justify-content: center;
    align-items: center;

    & > * {
      transform: translateY(-45px);
    }
  `,
  Txt: styled.span`
    ${typo.s14w400}
    color: #3C4043;
    padding: 10px;
  `,
  Footer: styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    height: 73px;

    position: fixed;
    bottom: 0;

    background-color: #ffffff;
    border-radius: 46px 46px 0px 0px;
  `,
  FooterC1: styled.div`
    position: absolute;

    left: calc(50% - 38px);
    top: -38px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  FooterB: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  `,
};
