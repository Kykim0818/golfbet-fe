import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { usePreventBackInModal } from "../../../../hooks/usePreventBackInModal";
import { typo } from "../../../../styles/typo";
import { deepClone } from "../../../../utils/deepClone";
import { GameRoomUser } from "../../GameRoom";
import { PlayerOption } from "./PlayerOption";

export type ChargeMoneyProps = {
  handleModalResult?: (result: TPlayersSelect) => void;
  chargeRequiredPlayers: GameRoomUser[];
  chargeMoney: number;
};

export type TPlayersSelect = Record<string, "charge" | "surrender">;

export const ChargeMoney = ({
  chargeRequiredPlayers,
  chargeMoney,
  handleModalResult,
}: ChargeMoneyProps) => {
  const { moveBack } = usePageRoute();
  const [playersSelect, setPlayersSelect] = useState<TPlayersSelect>(() => {
    const playersDefaultSelect: TPlayersSelect = {};
    chargeRequiredPlayers.forEach((player) => {
      playersDefaultSelect[player.userId] = "charge";
    });
    return playersDefaultSelect;
  });
  const preventBackFlag = useRef(true);
  usePreventBackInModal({ confirmTriggerFlag: preventBackFlag.current });

  const chargePlayerNickNames = chargeRequiredPlayers.map(
    (player) => `${player.nickName}님`
  );

  const handleSelectUserOption = (value: string, userId: string) => {
    if (value === "surrender" || value === "charge") {
      const currentSelect = deepClone(playersSelect);
      currentSelect[userId] = value;
      setPlayersSelect(currentSelect);
    }
    return;
  };

  const handleConfirm = () => {
    preventBackFlag.current = false;
    moveBack();
    handleModalResult?.(playersSelect);
  };

  return (
    <S.Wrapper>
      <S.Header>게임 준비금 증액하기</S.Header>
      <S.Main>
        <S.Title>충전금액: {chargeMoney}원</S.Title>
        <S.SubTitle>
          {`${chargePlayerNickNames.join(
            ","
          )}이 준비금을 모두 소진했어요.\n금액을 증액할까요?`}
        </S.SubTitle>
        <S.PlayerSection>
          {chargeRequiredPlayers.map((player) => (
            <PlayerOption
              key={player.userId}
              imgSrc={player.imgSrc}
              nickName={player.nickName}
              value={playersSelect[player.userId]}
              onChange={(value) => handleSelectUserOption(value, player.userId)}
            />
          ))}
        </S.PlayerSection>
      </S.Main>
      <S.Seperator />
      <S.Footer>
        <S.ModalBtn onClick={handleConfirm}>확인</S.ModalBtn>
      </S.Footer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: white;
    min-width: 280px;
    padding-top: 20px;
  `,
  Header: styled.header`
    text-align: center;
    color: var(--color-grey-900, #202124);
    ${typo.s16w500}
  `,
  Main: styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 20px;
  `,
  Title: styled.span`
    color: var(--color-main, #009eb2);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 157.143% */
  `,
  SubTitle: styled.p`
    color: #5f6368;
    ${typo.s12w500}
    text-align: center;
    white-space: pre-wrap;
  `,

  PlayerSection: styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
  `,

  Seperator: styled.div`
    height: 1px;
    background-color: var(--color-grey-200, "#E8EAED");
  `,
  ModalBtn: styled(Button)`
    padding: 4px 12px;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 171.429% */

    background-color: transparent;
    color: #213991;
    .confirm__cancel {
      color: var(--color-gray-900, #202124);
    }
  `,

  Footer: styled.footer`
    display: flex;
    height: 42px;
    justify-content: center;
    align-items: center;
  `,
};
