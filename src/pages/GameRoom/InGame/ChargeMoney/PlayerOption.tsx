import styled from "styled-components";
import ToggleGroup from "../../../../components/ToggleGroup";
import { typo } from "../../../../styles/typo";

type PlayerOptionProps = {
  imgSrc: string;
  nickName: string;
  value: "charge" | "surrender";
  onChange: (value: string) => void;
};

const options = [
  { label: "충전하기", value: "charge" },
  { label: "그만하기", value: "surrender" },
];

export const PlayerOption = ({
  imgSrc,
  nickName,
  value,
  onChange,
}: PlayerOptionProps) => {
  return (
    <S.Wrapper>
      <S.UserInfoSection>
        <S.Profile src={imgSrc} alt="avatar" />
        <S.NickName>{nickName}</S.NickName>
      </S.UserInfoSection>
      <ToggleGroup
        group={options}
        selectedValues={[value]}
        onChange={(value) => onChange(value[0])}
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  Profile: styled.img`
    width: 35px;
    height: 35px;
    min-width: 35px;
    min-height: 35px;
    border-radius: 50%;
  `,
  NickName: styled.span`
    ${typo.s14w700}
  `,
  UserInfoSection: styled.section`
    display: flex;
    gap: 14px;

    align-items: center;
  `,
};
