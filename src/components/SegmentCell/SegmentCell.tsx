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
    background-color: white;
    border-radius: 25px;
  `,
  Button: styled.button<{ isActive?: boolean }>`
    width: 100%;
    background-color: ${(props) =>
      props.isActive ? `var(--color-main,#009eb2)` : "white"};
    color: ${(props) => (props.isActive ? "white" : "black")};
    box-shadow: ${(props) =>
      props.isActive ? `0px 2px 4px 0px rgba(0, 0, 0, 0.1)` : ""};

    border-radius: 25px;
    border: none;
    padding: 11px 55px;
  `,
};
