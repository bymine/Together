import { Outlet } from 'react-router-dom';
import './accountLayout.scss';
const AuthPage = () => {
  return (
    <div className={`auth-wrapper `}>
      <div className="auth-container">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>환영합니다. 여러분</h1>
            <p>{`투게더와 합께 협업하여 다 나은 프로젝트를 만들어봐요`}</p>
          </div>
          <div className="welcome-logo"></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
