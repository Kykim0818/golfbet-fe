import { useRef } from "react";
import ToggleGroup from "../../../components/ToggleGroup";
import { CourseInfo } from "./SelectGolfCenter";

type Props = {
  courses: CourseInfo[];
  onChange: (value: {
    selectFrontCourseId: string;
    selectBackCourseId: string;
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
        selectFrontCourseId: toggleValue[0],
        selectBackCourseId: currentBackNineCourse.current.id,
      });
      return;
    }

    if (courseType === "back") {
      onChange({
        selectFrontCourseId: currentFrontNineCourse.current.id,
        selectBackCourseId: toggleValue[0],
      });
      return;
    }
  };

  return (
    <div>
      <div>
        <p>전반 코스</p>
        <div>
          {currentFrontNineCourse.current ? (
            <ToggleGroup
              selectedValues={[currentFrontNineCourse.current.id]}
              group={courseGroups}
              onChange={(value) => handleChangeToggle("front", value)}
            />
          ) : (
            <div>선택 가능한 코스가 없습니다.</div>
          )}
        </div>
      </div>
      {/* /////  */}
      <div>
        <p>후반 코스</p>
        <div>
          <ToggleGroup
            selectedValues={[currentBackNineCourse.current.id]}
            group={courseGroups}
            onChange={(value) => handleChangeToggle("back", value)}
          />
        </div>
      </div>
    </div>
  );
};

const makeToggleGroups = (courses: CourseInfo[]) => {
  return courses.map((course) => {
    return {
      label: course.name + " " + course.nameDetail,
      value: course.id,
    };
  });
};
