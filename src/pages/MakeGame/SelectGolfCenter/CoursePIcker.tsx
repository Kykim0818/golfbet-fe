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
  const currentFrontNineCourseId = useRef(courses?.[FIRST_COURSE_IDX].id);
  const currentBackNineCourseId = useRef(courses?.[SECOND_COURSE_IDX].id);
  const courseGroups = makeToggleGroups(courses);

  const handleChangeToggle = (
    courseType: "front" | "back",
    toggleValue: string[]
  ) => {
    if (courseType === "front") {
      currentFrontNineCourseId.current = parseInt(toggleValue[0]);
      onChange({
        selectFrontCourseId: parseInt(toggleValue[0]),
        selectBackCourseId: currentBackNineCourseId.current,
      });
      return;
    }

    if (courseType === "back") {
      currentBackNineCourseId.current = parseInt(toggleValue[0]);
      onChange({
        selectFrontCourseId: currentFrontNineCourseId.current,
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
          {currentFrontNineCourseId.current ? (
            <ToggleGroup
              selectedValues={[`${currentFrontNineCourseId.current}`]}
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
            selectedValues={[`${currentBackNineCourseId.current}`]}
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
