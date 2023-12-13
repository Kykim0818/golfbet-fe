import styled from "styled-components";

export const Empty = () => {
  return <S.Wrapper />;
};

const S = {
  Wrapper: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 0px;
    height: 0px;
  `,
};
