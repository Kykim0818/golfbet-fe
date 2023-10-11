import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { history } from "../..";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TitleAsset from "../../components/TitleAsset";
import ToggleGroup from "../../components/ToggleGroup";
import { usePageRoute } from "../../hooks/usePageRoute";
import { apiCheckDuplicate, apiSignUp } from "../../service/api/user";
import { PageStyle } from "../../styles/page";
import { typo } from "../../styles/typo";
import { Agreements } from "../TermsAndConditions/TermsAndConditions";
import { handleLogin } from "../../service/login/login";

type UserInputHelpUI = {
  status: boolean;
  text: string;
};
const INIT_HELP_TEXT = "";
const INVALID_EMAIL = "이메일 주소가 유효하지 않습니다.";
const INVALID_NICKNAME =
  "10자 이내의 한글,영문,숫자,밑줄 그리고 마침표만 사용가능합니다.";
const INVALID_PHONE_NUMBER = "휴대폰번호가 유효하지 않습니다.";

export const NewUserInfo = () => {
  const { moveBack } = usePageRoute();
  const { state }: { state: Agreements } = useLocation();
  let tmpUserInfo: any = localStorage.getItem("tmpUserInfo");
  if (state === null || tmpUserInfo === null) history.go(-1);
  if (tmpUserInfo) {
    tmpUserInfo = JSON.parse(tmpUserInfo);
  }

  // TODO : 카카오에서 전해주는 정보가 있다면 해당 값으로 초기화
  const [userEmail, setUserEmail] = useState(tmpUserInfo.email ?? "");
  const [userEmailHelp, setUserEmailHelp] = useState<UserInputHelpUI>({
    status: false,
    text: INIT_HELP_TEXT,
  });
  const [nickname, setNickname] = useState(tmpUserInfo?.nickname ?? "");
  const [nicknameHelp, setNicknameHelp] = useState<UserInputHelpUI>({
    status: false,
    text: INIT_HELP_TEXT,
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberHelp, setPhoneNumberHelp] = useState<UserInputHelpUI>({
    status: false,
    text: INIT_HELP_TEXT,
  });
  const [gender, setGender] = useState(tmpUserInfo.gender ?? "male");

  // 초기 페이지 진입시 확인
  useEffect(() => {
    if (tmpUserInfo.email) {
      apiCheckDuplicate("email", tmpUserInfo.email).then((res) => {
        if (res?.duplicateYn === false) {
          setUserEmailHelp({
            status: true,
            text: "등록 가능한 이메일입니다.",
          });
        } else {
          setUserEmailHelp({
            status: false,
            text: "중복된 이메일 주소가 존재합니다.",
          });
        }
      });
    }
  }, [tmpUserInfo.email]);

  useEffect(() => {
    if (tmpUserInfo.nickname) {
      apiCheckDuplicate("nickname", tmpUserInfo.nickname).then((res) => {
        if (res?.duplicateYn === false) {
          setNicknameHelp({
            status: true,
            text: "등록 가능한 닉네임입니다.",
          });
        } else {
          setUserEmailHelp({
            status: false,
            text: "중복된 닉네임이 존재합니다.",
          });
        }
      });
    }
  }, [tmpUserInfo.nickname]);

  const handleSetUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmailHelp({
      status: true,
      text: INIT_HELP_TEXT,
    });
    // TODO 유효성검사
    if (validEmailCheck(e.target.value) === false) {
      setUserEmailHelp({
        status: false,
        text: INVALID_EMAIL,
      });
    }
    setUserEmail(e.target.value);
  };
  const handleFocusOutEmail = () => {
    // email 중복검사
    if (userEmail !== "" && validEmailCheck(userEmail)) {
      apiCheckDuplicate("email", userEmail).then((res) => {
        if (res?.duplicateYn === false) {
          setUserEmailHelp({
            status: true,
            text: "등록 가능한 이메일입니다.",
          });
        } else {
          setUserEmailHelp({
            status: false,
            text: "중복된 이메일 주소가 존재합니다.",
          });
        }
      });
    }
  };
  const handleSetNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameHelp({
      status: true,
      text: INIT_HELP_TEXT,
    });
    // TODO 유효성검사
    if (validNicknameCheck(e.target.value) === false) {
      setNicknameHelp({
        status: false,
        text: INVALID_NICKNAME,
      });
    }
    setNickname(e.target.value);
  };

  const handleFocusOutNickname = () => {
    if (nickname !== "" && validNicknameCheck(nickname)) {
      // 닉네임 중복검사
      apiCheckDuplicate("nickname", nickname).then((res) => {
        if (res?.duplicateYn === false) {
          setNicknameHelp({
            status: true,
            text: "등록 가능한 닉네임입니다.",
          });
        } else {
          setUserEmailHelp({
            status: false,
            text: "중복된 닉네임이 존재합니다.",
          });
        }
      });
    }
  };

  const handleSetPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberHelp({
      status: false,
      text: INIT_HELP_TEXT,
    });
    // TODO 유효성검사
    if (validPhoneNumberCheck(e.target.value) === false) {
      setPhoneNumberHelp({
        status: false,
        text: INVALID_PHONE_NUMBER,
      });
    }
    setPhoneNumber(e.target.value);
  };

  const handleRequestJoin = async () => {
    // TODO 해당정보로 가입 요청
    const res = await apiSignUp({
      platformId: tmpUserInfo.platformId,
      email: userEmail,
      nickname: nickname,
      gender: gender,
      phoneNumber: phoneNumber,
      termsOfServiceAgreement: state.serviceAvailable,
      privacyUsageAgreement: state.personalInfo,
      marketingConsent: state.marketingOption,
    });
    //
    if (res) {
      handleLogin(res.data.refreshToken, res.data.accessToken);
    }
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset title="회원 정보" visibleBack handleBack={() => moveBack()} />
      <S.Body>
        <S.InfoSection>
          <S.InputWrapper>
            <S.InputTitle>이메일</S.InputTitle>
            <StyledInput
              placeholder="이메일을 입력해주세요"
              type="email"
              value={userEmail}
              onChange={handleSetUserEmail}
              onBlur={handleFocusOutEmail}
            />
            <S.InputHelpText
              valid={userEmailHelp.status}
              text={userEmailHelp.text}
            >
              {userEmailHelp.text}
            </S.InputHelpText>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>닉네임</S.InputTitle>
            <StyledInput
              placeholder="닉네임을 입력해주세요"
              type="text"
              value={nickname}
              onChange={handleSetNickName}
              onBlur={handleFocusOutNickname}
            />
            <S.InputHelpText
              valid={nicknameHelp.status}
              text={nicknameHelp.text}
            >
              {nicknameHelp.text}
            </S.InputHelpText>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>휴대폰 번호(010-0000-0000)</S.InputTitle>
            <StyledInput
              placeholder="휴대폰 번호를 입력해주세요"
              type="text"
              value={phoneNumber}
              onChange={handleSetPhoneNumber}
            />
            <S.InputHelpText
              valid={phoneNumberHelp.status}
              text={phoneNumberHelp.text}
            >
              {phoneNumberHelp.text}
            </S.InputHelpText>
          </S.InputWrapper>
          <S.ToggleWrapper>
            <S.InputTitle>성별</S.InputTitle>
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
        <Button
          onClick={handleRequestJoin}
          disabled={
            !(userEmailHelp.status && nicknameHelp.status && phoneNumber !== "")
          }
        >
          시작하기
        </Button>
      </PageStyle.Footer>
    </PageStyle.Wrapper>
  );
};

function validEmailCheck(value: string) {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return value.match(pattern) != null;
}
function validNicknameCheck(value: string) {
  const pattern = /^[a-zA-Z0-9_\.\ㄱ-ㅎㅏ-ㅣ가-힣]{1,10}$/;
  return value.match(pattern) != null;
}
function validPhoneNumberCheck(value: string) {
  const pattern = /^(010|011|016|017|018|019)-[0-9]{3,4}-[0-9]{4}$/;
  return value.match(pattern) !== null;
}

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
  InputTitle: styled.span`
    ${typo.s12w500};
    color: #acb1c6;
  `,
  InputHelpText: styled.span<{ valid?: boolean; text: string }>`
    display: ${(props) => (props.text === "" ? "none" : "")};
    ${typo.s10w400}
    margin-top: -15px;
    padding-left: 20px;
    color: ${(props) => (props.valid ? "#2A77C2" : `var(--color-alert, #f00)`)};
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
