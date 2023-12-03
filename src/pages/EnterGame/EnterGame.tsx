import { useState } from "react";
import QrReader from "react-qr-reader";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TitleAsset from "../../components/TitleAsset";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import { apiCanEnterGameRoom } from "../../service/api/gameRoom";

export const EnterGame = () => {
  const [tmpGameId, setTmpGameId] = useState("");
  const { moveBack, movePage } = usePageRoute();
  const { openModal } = useModal();
  const handleFailEnterGame = () => {
    openModal({
      id: "ALERT",
      args: {
        title: "게임방 입장 실패",
        msg: "게임방 입장에 실패했습니다.\n다시 시도해주세요.",
        okBtnLabel: "확인",
      },
    });
  };

  const handleError = (err: any) => {
    console.log(err);
    handleFailEnterGame();
  };

  const handleScan = async (gameId: string) => {
    movePage(`/game_room/${gameId}`, { replace: true });
    return;
    const canEnterRoom = await apiCanEnterGameRoom(gameId);
    //TODO: REMOVE
    if (canEnterRoom.data.partiAvailabilityYn) {
      movePage(`/game_room/${gameId}`);
      return;
    }
    handleFailEnterGame();
  };

  const test = () => {
    handleScan(tmpGameId);
  };

  return (
    <>
      <S.TitleAsset title="게임 참여하기" visibleClose handleClose={moveBack} />
      <S.Wrapper>
        <Input
          value={tmpGameId}
          onChange={(e) => setTmpGameId(e.target.value)}
        />
        <Button onClick={test}>Game ID 입력해서 입장</Button>
        <S.Camera>
          <QrReader
            className="qr__reader"
            delay={500}
            style={{
              height: 329,
              width: 272,
              borderRadius: "34px",
            }}
            onError={handleError}
            onScan={(data) => {
              if (data) handleScan(data);
            }}
          />
          <S.QRArea
            src={process.env.PUBLIC_URL + "/assets/svg/ic_qr_camera.svg"}
            alt=""
          />
          {/* <S.CloseBtn
          src={process.env.PUBLIC_URL + "/assets/svg/ic_qr_close.svg"}
          onClick={handleBtnClick}
          alt="closeBtn"
        /> */}
        </S.Camera>
        <S.Desc>
          게임방 QR 코드를 화면에 비추면 게임방으로 참여할 수 있습니다.
        </S.Desc>
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Title: styled.div`
    // typo
    color: #3b3f40;
    text-align: center;
    font-size: 15px;
    //
    margin-top: 7px;
  `,
  Camera: styled.div`
    width: 272px;
    height: 328.601px;
    border-radius: 34px;
    background: #f6f8fc;

    position: relative;
    //
    margin-top: 40px;

    .qr__reader {
      > section {
        width: 272px;
        height: 328.601px;
        border-radius: 34px;

        > div {
          display: none;
        }
      }
    }
  `,
  QRArea: styled.img`
    //
    background-color: transparent;
    position: absolute;
    left: 20.5px;
    bottom: 47.37px;
  `,

  CloseBtn: styled.img`
    position: absolute;
    bottom: -35px;
    left: calc(50% - 35px);
    z-index: 2;
    //
    &:hover {
      cursor: pointer;
    }
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
  TitleAsset: styled(TitleAsset)`
    background-color: #fff;
  `,
};
