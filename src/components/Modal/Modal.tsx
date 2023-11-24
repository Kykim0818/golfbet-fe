import { useEffect } from "react";
import styled, { CSSProp, css } from "styled-components";
import { history } from "../..";
import { ModalType } from "../modals/type";

interface Props {
  children: React.ReactNode;
  sheetStyle?: CSSProp;
  modalType?: ModalType;
  closeModalByUI: (result?: any) => void;
}

export const Modal = ({
  children,
  sheetStyle,
  closeModalByUI,
  modalType = 0,
}: Props) => {
  // 뒤로가기
  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP") {
        closeModalByUI();
      }
    });
    return event;
  }, [closeModalByUI]);

  return (
    <S.Background>
      <S.Sheet sheetStyle={sheetStyle} modalType={modalType}>
        {children}
      </S.Sheet>
    </S.Background>
  );
};

const S = {
  Background: styled.div`
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
    ${(props) =>
      props.modalType === 0 &&
      css`
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `}

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
    ${(props) => props.sheetStyle}
  `,
};
