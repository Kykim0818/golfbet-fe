import styled from "styled-components";
import { GameInfo } from "./MakeGame";

type Props = {
  centerType: GameInfo["gameType"];
  name: string;
  frontNineCourseName: string;
  backNineCourseName: string;
};

export const FixedGolfCenter = ({
  centerType: courseType,
  name,
  frontNineCourseName,
  backNineCourseName,
}: Props) => {
  return (
    <Styled.Wrapper>
      {/* 필드 타입, 이름 */}
      <Styled.CenterName>
        <span>{courseType}</span>
        <span>{name}</span>
      </Styled.CenterName>
      <Styled.NineCourseNameWrapper>
        {/* 전반 이름 */}
        <Styled.NineCourseName>
          <span>전반</span>
          <span>{frontNineCourseName}</span>
        </Styled.NineCourseName>
        {/* 후반 이름 */}
        <Styled.NineCourseName>
          <span>전반</span>
          <span>{backNineCourseName}</span>
        </Styled.NineCourseName>
      </Styled.NineCourseNameWrapper>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CenterName: styled.div`
    display: flex;
  `,

  NineCourseNameWrapper: styled.div`
    display: flex;
  `,
  NineCourseName: styled.div`
    display: flex;
  `,
};
