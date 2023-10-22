import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import BottomSheetModal from "../../components/BottomSheetModal";
import Button from "../../components/Button";
import { useModal } from "../../hooks/useModal";
import { usePageRoute } from "../../hooks/usePageRoute";
import {
  BasicUserInfo,
  apiLogout,
  getUser,
  requestLogout,
} from "../../service/api/user";
import { HomeImageButton } from "./HomeImageButton";
import axios from "axios";

export const Home = (props: { handleLogout: () => void }) => {
  const { open, openModal, closeModalByUI, closeModal } = useModal();
  const { movePage } = usePageRoute();
  /**
   * TODO
   * - 진입과 동시에 로그인된 유저의 정보를 가져온다. feat axios
   * - 가져와서 해당정보로 화면에 그려주기
   */
  const { isLoading, error, data } = useQuery(["userInfo"], () => getUser());
  const handleLogout = async () => {
    await apiLogout();
    axios.defaults.headers.common["Authorization"] = undefined;
    movePage("/", { replace: true });
    // if (ret) {
    //   props.handleLogout();
    // } else {
    //   alert("logout error retry it");
    // }
  };

  if (isLoading || data === undefined) return <div>Loading ....</div>;
  if (error) return <div>error</div>;
  return (
    <Styled.Wrapper>
      <Styled.Top>GOLF BET</Styled.Top>
      <UserInfoSection user={data.userInfo} />
      <Styled.S3>
        <HomeImageButton
          label="게임 생성하기"
          imgSrc={process.env.PUBLIC_URL + "/assets/images/make_game_img.png"}
          onClick={() => {
            movePage("/make_game");
          }}
        />
        <HomeImageButton
          label="게임 참여하기"
          imgSrc={process.env.PUBLIC_URL + "/assets/images/enter_game_img.png"}
          onClick={() => movePage("/enter_game")}
        />
      </Styled.S3>
      {/* </Suspense> */}
      <Styled.Footer>
        <Styled.FooterC1 onClick={handleLogout}>Logout</Styled.FooterC1>
        <Styled.FooterB>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_score.svg"}
            alt="no icons"
          />
        </Styled.FooterB>
        <Styled.FooterB onClick={openModal}>
          <img
            src={process.env.PUBLIC_URL + "/assets/svg/bottom_bar_menu.svg"}
            alt="no icons"
          />
        </Styled.FooterB>
      </Styled.Footer>
      {open && (
        <BottomSheetModal closeModalByUI={closeModalByUI}>
          <div>Hello World</div>
          <Button onClick={closeModal}>닫기</Button>
        </BottomSheetModal>
      )}
    </Styled.Wrapper>
  );
};

const UserInfoSection = ({ user }: { user: BasicUserInfo }) => {
  return (
    <React.Fragment>
      <Styled.S1>
        <img src={user.profileImgSrc} alt="no images" />
        <Styled.UserName>{user.nickname}님</Styled.UserName>
      </Styled.S1>
      <Styled.S2>
        <Styled.S2Info1>
          <Styled.S2Info1Text>필드</Styled.S2Info1Text>
          {user.fieldScore === 0 ? (
            <Styled.S2InfoZeroCount />
          ) : (
            <Styled.S2InfoNumberSection>
              <Styled.S2InfoNumber>{user.fieldScore}</Styled.S2InfoNumber>
              <Styled.S2InfoTotalMoenyChange>
                {user.fieldTotalMoneyChange}원
              </Styled.S2InfoTotalMoenyChange>
            </Styled.S2InfoNumberSection>
          )}
        </Styled.S2Info1>
        <Styled.S2Line />
        <Styled.S2Info1>
          <Styled.S2Info1Text>스크린</Styled.S2Info1Text>
          {user.screenScore === 0 ? (
            <Styled.S2InfoZeroCount />
          ) : (
            <Styled.S2InfoNumberSection>
              <Styled.S2InfoNumber>{user.screenScore}</Styled.S2InfoNumber>
              <Styled.S2InfoTotalMoenyChange>
                {user.screenTotalMoneyChange}원
              </Styled.S2InfoTotalMoenyChange>
            </Styled.S2InfoNumberSection>
          )}
        </Styled.S2Info1>
      </Styled.S2>
    </React.Fragment>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    // color ?
    background-color: var(--color-bg, #f6f8fc);
    padding: 0px 30px;
  `,
  Top: styled.div`
    display: flex;
    width: 100%;
    margin-top: 8px;
    justify-content: flex-start;
    // TODO: typo 대체
    font-size: 25px;
    font-weight: 700;
    line-height: 34.05px;
    color: var(--color-main-dark, #006977);
  `,
  // image,  name
  S1: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 62px;
    margin-bottom: 31px;

    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
    }
  `,

  UserName: styled.div`
    display: flex;
    //
    font-weight: 500;
    font-size: 17px;
    line-height: 25px;
    color: var(--color-main-darker);
  `,

  C1: styled.div`
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background-color: #ffc0c0;
  `,
  // 필드 , 스크린
  S2: styled.div`
    display: flex;
    width: 100%;
    height: 93px;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    margin-left: 30px;
    margin-right: 30px;
  `,
  S2Line: styled.div`
    border: 1px solid var(--color-bg, #f6f8fc);
    height: 81px;
    margin-left: 60px;
    margin-right: 60px;
  `,
  // 필드, 스크린 글자 및 점수 영역
  S2Info1: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  S2Info1Text: styled.div`
    text-align: center;
    min-width: 45px;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    // color?
    color: #464646;
    margin-bottom: 1px;
  `,
  S2InfoZeroCount: styled.div`
    background-color: var(--color-main);
    width: 17px;
    height: 3px;
    margin-bottom: 16.5px;
    margin-top: 16.5px;
  `,
  S2InfoNumberSection: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  S2InfoNumber: styled.div`
    display: flex;
    justify-content: center;
    color: var(--color-main);
    height: 36px;
    font-weight: 700;
    font-size: 25px;
    line-height: 36px;
  `,
  S2InfoTotalMoenyChange: styled.span`
    color: var(--color-main-darker);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  S3: styled.div`
    display: flex;
    gap: 20px;
    margin-top: 19px;
  `,
  S3Btn: styled.div`
    width: 155px;
    height: 233px;
    border-radius: 15px;
    background-color: #ffe4c7;
  `,

  Footer: styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    height: 73px;

    position: fixed;
    bottom: 0;

    background-color: #f5f9fa;
    border-radius: 46px 46px 0px 0px;
  `,
  FooterC1: styled.div`
    position: absolute;

    left: calc(50% - 38px);
    top: -38px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: #1dbd93;
  `,
  FooterB: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  `,
};
