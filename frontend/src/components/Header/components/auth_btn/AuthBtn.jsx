import Style from "./style";

const AuthBtn = () => {
  const handleRedirect = (link) => {
    window.location.href = link;
  };
  return (
    <Style className="item-nav flex-grow-1 d-flex flex-row-reverse">
      <div className="d-flex container-btn-auth d-flex flex-row-reverse">
        <div
          className="btn-signup d-flex justify-content-center"
          onClick={() => handleRedirect("/register")}
        >
          <p>Sign Up</p>
        </div>
        <div
          className="btn-login d-flex justify-content-end"
          onClick={() => handleRedirect("/login")}
        >
          <p>Login</p>
        </div>
      </div>
    </Style>
  );
};
export default AuthBtn;
