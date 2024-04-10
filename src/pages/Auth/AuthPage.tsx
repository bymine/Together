import { useState } from 'react';
import './authPage.scss';
import { useNavigate } from 'react-router-dom';
const AuthPage = () => {
  const navigate = useNavigate();
  const [isAuthMode, setIsAuthMode] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isFindId, setIsFindId] = useState(true);

  return (
    <div className={`auth-wrapper ${isSignIn ? '' : 'active'}`}>
      <div className="auth-container">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>환영합니다. 여러분</h1>
            <p>{`투게더와 합께 협업하여 다 나은 프로젝트를 만들어봐요`}</p>
          </div>
          <div className="welcome-logo"></div>
        </div>
        <div className="auth-form">
          <div className="auth-toggle">
            {isAuthMode ? (
              <>
                <button
                  className={`btn ${isSignIn ? 'active' : ''}`}
                  onClick={() => {
                    setIsSignIn(isSignIn ? isSignIn : !isSignIn);
                  }}>
                  로그인
                </button>
                <button
                  className={`btn ${isSignIn ? '' : 'active'}`}
                  onClick={() => {
                    setIsSignIn(isSignIn ? !isSignIn : isSignIn);
                  }}>
                  회원가입
                </button>
              </>
            ) : (
              <>
                <button
                  className={`btn ${isFindId ? 'active' : ''}`}
                  onClick={() => {
                    setIsFindId(isFindId ? isFindId : !isFindId);
                  }}>
                  아이디 찾기
                </button>
                <button
                  className={`btn ${isFindId ? '' : 'active'}`}
                  onClick={() => {
                    setIsFindId(isFindId ? !isFindId : isFindId);
                  }}>
                  비밀번호 찾기
                </button>
              </>
            )}
          </div>
          <div className="input-container">
            {isAuthMode ? (
              isSignIn ? (
                <>
                  <label className="auth-input-field">
                    이메일
                    <input
                      type="text"
                      name="name"
                      placeholder="이메일을 입력해 주세요"
                    />
                  </label>
                  <label className="auth-input-field">
                    비밀번호
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해 주세요"
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="auth-input-field">
                    이메일
                    <input
                      type="text"
                      name="name"
                      placeholder="이메일을 입력해 주세요"
                    />
                  </label>
                  <label className="auth-input-field">
                    이메일
                    <input
                      type="text"
                      name="name"
                      placeholder="이메일을 입력해 주세요"
                    />
                  </label>
                  <label className="auth-input-field password-field">
                    비밀번호
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해 주세요"
                    />
                    <input
                      type="password"
                      placeholder="비밀번호를 확인해 주세요"
                    />
                  </label>
                  <label className="auth-input-field">
                    닉네임
                    <input
                      type="text"
                      name="name"
                      placeholder="닉네임을 입력해 주세요"
                    />
                  </label>
                  <label className="auth-input-field">
                    이메일
                    <input
                      type="text"
                      name="name"
                      placeholder="이메일을 입력해 주세요"
                    />
                  </label>
                  <label className="auth-input-field">
                    이메일
                    <input
                      type="text"
                      name="name"
                      placeholder="이메일을 입력해 주세요"
                    />
                  </label>
                </>
              )
            ) : isFindId ? (
              <>
                <label className="auth-input-field">
                  휴대전화 번호
                  <input
                    type="text"
                    name="name"
                    placeholder="휴대전화 번호를 입력해 주세요"
                  />
                </label>
              </>
            ) : (
              <>
                <label className="auth-input-field">
                  비밀번호를 재설정 할 이메일
                  <input
                    type="text"
                    name="name"
                    placeholder="이메일을 입력해 주세요"
                  />
                </label>
              </>
            )}
            <input
              className={`submit-btn ${isSignIn ? 'active' : ''}`}
              type="submit"
              onClick={() => {
                navigate('/dashboard');

                // navigate('/dashboard', { replace: true });
              }}
              value={`${isSignIn ? '로그인' : '회원가입'}`}
            />
          </div>
          <span className="find-account">
            {isAuthMode ? '계정을 잊으셨나요?' : '계정이 기억나셨나요?'}
            <div
              className="find-account-btn"
              onClick={() => {
                setIsAuthMode(!isAuthMode);
              }}>
              {isAuthMode ? '계정 찾기' : '로그인'}
            </div>
          </span>
          {isAuthMode ? (
            <div className="other-auth-options">
              <span>다른 계정으로 로그인 하기</span>
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
