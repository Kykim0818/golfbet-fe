import styled from "styled-components";
import { GameInfo } from "./MakeGame";

type Props = {
  centerType: GameInfo["gameType"];
  name: string;
  frontNineCourseName: string;
  backNineCourseName: string;
};

export const FixedGolfCenter = ({
  centerType,
  name,
  frontNineCourseName,
  backNineCourseName,
}: Props) => {
  return (
    <Styled.Wrapper>
      {/* 필드 타입, 이름 */}
      <Styled.CenterNameSection>
        <Styled.CenterType>
          {getDisplayCenterTypeText(centerType)}
        </Styled.CenterType>
        <Styled.CenterName>{name}</Styled.CenterName>
      </Styled.CenterNameSection>
      <Styled.NineCourseNameSection>
        {/* 전반 이름 */}
        <Styled.NineCourseNameWrapper>
          <Styled.NineCourseLabel>전반</Styled.NineCourseLabel>
          <Styled.NineCourseName>{frontNineCourseName}</Styled.NineCourseName>
        </Styled.NineCourseNameWrapper>
        {/* 후반 이름 */}
        <Styled.NineCourseNameWrapper>
          <Styled.NineCourseLabel>후반</Styled.NineCourseLabel>
          <Styled.NineCourseName>{backNineCourseName}</Styled.NineCourseName>
        </Styled.NineCourseNameWrapper>
      </Styled.NineCourseNameSection>
    </Styled.Wrapper>
  );
};

const getDisplayCenterTypeText = (gameType: GameInfo["gameType"]) => {
  if (gameType === "field") {
    return "필드";
  }
  return "스크린";
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 17px;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
  `,
  //
  CenterNameSection: styled.div`
    display: flex;
    gap: 10px;
  `,
  CenterName: styled.span`
    display: flex;
    align-items: center;
    // typo
    color: #504f4f;
    font-size: 16px;
    font-weight: 700;
  `,
  CenterType: styled.span`
    border-radius: 10px;
    background: #e6f7f9;
    padding: 5px 12px;
    // typo
    color: var(--color-main-dark, #008395);
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  `,

  //
  NineCourseNameSection: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
  `,
  NineCourseNameWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    border-radius: 10px;
    gap: 25px;
    min-width: 144px;
    min-height: 40px;
    // todo: color
    background: #f8fafb;
  `,
  NineCourseLabel: styled.span`
    border-radius: 18px;

    // todo : color
    background-color: #3181ae;
    padding: 5px 7px;

    // typo
    color: #fff;
    font-size: 10px;
    font-weight: 400;
    line-height: normal;
  `,
  NineCourseName: styled.span`
    // todo : typo
    color: #484848;
    font-size: 12px;
    font-weight: 700;
    line-height: normal;
  `,
};
