import { ReactNode, useState } from "react";
import styled from "styled-components";

type Props = {
  defaultId?: string;
  items: TabItem[];
  onChange: (selectItemId: string) => void;
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
          <button key={item.id} onClick={() => handleTabClick(item.id)}>
            {item.label}
          </button>
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
  `,
  Body: styled.div``,
};
