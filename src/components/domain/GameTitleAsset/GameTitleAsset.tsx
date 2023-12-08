import styled from "styled-components";

type GameTitleAssetProps = {
  title?: string;
  visibleBack?: boolean;
  handleBack?: (args?: unknown) => unknown;
  handleOpenRoomQr?: () => void;
};

export const GameTitleAsset = ({
  title,
  visibleBack = false,
  handleBack,
  handleOpenRoomQr,
}: GameTitleAssetProps) => {
  return (
    <S.Wrapper>
      <S.BackButton onClick={handleBack} visible={visibleBack}>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/ic_back.svg"}
          alt="back"
        />
      </S.BackButton>
      <div>{title}</div>
      <S.QRButton onClick={handleOpenRoomQr}>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/ic_qr_image.svg"}
          alt="qr_image"
        />
      </S.QRButton>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 13px 16px;
    min-height: 41px;
    background-color: var(--color-bg, #f6f8fc);
  `,
  Title: styled.div`
    // TODO : typo
    color: #484848;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  `,
  BackButton: styled.button<{ visible: boolean }>`
    display: flex;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    border: none;
    align-items: center;
    background-color: transparent;
  `,
  QRButton: styled.button`
    display: flex;
    border: none;
    align-items: center;
    background-color: transparent;
  `,
};
