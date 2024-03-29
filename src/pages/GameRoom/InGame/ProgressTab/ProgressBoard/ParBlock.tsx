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
      {getStatusIcon(status)}
      <span className="parblock__holeindex">{hole > 9 ? hole - 9 : hole}H</span>
      <span className="parblock__parcount">{parCount}파</span>
    </S.Wrapper>
  );

  //
  function getStatusIcon(status: (typeof STATUS)[keyof typeof STATUS]) {
    if (status === "Completed" || status === "Completed clicked")
      return (
        <S.CompleteImg
          src={process.env.PUBLIC_URL + "/assets/svg/ic_progress_complete.svg"}
        />
      );
    if (status === "In Progress")
      return (
        <S.CompleteImg
          src={process.env.PUBLIC_URL + "/assets/svg/ic_progress_ing.svg"}
        />
      );
    return null;
  }
};

const S = {
  Wrapper: styled.div<{ variantStyle: CSSProp }>`
    position: relative;
    ${(props) => props.variantStyle}

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;

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
  CompleteImg: styled.img`
    position: absolute;
    right: 2px;
    top: 2px;
  `,
};

const BLOCK_TYPE = {
  [STATUS.IN_PROGRESS]: css`
    color: var(--color-main-dark, #008395);
    background-color: #e1f4ff;
    border: 0.5px solid #e1f4ff;
  `,
  [STATUS.COMPLETED]: css`
    color: #f9f9fb;
    background-color: var(--color-sub-blue);
    border: 0.5px solid #f4f7fd;
  `,
  [STATUS.NOT_STARTED]: css`
    color: var(--color-gray-400, #bdc1c6);
    background-color: #f4f7fd;
    border: 0.5px solid #f4f7fd;
  `,
  [STATUS.COMPLETED_FOCUS]: css`
    color: #f9f9fb;
    background-color: var(--color-sub-blue);
    border: 1px solid #e1f4ff;
  `,
};
