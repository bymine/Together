import './account.scss';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  return (
    <div className="account-form">
      <div className="auth-toggle">
        <Link to={'/account/login'} className={`btn active`}>
          로그인
        </Link>
        <Link to={'/account/register'} className={`btn`}>
          회원가입
        </Link>
      </div>
      <div className="input-container">
        <label className="auth-input-field">
          이메일
          <input
            type="text"
            name="userEmail"
            placeholder="이메일을 입력해 주세요"
          />
        </label>
        <label className="auth-input-field">
          비밀번호
          <input
            type="password"
            name="userPassword"
            placeholder="비밀번호를 입력해 주세요"
          />
        </label>
        <input
          className={`submit-btn active`}
          type="submit"
          onClick={() => {}}
          value={'로그인'}
        />
      </div>
      <span className="find-account">
        {'계정을 잊으셨나요?'}
        <Link to={'/account/find_id'} className="find-account-btn">
          {'계정 찾기'}
        </Link>
      </span>
      <div className="other-auth-options">
        <span>SNS 계정으로 간편하게 시작하기</span>
        <div className="social-login-options">
          <div className="social-login-option">
            <div className="social-icon"></div>
            <span>Google</span>
          </div>
          <div className="social-login-option">
            <div className="social-icon"></div>
            <span>Kakako</span>
          </div>
          <div className="social-login-option">
            <div className="social-icon"></div>
            <span>Naver</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
