import { useEffect } from "react";
import { apiStartKakao } from "../../service/api/user";

export const LoginRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  useEffect(() => {
    if (code) {
      apiStartKakao(code);
    }
  }, [code]);

  return <div>login Redirect</div>;
};
