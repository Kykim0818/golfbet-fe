import { forwardRef } from "react";
import styled, { css } from "styled-components";

export interface CheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  value?: string;
  size?: "sm" | "md" | "lg";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const sizeStyle = SIZES[props.size ?? "sm"];
    return (
      <StyledCheckbox>
        <input
          type="checkbox"
          disabled={props.disabled}
          checked={props.checked}
          onChange={props.onChange}
          value={props.value}
          ref={ref}
        />
        {props.checked ? <Checked /> : <UnChecked />}
        {props.label !== undefined && <p>{props.label}</p>}
      </StyledCheckbox>
    );
  }
);

const StyledCheckbox = styled.label`
  // hidden native checkbox
  input[type="checkbox"] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }

  display: flex;
  align-items: center;
  gap: 4px;
`;

const UnChecked = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #d1d1d6;
  border-radius: 4px;
`;

const Checked = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-main);
  background-color: var(--color-main);
  border-radius: 4px;

  background-image: url("/assets/svg/ic_check.svg");
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: 50%;
`;

const SIZES = {
  sm: css`
    --checkbox-width-size: 18px;
    --checkbox-height-size: 18px;
  `,
  md: css`
    --checkbox-width-size: 27px;
    --checkbox-height-size: 27px;
  `,
  lg: css`
    --checkbox-width-size: 36px;
    --checkbox-height-size: 36px;
  `,
};
