import styled from "styled-components";

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
          onClick={handleBack}
        />
      </S.BackButton>
      <div>{title}</div>
      <S.CloseButton onClick={handleBack} visible={visibleClose}>
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
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 30px;
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
  CloseButton: styled.button<{ visible: boolean }>`
    display: flex;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    border: none;
    align-items: center;
    background-color: transparent;
  `,
};
