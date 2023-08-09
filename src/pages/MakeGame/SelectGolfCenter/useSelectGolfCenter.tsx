import { useRef, useState } from "react";
import { deepClone } from "../../../utils/deepClone";
import { GameInfo } from "../MakeGame";
import { CenterList } from "./CenterList";
import { GolfCenterList } from "./SelectGolfCenter";

const NO_SELECT_GOLF_CENTER_NAME = "";

export const useSelectGolfCenter = (
  golfCenter: GameInfo["golfCenter"],
  golfCenterList: GolfCenterList
) => {
  const [btnDisable, setBtnDisable] = useState(true);
  const currentSelectCenter = useRef(deepClone(golfCenter));

  const handleOnChange = (centerInfo: GameInfo["golfCenter"]) => {
    currentSelectCenter.current = centerInfo;
    if (currentSelectCenter.current.name !== NO_SELECT_GOLF_CENTER_NAME) {
      setBtnDisable(false);
    }
  };

  const uiTabItems = golfCenterList.map((golfCenter) => {
    return {
      id: golfCenter.group,
      label: golfCenter.group,
      children: (
        <CenterList centers={golfCenter.centers} onChange={handleOnChange} />
      ),
    };
  });

  return {
    uiTabItems,
    currentSelectCenter,
    btnDisable,
  };
};
