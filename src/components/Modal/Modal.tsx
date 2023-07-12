import { ReactElement, useEffect } from "react";
import styled from "styled-components";

type Props = {
  children: ReactElement;
  handleClose: () => void;
};
export const Modal = ({ children, handleClose }: Props) => {
  useEffect(() => {
    window.history.pushState({ isAppQuitPage: true }, "", "");
  }, []);
  useEffect(() => {
    const handleBackPage = () => {
      handleClose?.();
    };
    window.addEventListener("popstate", handleBackPage);
    return () => window.removeEventListener("popstate", handleBackPage);
  }, [handleClose]);

  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-bg, #f6f8fc);
  `,
};
