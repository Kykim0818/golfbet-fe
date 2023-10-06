import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Checkbox from "../../components/CheckBox";
import TitleAsset from "../../components/TitleAsset";
import { usePageRoute } from "../../hooks/usePageRoute";
import { PageStyle } from "../../styles/page";

export type Agreements = {
  serviceAvailable: boolean;
  personalInfo: boolean;
  marketingOption: boolean;
};

export const TermsAndConditions = () => {
  const { movePage, moveBack } = usePageRoute();
  // 서비스 이용약관
  // 개인정보 수집 및 이용 동의
  // E-mail 및 SMS 광고성 정보 수신 동의(선택)
  const [allCheck, setAllCheck] = useState(false);
  const [serviceAvailableCheck, setServiceAvailableCheck] = useState(false);
  const [personalInfoCheck, setPersonalInfoCheck] = useState(false);
  const [marketingOptionCheck, setMarketingOptionCheck] = useState(false);

  const handleAllCheck = () => {
    if (allCheck) {
      setServiceAvailableCheck(false);
      setPersonalInfoCheck(false);
      setMarketingOptionCheck(false);
      setAllCheck(false);
    } else {
      setServiceAvailableCheck(true);
      setPersonalInfoCheck(true);
      setMarketingOptionCheck(true);
      setAllCheck(true);
    }
  };

  const handleNewUserInfoPage = () => {
    movePage("/new_user_info", {
      state: {
        serviceAvailable: serviceAvailableCheck,
        personalInfo: personalInfoCheck,
        marketingOption: marketingOptionCheck,
      },
    });
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset visibleBack handleBack={() => moveBack()} />
      <S.Body>
        <Checkbox
          label="전체 동의"
          checked={allCheck}
          onChange={handleAllCheck}
        />
        <S.Line />
        <S.CheckBoxGroup>
          <Checkbox
            label="서비스 이용약관(필수)"
            checked={serviceAvailableCheck}
            onChange={() => setServiceAvailableCheck((prev) => !prev)}
          />
          <Checkbox
            checked={personalInfoCheck}
            label="개인정보 수집 및 이용 동의(필수)"
            onChange={() => setPersonalInfoCheck((prev) => !prev)}
          />
          <S.HelpTextCheckWrapper>
            <Checkbox
              checked={marketingOptionCheck}
              label="E-mail 및 SMS 광고성 정보 수신 동의(선택)"
              onChange={() => setMarketingOptionCheck((prev) => !prev)}
            />
            <span>*다양한 프로모션 소식과 업데이트 정보를 보내드립니다.</span>
          </S.HelpTextCheckWrapper>
        </S.CheckBoxGroup>
      </S.Body>
      <PageStyle.Footer>
        <Button
          disabled={
            serviceAvailableCheck === false || personalInfoCheck === false
          }
          onClick={handleNewUserInfoPage}
        >
          다음
        </Button>
      </PageStyle.Footer>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding: 0px 20px;
  `,

  CheckBoxGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 27px;
  `,

  HelpTextCheckWrapper: styled.div`
    display: flex;
    flex-direction: column;
    span {
      color: var(--color-sub-text-grey, #bcbcbc);
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-left: 30px;
    }
  `,

  Line: styled.div`
    height: 1px;
    opacity: 0.4;
    background: var(--color-sub-text-grey, #bcbcbc);
    margin: 25px 0px;
  `,
};
