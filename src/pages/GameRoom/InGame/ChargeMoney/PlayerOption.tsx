import styled from "styled-components";

type PlayerOptionProps = {
  imgSrc: string;
  nickName: string;
};

export const PlayerOption = ({ imgSrc, nickName }: PlayerOptionProps) => {
  return <S.Wrapper></S.Wrapper>;
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  UserInfoSection: styled.section`
    display: flex;
    gap: 14px;
  `,
};
