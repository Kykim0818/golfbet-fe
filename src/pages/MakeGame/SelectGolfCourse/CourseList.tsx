import { useState } from "react";
import { RadioGroup } from "../../../components/Radio/RadioGroup";
import Radio from "../../../components/Radio";
import styled from "styled-components";
import { CoursePicker } from "./CoursePIcker";

type Props = {
  items: CourseInfo[];
};
export type CourseInfo = {
  id: string;
  name: string;
  holeCount: number;
  region: string;
  frontNineCourses: string[];
  backNineCourses: string[];
};

export const CourseList = ({ items }: Props) => {
  const [courseId, setCourseId] = useState<CourseInfo["id"]>("");
  const selectCourseInfo = findCourse(courseId, items);

  const handleClickCourse = (courseId: string) => {
    setCourseId(courseId);
  };

  return (
    <RadioGroup value={courseId} onChange={handleClickCourse}>
      {items.map((item) => {
        return (
          <div>
            <Styled.Item key={item.id}>
              <Radio
                value={item.id}
              >{`${item.name}(${item.holeCount}홀)`}</Radio>
              <span>{item.region}</span>
            </Styled.Item>
            {selectCourseInfo?.name === item.name ? (
              <CoursePicker
                frontNineCourses={selectCourseInfo.frontNineCourses}
                backNineCourses={selectCourseInfo.backNineCourses}
                onChange={(value) => console.log(value)}
              />
            ) : null}
          </div>
        );
      })}
    </RadioGroup>
  );
};

const Styled = {
  Item: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};

function findCourse(courseId: string, courseList: CourseInfo[]) {
  return courseList.find((course) => course.id === courseId);
}
