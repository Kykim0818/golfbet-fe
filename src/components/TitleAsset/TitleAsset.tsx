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
      {visibleBack && (
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/ic_back.svg"}
          alt="no icons"
          onClick={handleBack}
        />
      )}
      <div>{title}</div>
      {visibleClose && (
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="no icons"
          onClick={handleClose}
        />
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 30px;
    height: 41px;
    gap: 114px;
  `,
  Title: styled.div`
    // TODO : typo
    color: #484848;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  `,
};
