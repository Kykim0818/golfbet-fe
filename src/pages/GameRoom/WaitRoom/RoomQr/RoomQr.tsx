import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import TitleAsset from "../../../../components/TitleAsset";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { PageStyle } from "../../../../styles/page";
import { GameRoomInfo } from "../../GameRoom";

export type RoomQrProps = {
  gameRoomInfo: GameRoomInfo;
};

export const RoomQr = ({ gameRoomInfo }: RoomQrProps) => {
  const { gameInfo, players } = gameRoomInfo;
  const { moveBack } = usePageRoute();
  return (
    <PageStyle.Wrapper>
      <TitleAsset
        visibleBack
        handleBack={moveBack}
        title={`${players.length}/${gameInfo.playerCount}`}
      />
      <S.Body>
        <>
          <QRCodeSVG
            value={gameInfo.gameId ?? ""}
            size={312}
            imageSettings={{
              src: process.env.PUBLIC_URL + "/GB192.png",
              x: undefined,
              y: undefined,
              height: 36,
              width: 36,
              excavate: true,
            }}
          />
          <S.Desc>
            게임방 QR 코드를 화면에 비추면 게임방으로 참여할 수 있습니다.
          </S.Desc>
        </>
      </S.Body>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.section`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 15px;
    padding: 0px 15px;
    overflow: auto;
  `,
  Desc: styled.div`
    padding: 20px 40px;
    width: 280px;
    min-height: 85px;
    border-radius: 23px;
    background: #e6f7f9;
    //
    margin-top: 58.4px;

    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
};
