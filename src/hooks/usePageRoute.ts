import { useCallback } from "react";
import { NavigateOptions, useNavigate } from "react-router";

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
  const moveBack = useCallback(() => {
    // 자동으로 index.tsx 에서 decrease 해줌
    navigate(-1);
  }, [navigate]);

  const goHome = () => {
    const backToHomePageCount = getBackToHomePageCount();
    if (backToHomePageCount <= 0) {
      const currentUrlArr = window.location.href.split("/");
      if (currentUrlArr[currentUrlArr.length - 1] !== "") {
        navigate("/", { replace: true });
      }
      return;
    }
    navigate(-1 * backToHomePageCount);
    initBackToHomePageCount();
  };

  // TODO: 페이지 이동전, 앱 초기 홈을 깔기 위한 방식, 추가 조치가 필요함
  const movePageWithHome = (to: string, options?: NavigateOptions) => {
    setTimeout(() => {
      movePage(to, options);
    }, 100);
    goHome();
  };

  return {
    preventBack,
    movePage,
    moveBack,
    goHome,
    movePageWithHome,
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
