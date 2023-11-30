import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TitleAsset from "../../../components/TitleAsset";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { getUserId } from "../../../utils/getUserId";
import { isNumeric } from "../../../utils/isNumeric";
import { useGameRoomInfo } from "../GameRoom";

export const HandicapSetup = () => {
  const { movePage } = usePageRoute();
  const { gameRoomInfo } = useGameRoomInfo();
  const handleBackBtn = () => {
    movePage(`/game_room/${gameRoomInfo.gameInfo.gameId}`, { replace: true });
  };
  const handleAddHandiCapBtn = () => {
    // 추가
  };
  //
  const myId = getUserId();
  const users = gameRoomInfo.players.filter((player) => player.userId !== myId);

  return (
    <>
      <TitleAsset visibleBack handleBack={handleBackBtn} title="핸디캡 주기" />
      <S.Body>
        <S.HelpTxt>
          다른 플레이어에게 준 핸디캡 금액은 게임 준비금에서 차감됩니다.
        </S.HelpTxt>
        <S.PlayerSection>
          {users.map((user) => {
            const targetUserhandiCap = user.handicaps.find(
              (handicap) => handicap.to === user.userId
            );
            return (
              <PlayerInfo
                id={user.userId}
                avgScore={user.avgScore}
                profileImgSrc={user.imgSrc}
                nickName={user.nickName}
                currentHandicap={targetUserhandiCap?.money ?? 0}
                handleChangeHandiCap={(handicapMoney) =>
                  console.log("aa", handicapMoney)
                }
              />
            );
          })}
        </S.PlayerSection>
      </S.Body>
      <S.Footer>
        <Button onClick={handleAddHandiCapBtn}>핸디캡 추가</Button>
      </S.Footer>
    </>
  );
};

type PlayerInfoProps = {
  id: string;
  profileImgSrc: string;
  nickName: string;
  avgScore: number;
  // 현재 핸디캡 금액
  currentHandicap: number;
  handleChangeHandiCap: (money: number) => void;
};

const PlayerInfo = ({
  currentHandicap,
  profileImgSrc,
  nickName,
  avgScore,
  handleChangeHandiCap,
}: PlayerInfoProps) => {
  const [money, setMoney] = useState(currentHandicap ?? 0);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumeric(e.target.value)) {
      setMoney(Number(e.target.value) >= 0 ? Number(e.target.value) : 0);
      handleChangeHandiCap(
        Number(e.target.value) >= 0 ? Number(e.target.value) : 0
      );
      return;
    }
    alert("숫자만 입력 가능합니다.");
    e.target.value = "";
  };

  return (
    <S.PlayerWrapper>
      <S.PlayerImageAndDetail>
        <S.PlayerImage src={profileImgSrc} alt="profile_image" />
        <S.PlayerDetail>
          <div>{nickName}</div>
          <div style={{ display: "flex" }}>
            <S.AvgScoreTxt>평균스코어</S.AvgScoreTxt>
            <S.AvgScoreValue>{avgScore}</S.AvgScoreValue>
          </div>
        </S.PlayerDetail>
      </S.PlayerImageAndDetail>
      <Input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        value={money === 0 ? "" : money}
        placeholder="금액을 입력해주세요."
        onChange={handleOnChange}
      />
    </S.PlayerWrapper>
  );
};

const S = {
  Body: styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0px 15px;
  `,
  HelpTxt: styled.div`
    display: flex;
    justify-content: center;
    //
    color: var(--color-main-darker, #003d45);
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  `,
  //
  PlayerSection: styled.div`
    display: flex;
    flex-direction: column;
  `,

  PlayerWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;

    justify-content: center;
  `,
  PlayerImageAndDetail: styled.div`
    display: flex;
  `,
  PlayerImage: styled.img`
    width: 60px;
    height: 62px;
  `,
  PlayerDetail: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  `,
  AvgScoreTxt: styled.span`
    padding: 3px 6px;
    // typo
    color: #3181ae;
    font-size: 8px;
    font-weight: 500;
    line-height: normal;

    border-radius: 12px;
    background: #f0f1f4;
  `,
  AvgScoreValue: styled.span`
    color: var(--color-dark-hover, #006977);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  //
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
