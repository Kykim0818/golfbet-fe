import { useState } from "react";
import styled from "styled-components";

type StepperProps = {
  currentValue?: number;
  onChange?: (value: number) => unknown;
  max?: number;
  min?: number;
  unit?: string;
};

export const Stepper = ({
  currentValue = 0,
  onChange,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  unit = "",
}: StepperProps) => {
  const [value, setValue] = useState(currentValue);

  const handleIncrement = () => {
    if (value === max) return;
    setValue(value + 1);
    onChange?.(value + 1);
  };

  const handleDecrement = () => {
    if (value === min) return;
    setValue(value - 1);
    onChange?.(value - 1);
  };

  return (
    <Styled.Wrapper>
      <Styled.Button onClick={handleDecrement}>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/stepper_minus.svg"}
          alt="minus"
        />
      </Styled.Button>
      <Styled.Span>{value + unit}</Styled.Span>
      <Styled.Button onClick={handleIncrement}>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/stepper_plus.svg"}
          alt="plus"
        />
      </Styled.Button>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 20px;

    background-color: white;
    border-radius: 34px;
  `,
  Button: styled.button`
    display: flex;
    border: none;
    align-items: center;
    background-color: transparent;
  `,
  Span: styled.span`
    color: #3b3c40;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  `,
};
