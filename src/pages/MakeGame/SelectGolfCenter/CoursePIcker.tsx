import { useRef } from "react";
import styled from "styled-components";
import ToggleGroup from "../../../components/ToggleGroup";
import { CourseInfo } from "./SelectGolfCenter";

type Props = {
  courses: CourseInfo[];
  onChange: (value: {
    selectFrontCourseId: number;
    selectBackCourseId: number;
  }) => void;
};

const FIRST_COURSE_IDX = 0;
const SECOND_COURSE_IDX = 1;

export const CoursePicker = ({ courses, onChange }: Props) => {
  const currentFrontNineCourse = useRef(courses?.[FIRST_COURSE_IDX]);
  const currentBackNineCourse = useRef(courses?.[SECOND_COURSE_IDX]);
  const courseGroups = makeToggleGroups(courses);

  const handleChangeToggle = (
    courseType: "front" | "back",
    toggleValue: string[]
  ) => {
    if (courseType === "front") {
      onChange({
        selectFrontCourseId: parseInt(toggleValue[0]),
        selectBackCourseId: currentBackNineCourse.current.id,
      });
      return;
    }

    if (courseType === "back") {
      onChange({
        selectFrontCourseId: currentFrontNineCourse.current.id,
        selectBackCourseId: parseInt(toggleValue[0]),
      });
      return;
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.CourseWrapper>
        <span>전반 코스</span>
        <div>
          {currentFrontNineCourse.current ? (
            <ToggleGroup
              selectedValues={[`${currentFrontNineCourse.current.id}`]}
              group={courseGroups}
              onChange={(value) => handleChangeToggle("front", value)}
            />
          ) : (
            <div>선택 가능한 코스가 없습니다.</div>
          )}
        </div>
      </Styled.CourseWrapper>
      {/* /////  */}
      <Styled.CourseWrapper>
        <span>후반 코스</span>
        <div>
          <ToggleGroup
            selectedValues={[`${currentBackNineCourse.current.id}`]}
            group={courseGroups}
            onChange={(value) => handleChangeToggle("back", value)}
          />
        </div>
      </Styled.CourseWrapper>
    </Styled.Wrapper>
  );
};

const makeToggleGroups = (courses: CourseInfo[]) => {
  return courses.map((course) => {
    return {
      label: course.name,
      value: `${course.id}`,
    };
  });
};

const Styled = {
  Wrapper: styled.div`
    margin-top: 30px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  CourseWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 17px;
  `,
};
