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
import { handleLogin } from "../../service/login/login";
import { PageStyle } from "../../styles/page";
import { typo } from "../../styles/typo";
import { Agreements } from "../TermsAndConditions/TermsAndConditions";

type UserInputHelpUI = {
  formatStatus: boolean;
  /** 중복 확인 여부 true : 가입 가능 , false : 가입 불가 */
  duplicateStatus: boolean;
  text: string;
};
const INIT_HELP_TEXT = "";

const INVALID_EMAIL_TEXT = "이메일 주소가 유효하지 않습니다.";
const DUPLICATE_EMAIL_TEXT = "중복된 이메일 주소가 존재합니다.";
const OK_EMAIL_TEXT = "등록 가능한 이메일입니다.";

const INVALID_NICKNAME =
  "10자 이내의 한글,영문,숫자,밑줄 그리고 마침표만 사용가능합니다.";
const DUPLICATE_NICKNAME_TEXT = "등록 가능한 닉네임입니다.";
const OK_NICKNAME_TEXT = "등록 가능한 닉네임입니다.";
// const INVALID_PHONE_NUMBER = "휴대폰번호가 유효하지 않습니다.";

export const NewUserInfo = () => {
  const { moveBack, goHome } = usePageRoute();
  const { state }: { state: Agreements } = useLocation();
  let tmpUserInfo: any = localStorage.getItem("tmpUserInfo");
  if (state === null || tmpUserInfo === null) history.go(-1);
  if (tmpUserInfo) {
    tmpUserInfo = JSON.parse(tmpUserInfo);
  }

  // TODO : 카카오에서 전해주는 정보가 있다면 해당 값으로 초기화
  const [userEmail, setUserEmail] = useState(tmpUserInfo.email ?? "");
  const [userEmailHelp, setUserEmailHelp] = useState<UserInputHelpUI>({
    formatStatus: false,
    duplicateStatus: false,
    text: INIT_HELP_TEXT,
  });
  const [nickname, setNickname] = useState(tmpUserInfo?.nickname ?? "");
  const [nicknameHelp, setNicknameHelp] = useState<UserInputHelpUI>({
    formatStatus: false,
    duplicateStatus: false,
    text: INIT_HELP_TEXT,
  });
  const [gender, setGender] = useState(tmpUserInfo.gender ?? "male");

  // 초기 페이지 진입시 확인
  useEffect(() => {
    if (tmpUserInfo.email) {
      const checkFormatEmail = validEmailCheck(tmpUserInfo.email);
      if (checkFormatEmail === false) return;

      apiCheckDuplicate("email", tmpUserInfo.email).then((res) => {
        if (res?.duplicateYn === false) {
          setUserEmailHelp({
            formatStatus: true,
            duplicateStatus: true,
            text: OK_EMAIL_TEXT,
          });
        } else {
          setUserEmailHelp({
            formatStatus: true,
            duplicateStatus: false,
            text: DUPLICATE_EMAIL_TEXT,
          });
        }
      });
    }
  }, [tmpUserInfo.email]);

  useEffect(() => {
    if (tmpUserInfo.nickname) {
      const checkFormatNickname = validNicknameCheck(tmpUserInfo.nickname);
      if (checkFormatNickname === false) return;

      apiCheckDuplicate("nickname", tmpUserInfo.nickname).then((res) => {
        if (res?.duplicateYn === false) {
          setNicknameHelp({
            formatStatus: true,
            duplicateStatus: true,
            text: OK_NICKNAME_TEXT,
          });
        } else {
          setNicknameHelp({
            formatStatus: true,
            duplicateStatus: false,
            text: DUPLICATE_NICKNAME_TEXT,
          });
        }
      });
    }
  }, [tmpUserInfo.nickname]);

  const handleSetUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validEmailCheck(e.target.value) === false) {
      setUserEmailHelp({
        formatStatus: false,
        duplicateStatus: false,
        text: INVALID_EMAIL_TEXT,
      });
    } else {
      setUserEmailHelp({
        formatStatus: true,
        duplicateStatus: false,
        text: INIT_HELP_TEXT,
      });
    }
    setUserEmail(e.target.value);
  };
  const handleFocusOutEmail = () => {
    // email 중복검사
    if (userEmail !== "" && validEmailCheck(userEmail)) {
      apiCheckDuplicate("email", userEmail).then((res) => {
        console.log(res);
        if (res?.duplicateYn === false) {
          setUserEmailHelp({
            formatStatus: true,
            duplicateStatus: true,
            text: "등록 가능한 이메일입니다.",
          });
        } else {
          setUserEmailHelp({
            formatStatus: true,
            duplicateStatus: false,
            text: "중복된 이메일 주소가 존재합니다.",
          });
        }
      });
    }
  };
  const handleSetNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO 유효성검사
    if (validNicknameCheck(e.target.value) === false) {
      setNicknameHelp({
        formatStatus: false,
        duplicateStatus: false,
        text: INVALID_NICKNAME,
      });
    } else {
      setNicknameHelp({
        formatStatus: true,
        duplicateStatus: false,
        text: INIT_HELP_TEXT,
      });
    }
    setNickname(e.target.value);
  };

  const handleFocusOutNickname = () => {
    if (nickname !== "" && validNicknameCheck(nickname)) {
      // 닉네임 중복검사
      console.log("중복검사");
      apiCheckDuplicate("nickname", nickname).then((res) => {
        console.log(res);
        if (res?.duplicateYn === false) {
          setNicknameHelp({
            formatStatus: true,
            duplicateStatus: true,
            text: "등록 가능한 닉네임입니다.",
          });
        } else {
          setNicknameHelp({
            formatStatus: true,
            duplicateStatus: false,
            text: "중복된 닉네임이 존재합니다.",
          });
        }
      });
    }
  };

  const handleRequestJoin = async () => {
    // TODO 해당정보로 가입 요청
    const res = await apiSignUp({
      platformId: tmpUserInfo.platformId,
      email: userEmail,
      profile: tmpUserInfo.profile,
      nickname: nickname,
      gender: gender,
      phoneNumber: "none",
      termsOfServiceAgreement: state.serviceAvailable,
      privacyUsageAgreement: state.personalInfo,
      marketingConsent: state.marketingOption,
    });
    //
    if (res) {
      const ret = handleLogin(res.data.accessToken);
      if (ret) {
        console.log(ret);
        goHome();
      }
    } else {
      // TODO 처리 필요
      console.log("회원가입에 실패했습니다. 잠시후 다시 시도해주세요");
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
              valid={
                userEmailHelp.formatStatus && userEmailHelp.duplicateStatus
              }
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
              valid={nicknameHelp.formatStatus && nicknameHelp.duplicateStatus}
              text={nicknameHelp.text}
            >
              {nicknameHelp.text}
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
      <PageStyle.Footer>
        <Button
          onClick={handleRequestJoin}
          disabled={
            !(
              userEmailHelp.formatStatus &&
              userEmailHelp.duplicateStatus &&
              nicknameHelp.formatStatus &&
              nicknameHelp.duplicateStatus
            )
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
