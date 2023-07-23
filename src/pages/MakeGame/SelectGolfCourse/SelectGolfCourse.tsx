import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Tabs from "../../../components/Tabs";
import { TabItem } from "../../../components/Tabs/Tabs";

export const SelectGolfCourse = () => {
  return (
    <Styled.Wrapper>
      <Styled.Body>
        <div>
          <Input placeholder="골프장을 검색해주세요" />
        </div>
        <Button style={{ width: "fit-content" }} variants="outlined">
          +직접 추가하기
        </Button>
        <Styled.Section>
          <Tabs items={testTabItems} onChange={() => {}} />
        </Styled.Section>
      </Styled.Body>
      <Styled.Footer>
        <Button disabled>선택하기</Button>
      </Styled.Footer>
    </Styled.Wrapper>
  );
};

const testTabItems: TabItem[] = [
  {
    id: "1",
    label: "최근",
    children: <div>children</div>,
  },
];
const Styled = {
  Wrapper: styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  Section: styled.section`
    margin-top: 25px;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
