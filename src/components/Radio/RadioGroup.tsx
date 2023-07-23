import { InputHTMLAttributes, ReactNode, createContext } from "react";

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
    <fieldset>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </fieldset>
  );
};
