import { useEffect } from "react";
import styled from "styled-components";
import { history } from "../..";

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
}

export const Modal = ({ children, closeModal }: Props) => {
  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP") {
        history.back();
        closeModal();
      }
    });
    return event;
  }, [closeModal]);

  return (
    <S.Background>
      <S.Content>{children}</S.Content>
    </S.Background>
  );
};

const S = {
  Background: styled.div`
    position: fixed;
    background-color: rgba(79, 77, 77, 0.61);
    z-index: 2;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Content: styled.div`
    position: fixed;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  `,
};
