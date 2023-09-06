import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export type PlayersInfoUI = {
  nickName: string;
  imgSrc: string;
  avgScore: number;
  initMoney: number;
  readyState: boolean;
};

type Props = {
  players: PlayersInfoUI[];
  gameMaxPlayer: number;
  isHandicapPre: boolean;
};
export const PlayersInfo = ({
  players,
  gameMaxPlayer,
  isHandicapPre,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigateHandiCapPage = () => {
    navigate("handicap_setup");
  };
  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderLeft>{`플레이어(${players.length}/${gameMaxPlayer})`}</S.HeaderLeft>
        {isHandicapPre && (
          <S.HeaderRight onClick={handleNavigateHandiCapPage}>
            핸디캡 주기
          </S.HeaderRight>
        )}
      </S.Header>
      <S.Body>
        {players.map((player) => {
          return (
            <S.Player>
              <div>
                <img src={player.imgSrc} alt="avatar" />
              </div>
              <div>{player.nickName}</div>
              <div>
                <div>평균 스코어 {player.avgScore}</div>
                <div>{player.initMoney}원</div>
              </div>
            </S.Player>
          );
        })}
        {new Array(gameMaxPlayer - players.length).fill(0).map((noPlayer) => {
          return <div>플레이어를 기다리고 있어요.</div>;
        })}
      </S.Body>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div``,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  HeaderLeft: styled.div`
    // typo
    color: var(--color-main, #009eb2);
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
  `,
  HeaderRight: styled.button`
    color: var(--color-text-grey, #494949);
    font-size: 12px;
    font-weight: 500;
    line-height: normal;

    border: none;
    background-color: transparent;
  `,

  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  Player: styled.div`
    display: flex;
  `,
};
