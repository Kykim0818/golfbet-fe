import styled from "styled-components";
import TitleAsset from "../../components/TitleAsset";
import { usePageRoute } from "../../hooks/usePageRoute";
import { PageStyle } from "../../styles/page";
import { typo } from "../../styles/typo";
import { useAccount } from "../../hooks/useAccount";
import { useModal } from "../../hooks/useModal";

export const ManageAccount = () => {
  const { moveBack } = usePageRoute();
  const { handleLogout } = useAccount();
  const { openModal } = useModal();

  const handleLogoutClick = async () => {
    const modalRes = await openModal({
      id: "ALERT",
      args: {
        title: "로그아웃",
        msg: "계정이 로그아웃 되었습니다.",
        okBtnLabel: "확인",
      },
    });
    if (modalRes) handleLogout();
    return;
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset visibleBack handleBack={moveBack} title="계정 관리" />
      <S.Body>
        <S.Menu onClick={handleLogoutClick}>
          <S.NameSection>
            <img
              alt="logout"
              src={process.env.PUBLIC_URL + "/assets/svg/ic_setting_logout.svg"}
            />
            <span>로그아웃</span>
          </S.NameSection>
          <img
            alt="right arrow"
            src={process.env.PUBLIC_URL + "/assets/svg/ic_right_arrow.svg"}
          />
        </S.Menu>
        <S.Menu>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <S.MenuWrapper>
              <S.NameSection>
                <img
                  alt="withdraw"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/svg/ic_setting_withdraw.svg"
                  }
                />
                <span>회원 탈퇴</span>
              </S.NameSection>
              <img
                alt="right arrow"
                src={process.env.PUBLIC_URL + "/assets/svg/ic_right_arrow.svg"}
              />
            </S.MenuWrapper>
            <S.MenuHelperTxt>
              탈퇴 시, 기록된 정보가 삭제되며 동일한 계정으로 7일간 재가입이
              불가능합니다.
            </S.MenuHelperTxt>
          </div>
        </S.Menu>
      </S.Body>
    </PageStyle.Wrapper>
  );
};

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 21px;
    padding: 0 20px;
    flex-grow: 1;
  `,
  Menu: styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 15px;
    background: #fefefe;

    padding: 13px 15px;
  `,
  MenuWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  NameSection: styled.div`
    display: flex;
    gap: 6px;

    span {
      color: var(--color-main, #009eb2);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px; /* 214.286% */
    }
  `,
  MenuHelperTxt: styled.span`
    ${typo.s10w400}
    color: var(--color-grey-800, #3c4043);
  `,
};
