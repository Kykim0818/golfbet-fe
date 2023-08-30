import { useNavigate } from "react-router-dom";

export const useAccount = () => {
  const accessToken = localStorage.getItem("accessToken");
  // TODO: 분리해도될지 고민 필요
  const isLogined = accessToken !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const handleLogIn = (accessToken: string, refreshToken: string) => {
    //TOOD 확인필요
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/");
  };

  return {
    isLogined,
    handleLogout,
    handleLogIn,
  };
};
