import styled, { CSSProp, css } from "styled-components";

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
      <span>{holeIndex}H</span>
      <span>{parCount}</span>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ variantStyle: CSSProp }>`
    ${(props) => props.variantStyle}
    display: flex;
    flex-direction: column;
  `,
};

const BLOCK_TYPE = {
  [STATUS.IN_PROGRESS]: css``,
  [STATUS.COMPLETED]: css``,
  [STATUS.NOT_STARTED]: css``,
};
