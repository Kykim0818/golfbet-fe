import { NavigateOptions, useNavigate } from "react-router";
import { history } from "..";

export const usePageRoute = () => {
  const navigate = useNavigate();
  // 빈페이지를 추가해서, 뒤로가기시에 반응없게 하는 함수
  const preventBack = () => {
    increaseBackToHomePageCount();
    window.history.pushState(null, "", window.location.href);
  };

  const movePage = (to: string, options?: NavigateOptions) => {
    if (options?.replace === undefined || options?.replace === false) {
      increaseBackToHomePageCount();
    }
    navigate(to, options);
  };
  const moveBack = () => {
    // 자동으로 index.tsx 에서 decrease 해줌
    history.back();
  };

  const goHome = () => {
    history.go(-1 * getBackToHomePageCount());
    initBackToHomePageCount();
  };

  return {
    preventBack,
    movePage,
    moveBack,
    goHome,
  };
};

const HOME_KEY = "backToHomePageCount";
function getBackToHomePageCount() {
  const ret = localStorage.getItem(HOME_KEY);
  if (ret === null) {
    throw Error("page stack is confused.please reboot app");
  }
  return Number(localStorage.getItem(HOME_KEY)!);
}

function initBackToHomePageCount() {
  localStorage.setItem(HOME_KEY, "0");
}

export function increaseBackToHomePageCount() {
  localStorage.setItem(HOME_KEY, `${getBackToHomePageCount() + 1}`);
}

export function decreaseBackToHomePageCount() {
  console.log("decrease");
  localStorage.setItem(
    HOME_KEY,
    `${getBackToHomePageCount() - 1 <= 0 ? 0 : getBackToHomePageCount() - 1} `
  );
}
