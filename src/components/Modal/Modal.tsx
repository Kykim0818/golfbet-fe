import { ReactElement, useEffect } from "react";
import styled from "styled-components";

interface Props {
  children: ReactElement;
  handleClose: () => void;
}
export const Modal = ({ children, handleClose }: Props) => {
  useEffect(() => {
    const handlePopstate = (e: Event) => {
      window.history.back();
      handleClose();
    };

    window.addEventListener("popstate", handlePopstate);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [handleClose]);

  return <Styled.Wrapper className="test_modal">{children}</Styled.Wrapper>;
};

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-bg, #f6f8fc);
    // z-index
    z-index: 2;
  `,
};
