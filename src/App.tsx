import { useAccount } from "./hooks/useAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  /**
   *  login check
   *  login 된 상태면 -> main
   *  안된 상태면 -> login
   *  useAccount 전역 필요해보임
   */
  const { isLogined, handleLogIn, handleLogout } = useAccount();
  if (isLogined) return <Home handleLogout={handleLogout} />;
  return <Login handleLogin={handleLogIn} />;
}

export default App;
