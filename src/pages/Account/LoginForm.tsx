import { useState } from 'react';
import './account.scss';
import { Link } from 'react-router-dom';
import { loginUser } from '../../api/auth';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    userPw: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="account-form">
      <div className="auth-switch">
        <Link to={'/account/login'} className={`btn selected`}>
          로그인
        </Link>
        <Link to={'/account/register'} className={`btn`}>
          회원가입
        </Link>
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <label className="auth-input-field">
          이메일
          <input
            type="text"
            name="userId"
            placeholder="이메일을 입력해 주세요"
            value={formData.userId}
            onChange={handleChange}
          />
        </label>
        <label className="auth-input-field">
          비밀번호
          <input
            type="password"
            name="userPw"
            placeholder="비밀번호를 입력해 주세요"
            value={formData.userPw}
            onChange={handleChange}
          />
        </label>
        <input className={`submit-btn active`} type="submit" value={'로그인'} />
      </form>
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
