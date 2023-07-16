import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

type ToggleProps = {
  label?: string;
  isActive?: boolean;
  onChange?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Toggle = ({
  label = "label1",
  isActive = false,
  onChange,
}: ToggleProps) => {
  return (
    <StyledToggle onClick={onChange} isActive={isActive}>
      {label}
    </StyledToggle>
  );
};

const StyledToggle = styled.div<{ isActive: boolean }>`
  border-radius: 34px;
  width: fit-content;
  padding: 10px 22px;
  box-shadow: 0px 4px 2px 0px rgba(205, 209, 202, 0.25);
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  // TODO: typo
  color: var(--sub-text-grey, #bcbcbc);
  font-size: 14px;
  font-weight: 500;
  line-height: normal;

  // active
  ${(props) =>
    props.isActive &&
    css`
      background-color: var(--color-main, #009eb2);
      color: white;
    `}
`;
