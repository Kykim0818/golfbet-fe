import { ReactNode } from "react";

const App = (props: { children: ReactNode }) => {
  // App 전체 실행 필요한 부분 처리
  return <>{props.children}</>;
};

export default App;
