import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ErrorPage } from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import GlobalStyle from "./styles/global-styles";
import { theme } from "./styles/theme";
import EnterGame from "./pages/EnterGame";
import { loginLoader } from "./pages/Login/Login";



// TODO : 현재 도메인이 /pwa-react-test라 반드시 붙여야하는지? 확인 필요
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
      // ISSUE: loader 사용시에 해당 페이지로 라우팅시에 이전페이지가 다시 렌더 되고 이동함 
      loader: loginLoader,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/enter_game",
      element: <EnterGame />,
      errorElement: <ErrorPage />,
    },
  ],
  { basename: "/pwa-react-test" }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
