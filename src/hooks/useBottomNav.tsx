import {
  IconHome,
  IconMore,
  IconRanking,
} from "../components/@common/atoms/icons";
import { usePageRoute } from "./usePageRoute";

export const useBottomNav = () => {
  const { movePage, goHome } = usePageRoute();
  const bottomNavList = [
    {
      id: "score_history",
      icon: <IconRanking />,
      onClick: () => movePage("/score_history"),
    },
    {
      id: "home",
      icon: <IconHome />,
      onClick: () => goHome(),
    },
    {
      id: "setting",
      icon: <IconMore />,
      onClick: () => movePage("/setting"),
    },
  ];

  return {
    bottomNavList,
  };
};
