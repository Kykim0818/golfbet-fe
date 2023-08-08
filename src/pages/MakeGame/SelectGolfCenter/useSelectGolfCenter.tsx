import { useEffect, useRef, useState } from "react";
import { apiGetAllGolfCenter } from "../../../service/api/golfCenter";
import { deepClone } from "../../../utils/deepClone";
import { testAsync } from "../../../utils/test-promise";
import { GameInfo } from "../MakeGame";
import { CenterList } from "./CenterList";
import { GolfCenterList } from "./SelectGolfCenter";

const NO_SELECT_GOLF_CENTER_NAME = "";

export const useSelectGolfCenter = (golfCenter: GameInfo["golfCenter"]) => {
  const [golfCenterList, setGolfCenterList] = useState<GolfCenterList>([]);
  const [btnDisable, setBtnDisable] = useState(false);
  const currentSelectCenter = useRef(deepClone(golfCenter));

  const uiTabItems = golfCenterList.map((golfCenter) => {
    return {
      id: golfCenter.group,
      label: golfCenter.group,
      children: <CenterList centers={golfCenter.centers} />,
    };
  });

  // fetch
  useEffect(() => {
    //
    testAsync(
      apiGetAllGolfCenter().then((res) => {
        console.log(res.result);
        setGolfCenterList(res.result);
      }),
      200
    );
  }, []);

  // ui
  useEffect(() => {
    if (currentSelectCenter.current.name !== NO_SELECT_GOLF_CENTER_NAME) {
      setBtnDisable(true);
    }
  }, [currentSelectCenter.current.name]);

  return {
    uiTabItems,
    currentSelectCenter,
    btnDisable,
  };
};
