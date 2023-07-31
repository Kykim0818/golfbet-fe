import styled from "styled-components";
import { GameInfo } from "./MakeGame";

type Props = {
  courseType: GameInfo["gameType"];
  name: string;
  frontNineCourseName: string;
  backNineCourseName: string;
};

export const FixedGolfCourse = ({
  courseType,
  name,
  frontNineCourseName,
  backNineCourseName,
}: Props) => {
  return (
    <Styled.Wrapper>
      {/* 필드 타입, 이름 */}
      <Styled.CourseName>
        <span>{courseType}</span>
        <span>{name}</span>
      </Styled.CourseName>
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
  CourseName: styled.div`
    display: flex;
  `,

  NineCourseNameWrapper: styled.div`
    display: flex;
  `,
  NineCourseName: styled.div`
    display: flex;
  `,
};
