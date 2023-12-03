import { useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  holeIndex: number;
  parCount: number;
  onChange?: (holeIndex: number, parCount: number) => void;
  disable?: boolean;
};

export const ParDetail = ({
  holeIndex,
  parCount,
  disable = false,
  onChange,
}: Props) => {
  const [parCountState, setParCountState] = useState(parCount);
  const [parsOverFive, setParsOverFive] = useState(getParsOverFive(parCount));

  // TODO
  const handleOnClick = (holeIndex: number, parCount: number) => {
    if (disable) return;
    // state
    setParCountState(parCount);

    // 저장값 변경
    onChange?.(holeIndex, parCount);
  };

  // TODO
  const handlePlusClick = () => {
    if (disable) return;
    const MAX_DEFAULT_PAR = 5;
    // 기본 5 + 현재까지 추가된 par + 의 다음 1
    setParsOverFive(getParsOverFive(MAX_DEFAULT_PAR + parsOverFive.length + 1));
  };
  return (
    <S.Wrapper>
      <S.HoleIndex>{holeIndex}H</S.HoleIndex>
      <S.ParSection>
        <S.Par
          isActive={parCountState === 3}
          onClick={() => handleOnClick(holeIndex, 3)}
        >
          파3
        </S.Par>
        <S.Par
          isActive={parCountState === 4}
          onClick={() => handleOnClick(holeIndex, 4)}
        >
          파4
        </S.Par>
        <S.Par
          isActive={parCountState === 5}
          onClick={() => handleOnClick(holeIndex, 5)}
        >
          파5
        </S.Par>
        {/* 6홀 이상 */}
        {parsOverFive.map((par) => {
          return (
            <S.Par
              isActive={par === parCountState}
              onClick={() => handleOnClick(holeIndex, par)}
            >
              파{par}
            </S.Par>
          );
        })}
        <S.Par isActive={false} onClick={handlePlusClick}>
          +
        </S.Par>
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
    overflow: auto;
  `,
  Par: styled.div<{ isActive: boolean }>`
    display: flex;
    justify-content: center;

    min-width: 45px;
    min-height: 40px;
    max-height: 40px;

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
    &:hover {
      cursor: pointer;
    }
  `,
};
