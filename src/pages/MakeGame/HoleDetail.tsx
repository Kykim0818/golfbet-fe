import { useState } from "react";
import styled from "styled-components";

type Props = {
  holeNumber: number;
  parCount: number;
  onChange: (par: number) => void;
  disable?: boolean;
};

const defaultPars = [3, 4, 5];

export const HoleDetail = ({
  holeNumber,
  parCount,
  onChange,
  disable = false,
}: Props) => {
  const [selectPar, setSelectPar] = useState(parCount);

  const handleClickParToggle = (par: number) => {
    if (disable) return;
    setSelectPar(par);
    onChange(par);
  };

  return (
    <Styled.Wrapper>
      <span>{holeNumber}H</span>
      <Styled.Par>
        {defaultPars.map((par) => (
          <Styled.ParToggle
            isActive={par === selectPar}
            onClick={() => handleClickParToggle(par)}
          >
            파{par}
          </Styled.ParToggle>
        ))}
        <Styled.ParToggle isActive={selectPar > 5}>+</Styled.ParToggle>
      </Styled.Par>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: 50px;
    padding: 10px 15px 10px 20px;
  `,
  Par: styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
  `,
  ParToggle: styled.div<{ isActive?: boolean }>`
    background-color: ${(props) => (props.isActive ? "#B0E6ED" : "#BCBCBC")};
    &:hover {
      cursor: pointer;
    }
  `,
};
