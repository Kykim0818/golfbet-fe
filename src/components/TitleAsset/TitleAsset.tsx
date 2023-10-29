import styled from "styled-components";
import { typo } from "../../styles/typo";

type TitleAssetProps = {
  title?: string;
  visibleBack?: boolean;
  handleBack?: (args?: unknown) => unknown;
  visibleClose?: boolean;
  handleClose?: (args?: unknown) => unknown;
};

export const TitleAsset = ({
  title,
  visibleBack = false,
  handleBack,
  visibleClose = false,
  handleClose,
}: TitleAssetProps) => {
  return (
    <S.Wrapper>
      <S.BackButton onClick={handleBack} visible={visibleBack}>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/ic_back.svg"}
          alt="back"
        />
      </S.BackButton>
      <S.Title>{title}</S.Title>
      <S.CloseButton onClick={handleClose} visible={visibleClose}>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.CloseButton>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 13px 20px;
    background-color: var(--color-bg, #f6f8fc);
  `,
  Title: styled.div`
    // TODO : typo
    ${typo.s16w400}
    color: #29363D;
    line-height: 30px;
  `,
  BackButton: styled.button<{ visible: boolean }>`
    display: flex;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    border: none;
    align-items: center;
    background-color: transparent;
  `,
  CloseButton: styled.button<{ visible: boolean }>`
    display: flex;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    border: none;
    align-items: center;
    background-color: transparent;
  `,
};
