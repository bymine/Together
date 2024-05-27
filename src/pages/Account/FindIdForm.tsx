import { useState } from 'react';
import { Link } from 'react-router-dom';
import './account.scss';

const FindIdForm = () => {
  const [isOkay, setIsOkay] = useState(false);
  const hadnleEmailSubmt = () => {
    setIsOkay(true);
  };

  return (
    <div className="account-form">
      <div className="auth-switch">
        <Link to="/account/find_id" className={`btn selected`}>
          아이디 찾기
        </Link>
        <Link to="/account/find_pw" className={`btn`}>
          비밀번호 찾기
        </Link>
      </div>
      <div className="input-container">
        {isOkay ? (
          <>
            <span className="title">이메일 찾기</span>
            <span className="description">
              {`아이디 찾기가 완료되었습니다.`}
            </span>
            <div>입력하신 이메일로 아이디가 전송되었습니다.</div>
          </>
        ) : (
          <>
            <span className="title">아이디 찾기</span>
            <span className="description">
              {`회원정보에 등록한 이메일을 입력해 주세요.`}
            </span>
            <label className="auth-input-field">
              아이디를 찾을 이메일
              <input
                type="text"
                name="name"
                placeholder="이메일을 입력해 주세요"
              />
            </label>
          </>
        )}

        <input
          className={`submit-btn active`}
          type="submit"
          onClick={hadnleEmailSubmt}
          value={'아이디 찾기'}
        />
      </div>
    </div>
  );
};

export default FindIdForm;
