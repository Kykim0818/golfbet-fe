import { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { RankBoardPlayerInfo } from "../../../../components/domain/RankBoard/RankBoardPlayerInfo";
import { useAppSelector } from "../../../../hooks/redux";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { usePreventBackInModal } from "../../../../hooks/usePreventBackInModal";
import { typo } from "../../../../styles/typo";
import { deepClone } from "../../../../utils/deepClone";
import { GameRoomUser } from "../../GameRoom";

export type InGameResultProps = {
  players: GameRoomUser[];
  /** 전반, 후반  */
  type: "front" | "back";
};

export const InGameResult = ({ players, type }: InGameResultProps) => {
  const { moveBack } = usePageRoute();
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const [preventBackFlag, setPreventBackFlag] = useState(true);
  const sortedPlayerByScore = deepClone(players).sort(
    (playerA, playerB) => playerA.currentScore - playerB.currentScore
  );
  const title = type === "front" ? "전반 종료" : "게임 종료";
  const footerButtonLabel =
    type === "front" ? "후반 시작하기" : "전체 결과보기";
  usePreventBackInModal({ confirmTriggerFlag: preventBackFlag });

  const handleClickNext = () => {
    moveBack();
    setPreventBackFlag(false);
    moveBack();
  };
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Img
        alt="game_result"
        src={process.env.PUBLIC_URL + "/assets/svg/ic_game_over.svg"}
      />
      <S.Body>
        <S.BodyTitle>순위</S.BodyTitle>
        <S.RankBoardSection>
          {sortedPlayerByScore.map((player, index) => {
            return (
              <RankBoardPlayerInfo
                key={player.userId}
                rank={index + 1}
                id={player.userId}
                nickName={player.nickName}
                imgSrc={player.imgSrc}
                isSelf={player.userId === userInfo.userId}
                currentMoney={player.currentMoney}
                currentScore={player.currentScore}
              />
            );
          })}
        </S.RankBoardSection>
      </S.Body>
      <S.Footer>
        <Button onClick={handleClickNext}>{footerButtonLabel}</Button>
      </S.Footer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 15px;
    background-color: #f8fafb;
    width: 90.277vw;
    padding: 15px 12px 0px 12px;
  `,
  Title: styled.span`
    padding: 10px;
    ${typo.s16w700}
    color: var(--color-main-darker,'#003d45');

    margin-bottom: 9px;
  `,
  Img: styled.img`
    width: 20%;
    height: 20%;
    min-width: 76px;
    min-height: 76px;

    margin-bottom: 5px;
  `,

  Body: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
  `,
  BodyTitle: styled.span`
    ${typo.s15w500}
    color: var(--color-main-darker,'#003d45');

    padding-left: 10px;
  `,
  RankBoardSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    margin-bottom: 18px;
  `,
  Footer: styled.footer`
    display: flex;
    width: 100%;
    padding: 0px 16px 20px 16px;
  `,
};
