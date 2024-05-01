import { useState } from 'react';
import { Link } from 'react-router-dom';
import './account.scss';

const FindPwForm = () => {
  const [isOkay, setIsOkay] = useState(false);
  const hadnlePwSubmit = () => {
    setIsOkay(!isOkay);
  };
  return (
    <div className="account-form">
      <div className="auth-switch">
        <Link to="/account/find_id" className={`btn `}>
          아이디 찾기
        </Link>
        <Link to="/account/find_pw" className={`btn selected`}>
          비밀번호 찾기
        </Link>
      </div>
      <div className="input-container">
        {isOkay ? (
          <>
            <span className="title">비밀번호 재설정</span>
            <span className="description">
              {`새롭게 설정할 비밀번호를 입력해 주세요.`}
            </span>
            <label className="auth-input-field">
              새로운 비밀번호
              <input
                type="text"
                name="name"
                placeholder="영문자, 솟자, 특수문자 포함 최소 8~20자"
              />
            </label>
            <label className="auth-input-field">
              비밀번호 확인
              <input
                type="text"
                name="name"
                placeholder="비밀번호를 확인해 주세요"
              />
            </label>
          </>
        ) : (
          <>
            <span className="title">비밀번호 재설정</span>
            <span className="description">
              {`비밀번호를 재설정 할 이메일을 입력해 주세요.\n입력된 메일로 자세한 안내를 보내드립니다`}
            </span>
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
          className={`submit-btn `}
          type="submit"
          onClick={hadnlePwSubmit}
          value={'비밀번호 찾기'}
        />
      </div>
    </div>
  );
};

export default FindPwForm;
