import styled from "styled-components";
import Button from "../../../../components/Button";
import { GameRoomUser } from "../../GameRoom";

export type DeclareDdangProps = {
  // 뒤로가기가 false 를 반환해서 아니오를 누른 것과 뒤로가기를 누른 것을 구분하기 위해서  'yes' | 'no' 를 씀
  handleModalResult?: (result: "yes" | "no") => void;
  lastPlayers: GameRoomUser[];
};

export const DeclareDdang = ({
  handleModalResult,
  lastPlayers,
}: DeclareDdangProps) => {
  const lastPlayerImgSrc = lastPlayers.map((player) => player.imgSrc);
  const lastPlayerNickName = lastPlayers.map(
    (player) => `${player.nickName}님`
  );

  return (
    <S.Wrapper>
      <S.Body>
        <S.Title>땅 선언하기</S.Title>
        <S.ContentImgSection>
          {lastPlayerImgSrc.map((imgSrc, index) => {
            return (
              <img key={`${index + 1}`} src={imgSrc} alt="user_profile_img" />
            );
          })}
        </S.ContentImgSection>
        <S.ContentTxt>{`${lastPlayerNickName.join(
          ","
        )}은 땅을 선언할 수 있습니다.\n 땅을 선언하시겠습니까?`}</S.ContentTxt>
      </S.Body>
      <S.HorizontalSeperator />
      <S.Footer>
        <S.ModalBtn onClick={() => handleModalResult?.("no")}>
          <span className="confirm__cancel">아니요</span>
        </S.ModalBtn>
        <S.VerticalSeperator />
        <S.ModalBtn onClick={() => handleModalResult?.("yes")}>
          땅선언
        </S.ModalBtn>
      </S.Footer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: white;
    min-width: 280px;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;

    padding-top: 20px;
    padding-bottom: 10px;
  `,
  Title: styled.span`
    color: var(--color-grey-900, #202124);

    /* font-family: Noto Sans KR; */
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 125% */
  `,
  ContentImgSection: styled.div`
    display: flex;
    gap: 4px;
    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }
  `,
  ContentTxt: styled.div`
    text-align: center;
    color: var(--color-grey-700, #5f6368);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 200% */
    max-width: 288px;
    padding: 0px 24px;
    white-space: pre;
  `,
  ModalBtn: styled(Button)`
    padding: 4px 12px;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 171.429% */

    background-color: transparent;
    color: #213991;
    .confirm__cancel {
      color: var(--color-gray-900, #202124);
    }
  `,
  HorizontalSeperator: styled.div`
    height: 1px;
    background-color: var(--color-grey-200, "#E8EAED");
  `,
  VerticalSeperator: styled.div`
    width: 3px;
    height: 100%;
    background-color: var(--color-grey-200, "#E8EAED");
  `,
  Footer: styled.footer`
    display: flex;
    height: 42px;
    justify-content: center;
    align-items: center;
  `,
};
