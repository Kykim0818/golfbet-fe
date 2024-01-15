import styled, { CSSProp, css } from "styled-components";
import { ModalType } from "../modals/type";

interface Props {
  children: React.ReactNode;
  sheetStyle?: CSSProp;
  modalType?: ModalType;
}

export const Modal = ({ children, sheetStyle, modalType = 0 }: Props) => {
  return (
    <>
      {modalType === 0 && <S.Screen />}
      <S.Background modalType={modalType}>
        <S.Sheet sheetStyle={sheetStyle} modalType={modalType}>
          {children}
        </S.Sheet>
      </S.Background>
    </>
  );
};

const S = {
  // 뒷 배경 가리기용
  Screen: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-bg, "#f6f8fc");
    z-index: 2;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Background: styled.div<{ modalType: ModalType }>`
    ${(props) =>
      props.modalType === 3 &&
      css`
        display: none;
      `}
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(79, 77, 77, 0.61);
    z-index: 2;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Sheet: styled.div<{ modalType: ModalType; sheetStyle?: CSSProp }>`
    position: fixed;
    z-index: 3;
    // 일반 modal
    ${(props) =>
      props.modalType === 0 &&
      css`
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `}
    // bottom sheet
    ${(props) =>
      props.modalType === 1 &&
      css`
        padding-top: 55px;
        bottom: 0;
        background-color: white;
        max-height: 80%;
        width: 100%;
        border-radius: 25px 25px 0px 0px;
        animation: slideUp 0.3s ease-in-out;

        @keyframes slideUp {
          0% {
            transform: translateY(100%); /* 초기 위치: 아래에서 위로 이동 */
          }
          100% {
            transform: translateY(0); /* 최종 위치: 페이지 상단으로 이동 */
          }
        }
      `}
      // 페이지 형 
      ${(props) =>
      props.modalType === 2 &&
      css`
        width: 100%;
        height: 100%;
      `}
    ${(props) => props.sheetStyle}
  `,
};
