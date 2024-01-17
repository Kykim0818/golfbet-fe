import { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { typo } from "../../../../styles/typo";
import { GameRoomInfo } from "../../GameRoom";
import { PlayerRowButton } from "./PlayerRowButton";

export type SelectNearLongProps = {
  nearLongType: "nearest" | "longest";
  handleModalResult?: (res: string) => void;
  players: GameRoomInfo["players"];
};

const NO_SELECT = "";

export const SelectNearLong = ({
  nearLongType,
  players,
  handleModalResult,
}: SelectNearLongProps) => {
  const [selectUserId, setSelectUserId] = useState(NO_SELECT);
  const { moveBack } = usePageRoute();

  const handleSelectNearLong = (userId: string) => {
    handleModalResult?.(userId);
  };

  return (
    <>
      <S.ModalHeader>
        <div className="modalheader__title">{`${
          nearLongType === "nearest" ? "니어리스트" : "롱기스트"
        } 선택`}</div>
        <img
          onClick={moveBack}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.Body>
        {players.map((player) => {
          return (
            <PlayerRowButton
              selected={selectUserId === player.userId}
              key={player.userId}
              imgSrc={player.imgSrc}
              nickName={player.nickName}
              handleOnClick={() => setSelectUserId(player.userId)}
            />
          );
        })}
      </S.Body>
      <S.Footer>
        <Button
          onClick={() => handleSelectNearLong(selectUserId)}
          disabled={selectUserId === NO_SELECT}
        >
          선택완료
        </Button>
        <Button onClick={moveBack}>SKIP</Button>
      </S.Footer>
    </>
  );
};

const S = {
  ModalHeader: styled.div`
    display: flex;
    justify-content: center;

    .modalheader__title {
      top: 25px;
      position: absolute;
      ${typo.s16w700}
      color: var(--color-main, #009EB2);
    }
    img {
      top: 25px;
      position: absolute;
      right: 16.5px;
    }
  `,
  Body: styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
  `,
  //
  Footer: styled.footer`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0px 20px 20px 20px;
  `,
};
