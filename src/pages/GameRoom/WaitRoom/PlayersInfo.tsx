import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { typo } from "../../../styles/typo";

export type PlayersInfoUI = {
  id: string;
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
            <S.Player key={player.id}>
              <S.PlayerImgSection>
                <img src={player.imgSrc} alt="avatar" />
              </S.PlayerImgSection>
              <S.NickNameSection>
                {localStorage.getItem("userId") === player.id && <div>나</div>}
                <span>{player.nickName}</span>
              </S.NickNameSection>
              <S.MoreInfo>
                <S.ScoreSection>
                  <div>평균 스코어</div>
                  <span> {player.avgScore}</span>
                </S.ScoreSection>
                <S.Money>{player.initMoney}원</S.Money>
              </S.MoreInfo>
            </S.Player>
          );
        })}
        {new Array(gameMaxPlayer - players.length)
          .fill(0)
          .map((noPlayer, index) => {
            return (
              <S.WaitPlayer key={`${index + 1}`}>
                플레이어를 기다리고 있어요.
              </S.WaitPlayer>
            );
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
    margin-bottom: 15px;
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
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 4px 20px 6px 12px;
    min-height: 40px;
  `,

  PlayerImgSection: styled.div`
    min-width: 50px;
    max-width: 50px;
    max-height: 50px;
    min-height: 50px;

    margin-right: 15px;
  `,
  NickNameSection: styled.div`
    display: flex;
    flex-grow: 1;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      background-color: #f8f9fd;
      border-radius: 50%;
      ${typo.s10w500}
      color: #3181AE;
    }
    span {
      margin-left: 5px;
      ${typo.s14w700}
    }
  `,
  MoreInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  `,
  ScoreSection: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    div {
      padding: 3px 5px;
      border-radius: 10px;
      background: #f8f9fd;
      ${typo.s8w500}
      color: #3181AE;
    }

    span {
      ${typo.s12w700}
      color: #504F4F;
    }
  `,
  Money: styled.div`
    ${typo.s12w700}
    color: var(--color-main-dark, #008395);
  `,

  WaitPlayer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background-color: #fff;
    min-height: 40px;

    ${typo.s14w400}
    color: #ACB1C6;
  `,
};
