export const LoginRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  return <div>login Redirect</div>;
};
