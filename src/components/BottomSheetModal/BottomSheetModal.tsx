import { useEffect } from "react";
import styled, { CSSProp } from "styled-components";
import { history } from "../..";
import { decreaseBackToHomePageCount } from "../../hooks/usePageRoute";

type BottomSheetModalProps = {
  children: React.ReactNode;
  closeModalByUI: () => void;
  sheetStyle?: CSSProp;
};

export const BottomSheetModal = ({
  children,
  closeModalByUI,
  sheetStyle,
}: BottomSheetModalProps) => {
  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP") {
        decreaseBackToHomePageCount();
        closeModalByUI();
      }
    });
    return event;
  }, [closeModalByUI]);

  return (
    <S.Background>
      <S.Sheet sheetStyle={sheetStyle}>{children}</S.Sheet>
    </S.Background>
  );
};

const S = {
  Background: styled.div`
    position: fixed;
    background-color: rgba(79, 77, 77, 0.61);
    display: flex;
    flex-grow: 1;
    z-index: 2;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Sheet: styled.div<{ sheetStyle?: CSSProp }>`
    position: fixed;
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

    ${(props) => props.sheetStyle}
  `,
};
