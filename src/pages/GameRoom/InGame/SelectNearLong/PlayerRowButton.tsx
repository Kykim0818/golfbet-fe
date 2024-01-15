import styled from "styled-components";

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
  `,
  //
  Profile: styled.img``,
  //
  NickName: styled.span``,
};
