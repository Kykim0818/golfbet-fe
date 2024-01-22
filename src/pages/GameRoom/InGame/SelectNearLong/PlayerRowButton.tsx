import styled, { css } from "styled-components";
import { typo } from "../../../../styles/typo";

type PlayerRowButtonProps = {
  selected: boolean;
  imgSrc: string;
  nickName: string;
  handleOnClick: () => void;
};

export const PlayerRowButton = ({
  selected,
  imgSrc,
  nickName,
  handleOnClick,
}: PlayerRowButtonProps) => {
  return (
    <S.Wrapper onClick={handleOnClick} selected={selected}>
      <S.Profile src={imgSrc} />
      <S.NickName>{nickName}</S.NickName>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;

    box-sizing: border-box;
    padding: 8px 15px;
    border: 1px solid #fff;
    ${(props) =>
      props.selected &&
      css`
        background-color: #e1f4ff;
        border-color: var(--color-sub-blue, #3181ae);
      `}
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
