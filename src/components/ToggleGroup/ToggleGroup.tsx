import styled, { css } from "styled-components";
import { Toggle } from "../Toggle/Toggle";
import { useState } from "react";
import { deepClone } from "../../utils/deepClone";

type ToggleGroupProps = {
  isMultiSelect?: boolean;
  value: unknown[];
  group: Info[];
  onChange?: (value: unknown[]) => unknown;
};

type Info = {
  label: string;
  value: unknown;
};

export const ToggleGroup = ({
  isMultiSelect = false,
  group,
  value,
}: ToggleGroupProps) => {
  const [currentValue, setCurrentValue] = useState(new Set(value));

  const handleToggleChange = (selectValue: unknown) => {
    const cloneValue = deepClone(currentValue);
    if (isMultiSelect) {
      if (currentValue.has(selectValue)) {
        cloneValue.delete(selectValue);
      } else {
        cloneValue.add(selectValue);
      }
      setCurrentValue(cloneValue);
      return;
    }
    // Single Select
    if (!currentValue.has(selectValue)) {
      setCurrentValue(new Set([selectValue]));
      return;
    }
    // false
    return;
  };

  return (
    <Styled.Wrapper>
      {group.map((element, index) => (
        <Toggle
          key={`${element.value}+${index}`}
          label={element.label}
          isActive={currentValue.has(element.value)}
          onChange={() => handleToggleChange(element.value)}
        />
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: 10px;
  `,
};
