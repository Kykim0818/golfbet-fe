// styles/GlobalStyle
import { createGlobalStyle } from "styled-components";
import PretendardBold from "./fonts/Pretendard-Bold.woff2";
import PretendardLight from "./fonts/Pretendard-Light.woff2";
import PretendardMedium from "./fonts/Pretendard-Medium.woff2";
import Pretendard from "./fonts/Pretendard-Regular.woff2";
import PretendardSemiBold from "./fonts/Pretendard-SemiBold.woff2";

// Pretendard Font Weight: Light, Regular, Medium, SemiBold, Bold(300~700)
const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardLight}) format('woff2');
    font-weight:300;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Pretendard}) format('woff2');
    font-weight:400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardMedium}) format('woff2');
    font-weight:500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardSemiBold}) format('woff2');
    font-weight:600;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardBold}) format('woff2');
    font-weight:700;
    font-display: swap;
  }
`;

export default GlobalFont;
