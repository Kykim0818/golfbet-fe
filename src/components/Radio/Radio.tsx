import { InputHTMLAttributes, useContext } from "react";
import { RadioContext } from "./RadioGroup";

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
    <label>
      <input
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
