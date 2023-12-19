import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { color } from "./color";
// import { color } from "./color";
// import "./fonts/fontFace.css";

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
    // Pretendard, IOS, Andriod
    font-family: 'Pretendard', 'AppleGothicNeoSD', 'Apple SD 산돌고딕 Neo', 'Droid sans', 'sans-serif';
    /* font-family: 'NotoSans KR'; */
  }

  #root,
  html,
  body {
    ${color}
    overflow: auto;
    height: 100vh;
    // refresh 방지 확인
    overscroll-behavior-y: contain;
    // 좌우 swipe 방지
    overscroll-behavior-x: none;
    //
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
  }
  input {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }
  textarea {
    outline: none;
  }
  ul {
    margin: 0;
  }
 
`;

export default GlobalStyle;
