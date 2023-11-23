import { ReactNode } from "react";
import LoadingContainer from "./components/LoadingContainer";
import ModalContainer from "./components/ModalContainer";

const App = (props: { children: ReactNode }) => {
  // App 전체 실행 필요한 부분 처리
  return (
    <>
      {props.children}
      <ModalContainer />
      <LoadingContainer />
    </>
  );
};

export default App;
