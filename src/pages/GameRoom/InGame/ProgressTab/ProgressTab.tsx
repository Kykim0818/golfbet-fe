import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../../components/Button";
import { useAppSelector } from "../../../../hooks/redux";
import { typo } from "../../../../styles/typo";
import { GameInfo } from "../../../MakeGame/MakeGame";
import { GameRoomUser } from "../../GameRoom";
import ProgressBoard from "./ProgressBoard";
import { ProgressPlayerRow } from "./ProgressPlayerRow";

type ProgressTabProps = {
  currentHole: number;
  centerInfo: GameInfo["golfCenter"];
  players: GameRoomUser[];
  handleOpenEnterScore: () => Promise<void>;
  handleOpenModifyEnterScore: (modifyTargetHole: number) => Promise<void>;
};
export const ProgressTab = ({
  currentHole,
  centerInfo,
  players,
  handleOpenEnterScore,
  handleOpenModifyEnterScore,
}: ProgressTabProps) => {
  const [selectHole, setSelectHole] = useState(currentHole);
  const userInfo = useAppSelector((state) => state.users.userInfo);
  const isNoBody = players.every(
    (player) => player.holeScores[selectHole - 1] === 999
  );

  const handleHoleClick = (hole: number) => {
    setSelectHole(hole);
  };

  useEffect(() => {
    setSelectHole(currentHole);
  }, [currentHole]);

  return (
    <S.Wrapper>
      <ProgressBoard
        selectHole={selectHole}
        currentHole={currentHole}
        centerInfo={centerInfo}
        handleHoleClick={handleHoleClick}
      />
      {/* 플레이어 판 */}
      <S.Players isNobody={isNoBody}>
        {isNoBody ? (
          <span>스코어를 입력해주세요.</span>
        ) : (
          players.map((player) => {
            return (
              <ProgressPlayerRow
                key={player.userId}
                selectHole={selectHole}
                player={player}
                isSelf={player.userId === userInfo.userId}
              />
            );
          })
        )}
      </S.Players>
      <S.Footer>
        {selectHole === currentHole ? (
          <Button onClick={handleOpenEnterScore}>+스코어 입력하기</Button>
        ) : (
          <Button onClick={() => handleOpenModifyEnterScore(selectHole)}>
            +스코어 수정하기
          </Button>
        )}
      </S.Footer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  `,
  Players: styled.div<{ isNobody: boolean }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 15px;
    margin-top: 32px;

    ${(props) =>
      props.isNobody &&
      css`
        justify-content: center;
        align-items: center;
        span {
          ${typo.s14w400}
          color:#A7A7A7;
        }
      `}
  `,
  Footer: styled.footer`
    display: flex;
    padding-bottom: 20px;
  `,
};
