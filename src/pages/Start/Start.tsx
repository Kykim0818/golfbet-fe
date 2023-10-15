import { useAccount } from "../../hooks/useAccount";
import Home from "../Home";
import Login from "../Login";

export const Start = () => {
  /**
   *  login check
   *  login 된 상태면 -> main
   *  안된 상태면 -> login
   *  useAccount 전역 필요해보임
   */
  const { isLogined, handleLogIn, handleLogout } = useAccount();
  if (isLogined) return <Home handleLogout={handleLogout} />;
  return <Login handleLogin={handleLogIn} />;
};

export default Start;
