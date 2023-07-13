import { ReactElement, useEffect } from "react";
import styled from "styled-components";

type Props = {
  children: ReactElement;
  handleClose: () => void;
  preventFlag?: boolean;
};
export const Modal = ({ children, handleClose }: Props) => {
  useEffect(() => {
    const handlePopstate = (e: Event) => {
      handleClose();
      // 여기에 원하는 동작을 작성하세요.
    };

    // window.onpopstate = (e: Event) => {
    //   handlePopstate(e);
    //   // handleClose();
    //   console.log("close");
    //   window.onpopstate = () => {};
    // };
    // popstate 이벤트 리스너 등록
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
