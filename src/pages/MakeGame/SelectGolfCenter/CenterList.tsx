import { useState } from "react";
import styled from "styled-components";
import Radio from "../../../components/Radio";
import { RadioGroup } from "../../../components/Radio/RadioGroup";
import { GameInfo } from "../MakeGame";
import { CoursePicker } from "./CoursePIcker";
import { CenterInfo, CourseInfo } from "./SelectGolfCenter";

type Props = {
  centers: CenterInfo[];
  onChange: (centerInfo: GameInfo["golfCenter"]) => void;
};

const FIRST_COURSE_IDX = 0;
const SECOND_COURSE_IDX = 1;

export const CenterList = ({ centers, onChange }: Props) => {
  const [centerId, setCenterId] = useState<CenterInfo["id"]>("");
  const selectCenterInfo = findCenter(centerId, centers);

  const handleClickCenter = (centerId: string) => {
    setCenterId(centerId);
    const targetCenter = findCenter(centerId, centers);
    // 누르는 순간 default course로 세팅 되어야함
    if (targetCenter) {
      onChange({
        name: targetCenter.name,
        region: targetCenter.region2,
        frontNineCourse: {
          name:
            targetCenter.courses[FIRST_COURSE_IDX].name +
            " " +
            targetCenter.courses[FIRST_COURSE_IDX].nameDetail,
          pars: targetCenter.courses[FIRST_COURSE_IDX].pars,
        },
        backNineCourse: {
          name:
            targetCenter.courses[SECOND_COURSE_IDX].name +
            " " +
            targetCenter.courses[SECOND_COURSE_IDX].nameDetail,
          pars: targetCenter.courses[SECOND_COURSE_IDX].pars,
        },
      });
    }
  };

  const handleChangeCourse = (value: {
    frontCourseId: string;
    backCourseId: string;
  }) => {
    if (selectCenterInfo) {
      const frontCourseInfo = findCourse(
        value.frontCourseId,
        selectCenterInfo.courses
      );
      const backCourseInfo = findCourse(
        value.backCourseId,
        selectCenterInfo.courses
      );

      if (frontCourseInfo === undefined || backCourseInfo === undefined) {
        console.log(
          `courseInfo cannot found \n frontCourseInfo : ${frontCourseInfo} \n backCourseInfo : ${backCourseInfo}`
        );
        return;
      }

      onChange({
        name: selectCenterInfo.name,
        region: selectCenterInfo.region2,
        frontNineCourse: {
          name: frontCourseInfo.name + " " + frontCourseInfo.nameDetail,
          pars: frontCourseInfo.pars,
        },
        backNineCourse: {
          name: backCourseInfo.name + " " + backCourseInfo.nameDetail,
          pars: backCourseInfo.pars,
        },
      });
    }
  };

  return (
    <RadioGroup value={centerId} onChange={handleClickCenter}>
      {centers.map((center) => {
        return (
          <div key={center.id}>
            <Styled.Item>
              <Radio
                value={center.id}
              >{`${center.name}(${center.holeCount}홀)`}</Radio>
              <span>{center.region2}</span>
            </Styled.Item>
            {selectCenterInfo?.name === center.name ? (
              <CoursePicker
                courses={selectCenterInfo.courses}
                onChange={(value) =>
                  handleChangeCourse({
                    frontCourseId: value.selectFrontCourseId,
                    backCourseId: value.selectBackCourseId,
                  })
                }
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

function findCenter(centerId: string, centers: CenterInfo[]) {
  return centers.find((center) => center.id === centerId);
}

function findCourse(courseId: string, courses: CourseInfo[]) {
  return courses.find((course) => course.id === courseId);
}
