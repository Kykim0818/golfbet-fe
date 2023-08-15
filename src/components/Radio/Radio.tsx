import { InputHTMLAttributes, useContext } from "react";
import { RadioContext } from "./RadioGroup";
import styled from "styled-components";

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "children" | "name" | "defaultChecked" | "disabled"
  > {
  //
}

export const Radio = ({
  children,
  value,
  name,
  defaultChecked,
  disabled,
}: Props) => {
  const group = useContext(RadioContext);
  return (
    <label style={{ display: "flex", alignItems: "center" }}>
      <S.Input
        type="radio"
        value={value}
        name={name}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => group.onChange && group.onChange(e.target.value)}
      />
      {children}
    </label>
  );
};

const S = {
  Input: styled.input`
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--color-main);

    &:checked {
      outline: var(--color-main) solid 1.5px;
      border: 4px solid white;
      background-color: var(--color-main);
    }
  `,
};
