import { DefaultTheme } from "styled-components";
import colors from "./theme/colors";
import common from "./theme/common";
import sizes from "./theme/sizes";

// example
const theme: DefaultTheme = {
  basicWidth: "320px",

  colors: {
    bg: "#F6F8FC",
    main: "#009EB2",
    sub: "#fff",
  },
};

const nextTheme: DefaultTheme = {
  basicWidth: "320px",

  colors: {
    bg: "#F6F8FC",
    main: "#1c1f25",
    sub: "#fff",
  },
};

const Theme: DefaultTheme = {
  colors,
  sizes,
  common,
};

export { Theme, nextTheme, theme };
