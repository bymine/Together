import React from 'react';
import './authenticationForm.scss';
interface AuthenticationFormProps {
  isSignIn: boolean;
  onSubmit: React.MouseEventHandler<HTMLInputElement>;
}

const AuthenticationForm = ({
  isSignIn,
  onSubmit,
}: AuthenticationFormProps) => {
  return (
    <div className="authentication-form">
      <div className="input-container">
        {isSignIn ? (
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
              <input type="password" placeholder="비밀번호를 입력해 주세요" />
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
              <input type="password" placeholder="비밀번호를 입력해 주세요" />
              <input type="password" placeholder="비밀번호를 확인해 주세요" />
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
        )}
        <input
          className={`submit-btn ${isSignIn ? 'active' : ''}`}
          type="submit"
          onClick={onSubmit}
          value={`${isSignIn ? '로그인' : '회원가입'}`}
        />
      </div>
    </div>
  );
};

export default AuthenticationForm;
