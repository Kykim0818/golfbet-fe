import { useState } from "react";
import styled from "styled-components";

type Props = {
  holeCount: number;
  onChange: (par: number) => void;
  disable?: boolean;
};

const defaultPars = [3, 4, 5];

export const HoleDetail = ({ holeCount, onChange, disable = false }: Props) => {
  const [selectPar, setSelectPar] = useState(3);

  const handleClickParToggle = (par: number) => {
    if (disable) return;
    setSelectPar(par);
    onChange(par);
  };

  return (
    <Styled.Wrapper>
      <span>{holeCount}H</span>
      <Styled.Par>
        {defaultPars.map((par) => (
          <Styled.ParToggle
            isActive={par === selectPar}
            onClick={() => handleClickParToggle(par)}
          >
            {par}
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
  `,
  Par: styled.div`
    display: flex;
    justify-content: center;
  `,
  ParToggle: styled.div<{ isActive?: boolean }>`
    &:hover {
      cursor: pointer;
    }
  `,
};
