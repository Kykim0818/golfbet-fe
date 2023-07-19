import { ButtonHTMLAttributes } from "react";
import styled, { CSSProp, css } from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: "primary" | "outlined" | "custom";
  size?: "small" | "medium";
}

export const Button = ({
  size = "medium",
  variants = "primary",
  ...props
}: Props) => {
  return (
    <StyledButton
      {...props}
      variantStyle={VARAIANTS[variants]}
      sizeStyle={SIZE[size]}
    />
  );
};

const StyledButton = styled.button<{
  variantStyle: CSSProp;
  sizeStyle: CSSProp;
}>`
  ${(props) => props.variantStyle}
  ${(props) => props.sizeStyle}
  
  display: flex;
  justify-content: center;
  width: 100%;

  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const VARAIANTS = {
  primary: css`
    background-color: var(--color-main, #009eb2);
    color: white;
    border-radius: 15px;

    &:disabled {
      background-color: #b0e6ed;
      color: rgba(255, 255, 255, 0.63);
    }
  `,
  outlined: css``,
  custom: css``,
};

const SIZE = {
  small: css`
    padding: 8px 0px;
    //font
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
  `,
  medium: css`
    padding: 12px 0px;
    //font
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
  `,
};
