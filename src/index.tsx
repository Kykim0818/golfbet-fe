import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import EnterGame from "./pages/EnterGame";
import { ErrorPage } from "./pages/ErrorPage";
import MakeGame from "./pages/MakeGame";
import { SelectGolfCourse } from "./pages/MakeGame/SelectGolfCourse/SelectGolfCourse";
import Setup from "./pages/MakeGame/Setup";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import GlobalStyle from "./styles/global-styles";
import { theme } from "./styles/theme";
import { RuleChange } from "./pages/MakeGame/Rule/RuleChange";

// TODO : 현재 도메인이 /pwa-react-test라 반드시 붙여야하는지? 확인 필요
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/enter_game",
    element: <EnterGame />,
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
        path: "select_golf_course",
        element: <SelectGolfCourse />,
      },
      {
        path: "rule_change",
        element: <RuleChange />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
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
