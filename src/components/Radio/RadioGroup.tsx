import { InputHTMLAttributes, ReactNode, createContext } from "react";
import styled from "styled-components";

export const RadioContext = createContext<
  Pick<Props<any>, "value" | "onChange" | "disabled">
>({
  value: undefined,
  disabled: undefined,
  onChange: undefined,
});

type Props<T extends InputHTMLAttributes<HTMLInputElement>["value"]> = {
  label?: string;
  children: ReactNode;

  // rest
  value: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
};

export const RadioGroup = <
  T extends InputHTMLAttributes<HTMLInputElement>["value"]
>({
  label,
  children,
  ...rest
}: Props<T>) => {
  return (
    <Styled.FieldSet>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </Styled.FieldSet>
  );
};

const Styled = {
  FieldSet: styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: none;
  `,
};
