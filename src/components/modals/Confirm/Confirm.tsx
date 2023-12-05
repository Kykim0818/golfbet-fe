import styled from "styled-components";
import Button from "../../Button";

type ConfirmProps = {
  title?: string;
  contentTxt?: string;
  okBtnLabel?: string;
  cancelBtnLabel?: string;
  handleBtnClick: (result: boolean) => void;
};

export const Confirm = ({
  title,
  contentTxt,
  okBtnLabel = "OK",
  cancelBtnLabel = "CANCEL",
  handleBtnClick,
}: ConfirmProps) => {
  return (
    <S.Wrapper>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.ContentTxt>{contentTxt}</S.ContentTxt>
      </S.Body>
      <S.HorizontalSeperator />
      <S.Footer>
        <S.ModalBtn onClick={() => handleBtnClick(false)}>
          <span className="confirm__cancel">{cancelBtnLabel}</span>
        </S.ModalBtn>
        <S.VerticalSeperator />
        <S.ModalBtn onClick={() => handleBtnClick(true)}>
          {okBtnLabel}
        </S.ModalBtn>
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
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;

    padding-top: 20px;
    padding-bottom: 10px;
  `,
  Title: styled.span`
    color: var(--color-grey-900, #202124);

    /* font-family: Noto Sans KR; */
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 125% */
  `,
  ContentTxt: styled.div`
    text-align: center;
    color: var(--color-grey-700, #5f6368);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 200% */
    max-width: 288px;
    padding: 0px 24px;
    white-space: pre;
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
  HorizontalSeperator: styled.div`
    height: 1px;
    background-color: var(--color-grey-200, "#E8EAED");
  `,
  VerticalSeperator: styled.div`
    width: 3px;
    height: 100%;
    background-color: var(--color-grey-200, "#E8EAED");
  `,
  Footer: styled.footer`
    display: flex;
    height: 42px;
    justify-content: center;
    align-items: center;
  `,
};
