import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserHistory } from "history";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { decreaseBackToHomePageCount } from "./hooks/usePageRoute";
import EnterGame from "./pages/EnterGame";
import { ErrorPage } from "./pages/ErrorPage";
import GameEnd from "./pages/GameEnd";
import GameProcess from "./pages/GameProcess";
import GameRoom from "./pages/GameRoom";
import HandicapSetup from "./pages/GameRoom/HandicapSetup";
import WaitRoom from "./pages/GameRoom/WaitRoom";
import MakeGame from "./pages/MakeGame";
import MakeGolfCenter from "./pages/MakeGame/MakeGolfCenter";
import { MakeGolfCenterDetail } from "./pages/MakeGame/MakeGolfCenter/MakeGolfCenterDetail";
import { RuleChange } from "./pages/MakeGame/Rule/RuleChange";
import { SelectGolfCenter } from "./pages/MakeGame/SelectGolfCenter/SelectGolfCenter";
import Setup from "./pages/MakeGame/Setup";
import SetupCheck from "./pages/MakeGame/SetupCheck";
import NewUserInfo from "./pages/NewUserInfo";
import Start from "./pages/Start/Start";
import TermsAndConditions from "./pages/TermsAndConditions";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { store } from "./store";
import GlobalStyle from "./styles/global-styles";
import { theme } from "./styles/theme";
import App from "./App";
import { ScoreHistory } from "./pages/ScoreHistory/ScoreHistory";
import { ScoreHistoryDetail } from "./pages/ScoreHistory/ScoreHistoryDetail";
import Setting from "./pages/Setting";
import ManageAccount from "./pages/ManageAccount";

// TODO : 현재 도메인이 /pwa-react-test라 반드시 붙여야하는지? 확인 필요
const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <Start />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms_and_conditions",
    element: <TermsAndConditions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new_user_info",
    element: <NewUserInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/score_history",
    element: <ScoreHistory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/score_history/:gameId",
    element: <ScoreHistoryDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting",
    element: <Setting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting/account",
    element: <ManageAccount />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/enter_game",
    element: <EnterGame />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/process_game/:gameId",
    element: <GameProcess />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game_room/:gameId",
    element: <GameRoom />,
    children: [
      {
        path: "",
        element: <WaitRoom />,
      },
      {
        path: "handicap_setup",
        element: <HandicapSetup />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/make_game",
    element: <MakeGame />,
    children: [
      {
        path: "",
        element: <Setup />,
      },
      {
        path: "setup_check",
        element: <SetupCheck />,
      },
      {
        path: "select_golf_center",
        element: <SelectGolfCenter />,
      },
      {
        path: "make_golf_center",
        element: <MakeGolfCenter />,
      },
      {
        path: "make_golf_center_detail",
        element: <MakeGolfCenterDetail />,
      },
      {
        path: "rule_change",
        element: <RuleChange />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/game_end",
    element: <GameEnd />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // window focus 설정
    },
  },
});

export const history = createBrowserHistory();

history.listen((listener) => {
  if (listener.action === "POP") {
    decreaseBackToHomePageCount();
  }
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
