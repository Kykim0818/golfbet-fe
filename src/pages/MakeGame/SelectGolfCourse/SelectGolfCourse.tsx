import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TitleAsset from "../../../components/TitleAsset";

export const SelectGolfCourse = () => {
  return (
    <Styled.Wrapper>
      <TitleAsset
        title="골프장 선택"
        handleBack={() => console.log("close SelfCourse")}
      />
      <Styled.Body>
        <div>
          <Input placeholder="골프장을 검색해주세요" />
        </div>
        <Button variants="outlined">+직접 추가하기</Button>
        <section></section>
      </Styled.Body>
      <Styled.Footer>
        <Button disabled>선택하기</Button>
      </Styled.Footer>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
  `,
  Body: styled.div`
    display: flex;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
