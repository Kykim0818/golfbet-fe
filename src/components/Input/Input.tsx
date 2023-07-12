import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // custom varaints
}

export const Input = ({ ...props }: Props) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 34px;
  border: 1px solid var(--color-bg, #f6f8fc);

  font-size: 14px;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
    border: 1px solid var(--color-main, #009eb2);
  }

  &::placeholder {
    color: #acb1c6;
  }
`;
