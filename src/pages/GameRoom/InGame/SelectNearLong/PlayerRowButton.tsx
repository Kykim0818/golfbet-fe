import styled, { css } from "styled-components";
import GameAbandonMark from "../../../../components/domain/GameAbandonMark";
import { typo } from "../../../../styles/typo";

type PlayerRowButtonProps = {
  isGameQuit: boolean;
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
  isGameQuit,
}: PlayerRowButtonProps) => {
  return (
    <S.Wrapper
      disabled={isGameQuit}
      onClick={handleOnClick}
      selected={selected}
    >
      <S.Profile src={imgSrc} />
      <S.NameSection>
        <S.NickName isGameQuit={isGameQuit}>{nickName}</S.NickName>
        {isGameQuit && <GameAbandonMark />}
      </S.NameSection>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.button<{ selected: boolean }>`
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
  NameSection: styled.div`
    display: flex;
    gap: 9px;
  `,
  //
  NickName: styled.span<{ isGameQuit: boolean }>`
    display: flex;
    flex-grow: 1;
    margin-left: 17px;
    ${typo.s14w700}
    ${(props) =>
      props.isGameQuit &&
      css`
        color: var(--color-gray-300, #dadce0);
      `}
  `,
};
