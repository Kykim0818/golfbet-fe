import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { color } from "./color";

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}
  #root,
  html,
  body {
    ${color}
    overflow: auto;
    height: 100vh;
    // refresh 방지 확인
    overscroll-behavior-y: contain;
  }

  * {
    box-sizing: border-box;
  }
  
 
`;

export default GlobalStyle;
