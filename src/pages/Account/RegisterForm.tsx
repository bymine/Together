import { Link } from 'react-router-dom';
import './account.scss';

const RegisterForm = () => {
  return (
    <div className="account-form">
      <div className="auth-toggle">
        <Link to="/account/login" className={`btn`}>
          로그인
        </Link>
        <Link to="/account/register" className={`btn active`}>
          회원가입
        </Link>
      </div>
      <div className="input-container">
        <label className="auth-input-field group-field">
          이메일
          <div className="button-field">
            <input
              type="text"
              name="userEmail"
              placeholder="이메일을 입력해 주세요"
            />
            <button>인증번호 받기</button>
          </div>
          <div className="button-field">
            <input
              type="text"
              name="emailCode"
              placeholder="인증코드를 입력해 주세요"
            />
            <button>확인</button>
          </div>
        </label>
        <label className="auth-input-field group-field">
          비밀번호
          <input
            type="password"
            name="userPassword"
            placeholder="비밀번호를 입력해 주세요"
          />
          <input
            type="password"
            name="userPasswordCheck"
            placeholder="비밀번호를 확인해 주세요"
          />
        </label>

        <label className="auth-input-field">
          이름
          <input
            type="text"
            name="userName"
            placeholder="이름을 입력해 주세요"
          />
        </label>

        <input
          className={`submit-btn `}
          type="submit"
          onClick={() => {}}
          value={'회원가입'}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
