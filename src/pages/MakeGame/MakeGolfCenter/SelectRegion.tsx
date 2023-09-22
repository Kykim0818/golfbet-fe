import { useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../components/Button";
import { ModalStyle } from "../../../styles/page";

type SelectRegionProps = {
  selectRegion?: string;
  handleSelectRegion: (value: string) => void;
};

const REGIONS = [
  "서울",
  "경기 남부",
  "경기 북부",
  "강원",
  "충청",
  "전라",
  "경상",
  "제주",
];

export const SelectRegion = ({
  selectRegion = "",
  handleSelectRegion,
}: SelectRegionProps) => {
  const [region, setRegion] = useState(selectRegion);

  return (
    <ModalStyle.Wrapper>
      <S.Body>
        <S.Title>지역 선택하기</S.Title>
        <S.Regions>
          {REGIONS.map((REGION) => {
            return (
              <RegionToggle
                key={REGION}
                label={REGION}
                isActive={REGION === region}
                onChange={() => setRegion(REGION)}
              />
            );
          })}
        </S.Regions>
      </S.Body>
      <ModalStyle.Footer>
        <Button onClick={() => handleSelectRegion(region)}>선택 완료</Button>
      </ModalStyle.Footer>
    </ModalStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  Title: styled.span`
    color: var(--color-main, #009eb2);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */
  `,
  Regions: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
};

// TOGGLE

type ToggleProps = {
  label?: string;
  isActive?: boolean;
  onChange?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const RegionToggle = ({
  label = "label1",
  isActive = false,
  onChange,
}: ToggleProps) => {
  return (
    <StyledToggle onClick={onChange} isActive={isActive}>
      {label}
    </StyledToggle>
  );
};

const StyledToggle = styled.div<{ isActive: boolean }>`
  text-align: center;
  border-radius: 34px;
  width: 100px;
  padding: 10px 22px;
  box-shadow: 0px 4px 2px 0px rgba(205, 209, 202, 0.25);
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  // TODO: typo
  color: var(--sub-text-grey, #bcbcbc);
  font-size: 14px;
  font-weight: 500;
  line-height: normal;

  // active
  ${(props) =>
    props.isActive &&
    css`
      background-color: #b0e6ed;
      border: 0.5px solid var(--color-main-dark, #009eb2);

      color: var(--color-main-dark, #009eb2);
    `}
`;
