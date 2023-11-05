import styled, { css } from "styled-components";
import { PageStyle } from "../../styles/page";
import { usePageRoute } from "../../hooks/usePageRoute";
import TitleAsset from "../../components/TitleAsset";
import { typo } from "../../styles/typo";
import Button from "../../components/Button";

export const Setting = () => {
  const { goHome, movePage } = usePageRoute();
  return (
    <PageStyle.Wrapper>
      <TitleAsset title="설정" />
      <S.Body>
        <S.ProfileSection>
          <S.UserImg
            src={process.env.PUBLIC_URL + "/assets/images/profile_test_img.png"}
          />
          <S.UserNickname>Test님</S.UserNickname>
          <Button
            variants="info"
            style={{ width: "fit-content", padding: "6px 25px" }}
          >
            내 정보 수정
          </Button>
        </S.ProfileSection>
        <S.MenuSection>
          <S.Menu first>
            <S.MenuTxt>공지사항</S.MenuTxt>
            <RightArrow />
          </S.Menu>
          <S.Menu onClick={() => movePage("account")}>
            <S.MenuTxt>계정 관리</S.MenuTxt>
            <RightArrow />
          </S.Menu>
          <S.Menu>
            <S.MenuTxt>FAQ</S.MenuTxt>
            <RightArrow />
          </S.Menu>
          <S.Menu>
            <S.MenuTxt>약관 및 정책</S.MenuTxt>
            <RightArrow />
          </S.Menu>
          <S.Menu>
            <S.MenuTxt>문의하기</S.MenuTxt>
            <RightArrow />
          </S.Menu>
          <S.Menu last>
            <S.MenuTxt>앱 정보</S.MenuTxt>
            <S.VersionSection>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "flex-end",
                }}
              >
                <span className="current-status">최신버전 입니다.</span>
                <RightArrow />
              </div>
              <S.VersionInfo>현재버전 1.0.0 v1</S.VersionInfo>
            </S.VersionSection>
          </S.Menu>
        </S.MenuSection>
      </S.Body>
      <S.Footer>
        <S.FooterC1 onClick={goHome}>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_home.svg"}
          />
        </S.FooterC1>
        <S.FooterB onClick={() => movePage("/score_history")}>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_score.svg"}
            alt="no icons"
          />
        </S.FooterB>
        <S.FooterB
          onClick={() => {
            console.log("//");
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_menu.svg"}
            alt="no icons"
          />
        </S.FooterB>
      </S.Footer>
    </PageStyle.Wrapper>
  );
};

const RightArrow = () => {
  return (
    <img src={process.env.PUBLIC_URL + "/assets/svg/ic_right_arrow.svg"} />
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
    padding: 0 26px;
    flex-grow: 1;
  `,
  //
  ProfileSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 45px;
  `,
  UserImg: styled.img`
    width: 85px;
    height: 85px;
    border-radius: 50%;
    margin-top: 20px;
    margin-bottom: 10px;
  `,
  UserNickname: styled.span`
    color: var(--color-gery-800, #3c4043);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
    margin-bottom: 15px;
  `,
  // menu
  MenuSection: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Menu: styled.div<{ first?: boolean; last?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 17px 15px 17.5px 15px;
    background-color: #fefefe;
    border-bottom: 0.5px solid rgba(217, 217, 217, 0.3);
    //
    ${(props) =>
      props.first &&
      css`
        border-radius: 15px 15px 0px 0px;
      `}
    ${(props) =>
      props.last &&
      css`
        padding: 15px;
        border-radius: 0px 0px 15px 15px;
        border-bottom: none;
      `}
  `,
  MenuTxt: styled.span`
    color: var(--color-grey-800, #3c4043);
    ${typo.s14w400}
  `,
  VersionSection: styled.div`
    display: flex;
    flex-direction: column;
    .current-status {
      color: var(--color-main-darker, #003d45);
      ${typo.s12w500}
    }
  `,
  VersionInfo: styled.span`
    margin-left: 16px;
    ${typo.s10w400}
    color: var(--color-grey-400, #bdc1c6);
  `,
  //
  Footer: styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    height: 73px;

    position: fixed;
    bottom: 0;

    background-color: #ffffff;
    border-radius: 46px 46px 0px 0px;
  `,
  FooterC1: styled.div`
    position: absolute;

    left: calc(50% - 38px);
    top: -38px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  FooterB: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  `,
};
