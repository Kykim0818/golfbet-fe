import { useState } from "react";
import styled from "styled-components";
import { deepClone } from "../../utils/deepClone";
import { Toggle } from "../Toggle/Toggle";

type ToggleGroupProps = {
  isMultiSelect?: boolean;
  // multi toggle case
  multiSelectResetValue?: string;
  selectedValues: string[];
  group: { label: string; value: string }[];
  onChange?: (values: string[]) => void;
};

export const ToggleGroup = ({
  isMultiSelect = false,
  multiSelectResetValue,
  group,
  selectedValues,
  onChange,
}: ToggleGroupProps) => {
  const [currentValue, setCurrentValue] = useState(new Set(selectedValues));

  const handleToggleChange = (selectValue: string) => {
    let cloneValue = deepClone(currentValue);
    if (isMultiSelect) {
      // reset
      if (selectValue === multiSelectResetValue) {
        cloneValue = new Set([selectValue]);
        setCurrentValue(cloneValue);
        onChange?.(Array.from(cloneValue));
        return;
      }

      if (currentValue.has(selectValue)) {
        cloneValue.delete(selectValue);
      } else {
        cloneValue.add(selectValue);
      }

      // 없음 누른상태에서 다른거 누르면 없음 해제
      if (multiSelectResetValue !== undefined)
        cloneValue.delete(multiSelectResetValue);
      // 해제 했을때 아무것도 없으면 없음 체크
      if (cloneValue.size === 0 && multiSelectResetValue) {
        cloneValue.add(multiSelectResetValue);
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
