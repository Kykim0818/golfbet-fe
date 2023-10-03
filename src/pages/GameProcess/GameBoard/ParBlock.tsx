import styled, { CSSProp, css } from "styled-components";
import { typo } from "../../../styles/typo";

export const STATUS = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

type ParBlockProps = {
  status: (typeof STATUS)[keyof typeof STATUS];
  holeIndex: number;
  parCount: number;
};

export const ParBlock = ({
  status: state,
  holeIndex,
  parCount,
}: ParBlockProps) => {
  return (
    <S.Wrapper variantStyle={BLOCK_TYPE[state]}>
      <span className="parblock__holeindex">{holeIndex}H</span>
      <span className="parblock__parcount">{parCount}파</span>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ variantStyle: CSSProp }>`
    ${(props) => props.variantStyle}

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 15px;

    .parblock__holeindex {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    .parblock__parcount {
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
};

const BLOCK_TYPE = {
  [STATUS.IN_PROGRESS]: css`
    color: var(--color_main-dark, #008395);
    background-color: #b0e6ed;
    border: 0.5px solid var(--color-main-dark, #008395);
  `,
  [STATUS.COMPLETED]: css`
    color: var(--color-sub-text-grey, #bcbcbc);
    background-color: #f4f7fd;
    border: 0.5px solid #f4f7fd;
  `,
  [STATUS.NOT_STARTED]: css`
    color: var(--color-sub-text-grey, #bcbcbc);
    background-color: #f4f7fd;
    border: 0.5px solid #f4f7fd;
  `,
};
