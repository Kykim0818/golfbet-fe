import styled, { css } from "styled-components";

// NOTE component
export const HiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

// ----------------------------------
const commonStyle = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
  flexAlignCenter: `
    display: flex;
    align-items: center;
  `,
  flexAlignCenterColumn: `
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

export default commonStyle;
