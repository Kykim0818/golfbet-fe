import { ButtonHTMLAttributes } from "react";
import styled, { CSSProp, css } from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: "primary" | "outlined" | "info" | "custom";
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
  display: flex;
  justify-content: center;
  padding: 12px 0px;
  width: 100%;
  outline: none;

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.sizeStyle}
  ${(props) => props.variantStyle}
`;

const VARAIANTS = {
  primary: css`
    border: none;
    background-color: var(--color-main, #009eb2);
    color: white;
    border-radius: 15px;

    &:disabled {
      background-color: #b0e6ed;
      color: rgba(255, 255, 255, 0.63);
    }
  `,
  info: css`
    border: none;
    background-color: var(--color-main-light-hover, #d9f3f6);
    color: var(--color-main);
    border-radius: 15px;

    &:disabled {
      background-color: #e6e6e6;
      color: #fefefe;
    }
  `,
  outlined: css`
    border: 1px solid var(--color-main, #009eb2);
    color: var(--color-main, #009eb2);
    background-color: transparent;
    border-radius: 15px;
    padding: 11px 0px;
    &:hover {
      background-color: #e6f7f9;
    }
  `,
  custom: css`
    border: none;
    border-radius: 15px;
  `,
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
