import { Link, useNavigate } from 'react-router-dom';
import './account.scss';
import { useState } from 'react';
import { findPassword } from '../../api/auth';
import { isValidateEmail } from '../../utils/validationUtils';

const FindPwForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    if (!isValidateEmail(email)) {
      setError('이메일을 찾을 수 없습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) return;

    try {
      const response = await findPassword(email);
      if (response.status === 200) {
        navigate('/account/login', {
          state: {
            message: `${email}(으)로 비밀번호 재설정 이메일을 보냈습니다.`,
          },
        });
      }
    } catch (e) {
      setError('이메일을 찾을 수 없습니다.');
    }
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
            value={email}
            onChange={handleChange}
          />
        </label>
        {error && <span className="error-msg">{error}</span>}
        <input
          className={`submit-btn active`}
          type="submit"
          onClick={handleSubmit}
          value={'비밀번호 재설정 메일 보내기'}
        />
      </div>
    </div>
  );
};

export default FindPwForm;
