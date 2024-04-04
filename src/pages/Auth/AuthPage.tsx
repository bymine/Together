import { useState } from 'react';

import './authPage.css';
import { useNavigate } from 'react-router-dom';
const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="auth-page">
      <div className="auth-page__intro">
        <div className="auth-page__title">
          <h1>개발자 전용</h1>
          <p>반가워요, 개발자 성장을 돕는 프로그래머스 입니다.</p>
        </div>
        <div className="auth-page__logo"></div>
      </div>
      <div className="auth-page__wrapper">
        <div className="auth-page__type">
          <button
            className={`auth-page__signin-btn ${isSignIn ? 'active' : ''}`}
            onClick={handleToggle}>
            로그인
          </button>
          <button
            className={`auth-page__signup-btn ${isSignIn ? '' : 'active'}`}
            onClick={handleToggle}>
            회원가입
          </button>
        </div>
        <div className="auth-page__form">
          {isSignIn ? (
            <>
              <label>
                이름
                <input
                  type="text"
                  name="name"
                  placeholder="이름을 입력해 주세요"
                />
              </label>
              <label>
                비밀번호
                <input type="text" placeholder="비밀번호를 입력해 주세요" />
              </label>
            </>
          ) : (
            <>
              <label>
                이메일
                <input
                  type="text"
                  name="name"
                  placeholder="이메일을 입력해 주세요"
                />
              </label>
              <label>
                이메일
                <input
                  type="text"
                  name="name"
                  placeholder="이메일을 입력해 주세요"
                />
              </label>
              <label>
                비밀번호
                <input type="text" placeholder="비밀번호를 입력해 주세요" />
                <input type="text" placeholder="비밀번호를 확인해 주세요" />
              </label>
              <label>
                닉네임
                <input
                  type="text"
                  name="name"
                  placeholder="닉네임을 입력해 주세요"
                />
              </label>
            </>
          )}
          <input
            className="auth-page__btn"
            type="submit"
            onClick={() => {
              navigate('/dashboard');

              // navigate('/dashboard', { replace: true });
            }}
            value={`${isSignIn ? '로그인' : '회원가입'}`}
          />
        </div>
        <div className="auth-page__auth-other">
          <span>다른 계정으로 로그인 하기</span>
          <div className="socials">
            <div className="social">
              <div className="social-img"></div>
              <span>Google</span>
            </div>
            <div className="social">
              <div className="social-img"></div>
              <span>Kakako</span>
            </div>
            <div className="social">
              <div className="social-img"></div>
              <span>Naver</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
