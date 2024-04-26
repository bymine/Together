import './accountNavbar.scss';
const AuthNavbar = () => {
  return (
    <div className="authNavbar-wrapper">
      <div className="authNavbar">
        <div className="authNavbar__logo">
          <div className="authNavbar__logo-img"></div>
          <p>Together</p>
        </div>
        <div className="authNavbar__options">서비스 소개</div>
      </div>
    </div>
  );
};

export default AuthNavbar;
