import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import BottomNav from "../../components/@common/BottomNav";
import TitleAsset from "../../components/TitleAsset";
import GameSummary from "../../components/domain/GameSummary";
import { useBottomNav } from "../../hooks/useBottomNav";
import { usePageRoute } from "../../hooks/usePageRoute";
import { apiGetUserGameHistories } from "../../service/api/gameScore";
import { PageStyle } from "../../styles/page";
import { typo } from "../../styles/typo";

export const ScoreHistory = () => {
  const { goHome, movePage } = usePageRoute();
  const { isLoading, error, data } = useQuery(["userGameHistory"], () =>
    apiGetUserGameHistories()
  );
  const { bottomNavList } = useBottomNav();
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
      <BottomNav
        navList={bottomNavList}
        selectedNav="score_history"
        customStyle={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "#ffffff",
          width: "100%",
          borderRadius: "15px 15px 0px 0px",
        }}
      />
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
