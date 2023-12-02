import { ReactNode, useEffect } from "react";
import LoadingContainer from "./components/LoadingContainer";
import ModalContainer from "./components/ModalContainer";
import { requestAccessToken } from "./service/api";
import axios from "axios";

const App = (props: { children: ReactNode }) => {
  // App 전체 실행 필요한 부분 처리
  useEffect(() => {
    if (axios.defaults.headers.common["Authorization"] === undefined)
      requestAccessToken();
  }, []);

  return (
    <>
      {props.children}
      <ModalContainer />
      <LoadingContainer />
    </>
  );
};

export default App;
