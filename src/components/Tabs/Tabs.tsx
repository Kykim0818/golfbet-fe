import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  defaultId?: string;
  items: TabItem[];
  onChange?: (selectItemId: string) => void;
};

export type TabItem = {
  id: string;
  label: ReactNode;
  children: ReactNode;
};

export const Tabs = ({ defaultId, items, onChange }: Props) => {
  const [tabId, setTabId] = useState(defaultId);
  const item = items.find((item) => item.id === tabId);

  const handleTabClick = (selectItemId: string) => {
    setTabId(selectItemId);
    onChange?.(selectItemId);
  };
  return (
    <S.Wrapper>
      <S.Header>
        {items.map((item) => (
          <S.TabButton
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            isActive={tabId === item.id}
          >
            {item.label}
          </S.TabButton>
        ))}
      </S.Header>
      <S.Body>{item?.children}</S.Body>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div``,
  Header: styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 28px;
  `,
  TabButton: styled.button<{ isActive: boolean }>`
    display: flex;
    padding: 0px;
    border: none;
    background-color: transparent;

    ${(props) =>
      props.isActive
        ? css`
            color: var(--color-main, #009eb2);
            font-size: 15px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          `
        : css`
            color: #afafaf;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          `}

    &:hover {
      cursor: pointer;
    }
  `,
  Body: styled.div``,
};
