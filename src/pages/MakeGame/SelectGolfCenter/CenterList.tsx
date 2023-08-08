import { useState } from "react";
import styled from "styled-components";
import Radio from "../../../components/Radio";
import { RadioGroup } from "../../../components/Radio/RadioGroup";
import { CoursePicker } from "./CoursePIcker";
import { CenterInfo } from "./SelectGolfCenter";

type Props = {
  centers: CenterInfo[];
};

export const CenterList = ({ centers }: Props) => {
  const [centerId, setCenterId] = useState<CenterInfo["id"]>("");
  const selectCenterInfo = findCenter(centerId, centers);

  const handleClickCenter = (centerId: string) => {
    setCenterId(centerId);
  };

  return (
    <RadioGroup value={centerId} onChange={handleClickCenter}>
      {centers.map((center) => {
        return (
          <div>
            <Styled.Item key={center.id}>
              <Radio
                value={center.id}
              >{`${center.name}(${center.holeCount}홀)`}</Radio>
              <span>{center.region2}</span>
            </Styled.Item>
            {selectCenterInfo?.name === center.name ? (
              <CoursePicker
                courses={selectCenterInfo.courses}
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

function findCenter(centerId: string, centers: CenterInfo[]) {
  return centers.find((center) => center.id === centerId);
}
