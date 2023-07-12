import { useState } from "react";
import styled from "styled-components";

type Props<T extends unknown> = {
  /** required value unique */
  cells?: Cell<T>[];
  selectCellValue: T;
  handleSelectCell?: (cell: Cell<T>) => unknown;
};

type Cell<T> = {
  label: string;
  value: T;
};

export const SegmentCell = <T extends unknown>({
  cells,
  selectCellValue,
  handleSelectCell,
}: Props<T>) => {
  const [activeCell, setActiveCell] = useState<T>(selectCellValue);
  const handleOnClick = (cell: Cell<T>) => {
    setActiveCell(cell.value);
    handleSelectCell?.(cell);
  };

  return (
    <Styled.Wrapper>
      {cells &&
        cells.map((cell) => (
          <Styled.Button
            key={`${cell.value}`}
            onClick={() => handleOnClick(cell)}
            isActive={activeCell === cell.value}
          >
            {cell.label}
          </Styled.Button>
        ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
  `,
  Button: styled.button<{ isActive?: boolean }>`
    background-color: ${(props) => (props.isActive ? "green" : "white")};
    color: ${(props) => (props.isActive ? "white" : "black")};
  `,
};
