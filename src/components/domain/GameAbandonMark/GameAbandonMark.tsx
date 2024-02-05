import styled from "styled-components";
import { typo } from "../../../styles/typo";

export const GameAbandonMark = () => {
  return <S.Wrapper>포기</S.Wrapper>;
};

const S = {
  Wrapper: styled.span`
    ${typo.s10w600}
    padding: 3.5px 6px;
    color: #ff0000;
    border-radius: 5px;
    background-color: rgba(255, 0, 0, 0.2);
  `,
};
