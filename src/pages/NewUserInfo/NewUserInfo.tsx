import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { history } from "../..";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TitleAsset from "../../components/TitleAsset";
import ToggleGroup from "../../components/ToggleGroup";
import { PageStyle } from "../../styles/page";
import { Agreements } from "../TermsAndConditions/TermsAndConditions";

export const NewUserInfo = () => {
  const navigate = useNavigate();
  const { state }: { state: Agreements } = useLocation();
  if (state === null) history.go(-1);

  // TODO : 카카오에서 전해주는 정보가 있다면 해당 값으로 초기화
  const [userEmail, setUserEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");

  const handleSetUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO 유효성검사
    setUserEmail(e.target.value);
  };

  const handleSetNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO 유효성검사
    setNickName(e.target.value);
  };

  const handleSetPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO 유효성검사
    setPhoneNumber(e.target.value);
  };

  const handleRequestJoin = () => {
    // TODO 해당정보로 가입 요청
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset
        title="회원 정보"
        visibleBack
        handleBack={() => navigate(-1)}
      />
      <S.Body>
        <S.InfoSection>
          <S.InputWrapper>
            <span>이메일</span>
            <StyledInput
              placeholder="이메일을 입력해주세요"
              type="email"
              value={userEmail}
              onChange={handleSetUserEmail}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <span>닉네임</span>
            <StyledInput
              placeholder="닉네임을 입력해주세요"
              type="text"
              value={nickName}
              onChange={handleSetNickName}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <span>휴대폰 번호</span>
            <StyledInput
              placeholder="휴대폰 번호를 입력해주세요"
              type="text"
              value={phoneNumber}
              onChange={handleSetPhoneNumber}
            />
          </S.InputWrapper>
          <S.ToggleWrapper>
            <span>성별</span>
            <ToggleGroup
              selectedValues={[gender]}
              group={[
                { label: "남자", value: "male" },
                { label: "여자", value: "female" },
              ]}
              onChange={(values) => setGender(values[0])}
            />
          </S.ToggleWrapper>
        </S.InfoSection>
      </S.Body>
      <S.Body></S.Body>
      <PageStyle.Footer>
        <Button>시작하기</Button>
      </PageStyle.Footer>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 16px;
    padding: 0px 20px;
  `,
  InfoSection: styled.section`
    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  ToggleWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
};

const StyledInput = styled(Input)`
  width: 100%;
  padding: 10px 20px;
  color: #acb1c6;
  background-color: white;
`;
