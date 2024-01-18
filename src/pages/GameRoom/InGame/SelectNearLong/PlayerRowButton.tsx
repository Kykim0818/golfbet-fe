import styled from "styled-components";
import { typo } from "../../../../styles/typo";

type PlayerRowButtonProps = {
  selected: boolean;
  imgSrc: string;
  nickName: string;
  handleOnClick: () => void;
};

export const PlayerRowButton = ({
  imgSrc,
  nickName,
  handleOnClick,
}: PlayerRowButtonProps) => {
  return (
    <S.Wrapper onClick={handleOnClick}>
      <S.Profile src={imgSrc} />
      <S.NickName>{nickName}</S.NickName>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    border-radius: 15px;
    background-color: #fff;
    padding: 8px 15px;
  `,
  //
  Profile: styled.img`
    width: 54px;
    height: 54px;
    border-radius: 50%;
  `,
  //
  NickName: styled.span`
    display: flex;
    flex-grow: 1;
    margin-left: 17px;
    ${typo.s14w700}
  `,
};
