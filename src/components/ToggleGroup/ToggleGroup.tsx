import { useState } from "react";
import styled from "styled-components";
import { deepClone } from "../../utils/deepClone";
import { Toggle } from "../Toggle/Toggle";

type ToggleGroupProps = {
  isMultiSelect?: boolean;
  selectedValues: string[];
  group: { label: string; value: string }[];
  onChange?: (values: string[]) => void;
};

export const ToggleGroup = ({
  isMultiSelect = false,
  group,
  selectedValues,
  onChange,
}: ToggleGroupProps) => {
  const [currentValue, setCurrentValue] = useState(new Set(selectedValues));

  const handleToggleChange = (selectValue: string) => {
    let cloneValue = deepClone(currentValue);
    if (isMultiSelect) {
      if (currentValue.has(selectValue)) {
        cloneValue.delete(selectValue);
      } else {
        cloneValue.add(selectValue);
      }
      setCurrentValue(cloneValue);
      onChange?.(Array.from(cloneValue));
      return;
    }

    // Single Select
    if (!currentValue.has(selectValue)) {
      cloneValue = new Set([selectValue]);
      setCurrentValue(cloneValue);
      onChange?.(Array.from(cloneValue));
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
