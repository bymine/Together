import { Link } from 'react-router-dom';
import './account.scss';

import useRegisterHook from '../../hooks/Account/useRegister';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const RegisterForm = () => {
  const {
    formRegister,
    errors,
    handleChange,
    handleSubmit,
    onClickVerifyRequest,
    onClickVerifyCode,
    verifyComplete,
    activeCodeInput,
    activeSubmit,
    showPassword,
    showPasswordConfirmation,
    handleTogglePasswordVisibility,
    handleToggleConfirmationPasswordVisibility,
  } = useRegisterHook();

  return (
    <div className="account-form">
      <div className="auth-switch">
        <Link to="/account/login" className={`btn`}>
          로그인
        </Link>
        <Link to="/account/register" className={`btn selected`}>
          회원가입
        </Link>
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <label className="auth-input-field group-field">
          {`이메일 ${verifyComplete ? '✅' : ''}`}
          <div className="button-field">
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해 주세요"
              value={formRegister.email}
              onChange={handleChange}
            />
            <button onClick={onClickVerifyRequest}>인증번호 받기</button>
          </div>
          {errors.email && <span className="error-msg">{errors.email}</span>}
          {activeCodeInput && (
            <div className="button-field">
              <input
                type="text"
                name="code"
                placeholder="인증코드를 입력해 주세요"
                value={formRegister.code}
                onChange={handleChange}
              />
              <button onClick={onClickVerifyCode}>확인</button>
            </div>
          )}
          {errors.code && <span className="error-msg">{errors.code}</span>}
        </label>
        <label className="auth-input-field group-field">
          비밀번호
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="userPw"
              placeholder="비밀번호를 입력해 주세요"
              value={formRegister.userPw}
              onChange={handleChange}
            />
            <div className="icon" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>
          {errors.userPw && <span className="error-msg">{errors.userPw}</span>}
          <div className="password-container">
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              name="userPw2"
              placeholder="비밀번호를 확인해 주세요"
              value={formRegister.userPw2}
              onChange={handleChange}
            />
            <div
              className="icon"
              onClick={handleToggleConfirmationPasswordVisibility}>
              {showPasswordConfirmation ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </div>
          </div>
          {errors.userPw2 && (
            <span className="error-msg">{errors.userPw2}</span>
          )}
        </label>

        <label className="auth-input-field">
          이름
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해 주세요"
            value={formRegister.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </label>

        <input
          className={`submit-btn ${activeSubmit ? 'active' : ''}`}
          type="submit"
          disabled={!activeSubmit}
          value={'회원가입'}
        />
      </form>
    </div>
  );
};

export default RegisterForm;
