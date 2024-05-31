import './account.scss';
import { Link, useLocation } from 'react-router-dom';
import useLoginHook from '../../hooks/Account/useLogin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
const LoginForm = () => {
  const {
    formLogin,
    errors,
    handleChange,
    handleSubmit,
    showPassword,
    handleTogglePasswordVisibility,
  } = useLoginHook();

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state !== null) {
      setOpen(true);
    }
  }, [state]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="account-form">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        message={state?.message}
        onClose={handleClose}
      />
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
            value={formLogin.userId}
            onChange={handleChange}
          />
        </label>
        <label className="auth-input-field">
          비밀번호
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="userPw"
              placeholder="비밀번호를 입력해 주세요"
              value={formLogin.userPw}
              onChange={handleChange}
            />
            <div className="icon" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>
        </label>
        {errors && <span className="error-msg">{errors}</span>}
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
