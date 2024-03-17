import styled, { CSSProp, css } from "styled-components";

export const STATUS = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  COMPLETED_FOCUS: "Completed clicked",
} as const;

type ParBlockProps = {
  status: (typeof STATUS)[keyof typeof STATUS];
  hole: number;
  parCount: number;
  handleHoleClick: (hole: number) => void;
};

export const ParBlock = ({
  status,
  hole,
  parCount,
  handleHoleClick,
}: ParBlockProps) => {
  return (
    <S.Wrapper
      variantStyle={BLOCK_TYPE[status]}
      onClick={() => {
        if (status !== STATUS.NOT_STARTED) handleHoleClick(hole);
      }}
    >
      <span className="parblock__holeindex">{hole > 9 ? hole - 9 : hole}H</span>
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
    color: var(--color-main-dark, #008395);
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
  [STATUS.COMPLETED_FOCUS]: css`
    color: var(--color-sub-text-grey, #bcbcbc);
    background-color: var(--color-main, #009eb2);
    border: 0.5px solid var(--color-main, #009eb2);
  `,
};
