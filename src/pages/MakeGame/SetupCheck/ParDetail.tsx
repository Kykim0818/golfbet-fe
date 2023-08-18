import { useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  holeIndex: number;
  parCount: number;
  onChange?: (holeIndex: number, parCount: number) => void;
};

export const ParDetail = ({ holeIndex, parCount }: Props) => {
  const [parCountState, setParCountState] = useState(parCount);
  const [parsOverFive, setParsOverFive] = useState(getParsOverFive(parCount));

  // TODO
  const handleOnClick = (holeIndex: number, parCount: number) => {};

  // TODO
  const handlePlusClick = () => {};
  return (
    <S.Wrapper>
      <S.HoleIndex>{holeIndex}H</S.HoleIndex>
      <S.ParSection>
        <S.Par isActive={parCountState === 3}>파3</S.Par>
        <S.Par isActive={parCountState === 4}>파4</S.Par>
        <S.Par isActive={parCountState === 5}>파5</S.Par>
        {parsOverFive.length > 0 ? (
          parsOverFive.map((par) => {
            return <S.Par isActive={par === parCountState}>파{par}</S.Par>;
          })
        ) : (
          <S.Par isActive={false}>+</S.Par>
        )}
      </S.ParSection>
    </S.Wrapper>
  );
};

function getParsOverFive(parCount: number) {
  const ret = [];
  if (parCount <= 5) return [];
  for (let i = 6; i <= parCount; i++) {
    ret.push(i);
  }
  return ret;
}

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
    border-radius: 8px;
    background-color: white;
    padding: 10px 15px 10px 20px;
  `,
  HoleIndex: styled.span`
    color: var(--color-text-grey, #494949);
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
  `,
  ParSection: styled.div`
    display: flex;
    gap: 10px;
  `,
  Par: styled.div<{ isActive: boolean }>`
    display: flex;
    justify-content: center;

    min-width: 40px;
    min-height: 40px;

    padding: 10px;
    border-radius: 15px;

    // TODO : typo

    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    ${(props) =>
      props.isActive
        ? css`
            border: 0.5px solid var(--color-main-dark, #008395);
            background-color: #b0e6ed;
            color: var(--color-main-dark, #008395);
          `
        : css`
            // todo : typo
            color: var(--color-sub-text-grey, #bcbcbc);
            background-color: #f4f7fd;
          `}
  `,
};
