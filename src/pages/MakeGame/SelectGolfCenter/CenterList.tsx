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
    const targetCenter = findCenter(centerId, centers);
    // 누르는 순간 default course로 세팅 되어야함
    if (targetCenter && targetCenter.courses.length > 0) {
      onChange({
        id: targetCenter.id,
        name: targetCenter.name,
        region: targetCenter.region,
        frontNineCourse: {
          id: targetCenter.courses[FIRST_COURSE_IDX].id,
          name: targetCenter.courses[FIRST_COURSE_IDX].name,
          pars: targetCenter.courses[FIRST_COURSE_IDX].pars,
        },
        backNineCourse: {
          id: targetCenter.courses[SECOND_COURSE_IDX].id,
          name: targetCenter.courses[SECOND_COURSE_IDX].name,
          pars: targetCenter.courses[SECOND_COURSE_IDX].pars,
        },
      });
      setCenterId(centerId);
    } else {
      alert("선택한 골프장의 코스가 없습니다.");
    }
  };

  const handleChangeCourse = (value: {
    frontCourseId: number;
    backCourseId: number;
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
        id: selectCenterInfo.id,
        name: selectCenterInfo.name,
        region: selectCenterInfo.region,
        frontNineCourse: {
          id: frontCourseInfo.id,
          name: frontCourseInfo.name,
          pars: frontCourseInfo.pars,
        },
        backNineCourse: {
          id: backCourseInfo.id,
          name: backCourseInfo.name,
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
              <Radio value={center.id}>
                <Styled.RadioItemWrapper>
                  <span className="centerlist__centername__radioitem">
                    {center.name}
                  </span>
                  {
                    <span className="centerlist__holecount__radioitem">{`(${
                      center.holeCount ?? "미입력"
                    } 홀)`}</span>
                  }
                </Styled.RadioItemWrapper>
              </Radio>
              {/* TODO: // 직접 추가한건 표시예정 */}
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
  RadioItemWrapper: styled.div`
    margin-left: 10px;
    .centerlist__centername__radioitem {
      // typo
      color: #3b3c40;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .centerlist__holecount__radioitem {
      margin-left: 5px;
      // typo
      color: #afafaf;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
};

function findCenter(centerId: string, centers: CenterInfo[]) {
  return centers.find((center) => center.id === centerId);
}

function findCourse(courseId: number, courses: CourseInfo[]) {
  return courses.find((course) => course.id === courseId);
}
