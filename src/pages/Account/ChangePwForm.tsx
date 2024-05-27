import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { isValidatePassword } from '../../utils/validationUtils';
import { changePassword } from '../../api/auth';
import { useNavigate, useParams } from 'react-router-dom';
const ChangePwForm = () => {
  const navigate = useNavigate();
  const { random1, random2 } = useParams();
  const [passwords, setPasswords] = useState({
    userPw: '',
    userPw2: '',
  });

  const [errors, setErrors] = useState({
    userPw: '',
    userPw2: '',
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleTogglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const handleTogglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };
  const validatePw = (pw: string) => {
    if (!isValidatePassword(pw)) {
      setErrors({
        ...errors,
        userPw: '8-20자 이내, 대소문자 및 숫자를 포함해야 합니다.',
      });
    } else {
      setErrors({ ...errors, userPw: '' });
    }
  };

  const validatePwConfirmation = (confirmPw: string) => {
    if (confirmPw !== passwords.userPw) {
      setErrors({
        ...errors,
        userPw2: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      setErrors({
        ...errors,
        userPw2: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswords({
      ...passwords,
      [name]: value,
    });

    switch (name) {
      case 'userPw':
        validatePw(value);
        break;
      case 'userPw2':
        validatePwConfirmation(value);
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await changePassword({
        userPw: passwords.userPw,
        userPw2: passwords.userPw2,
        randomValue1: random1 ?? '',
        randomValue2: random2 ?? '',
      });
      if (response.status === 200) navigate('/');
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="account-form">
      <div className="input-container">
        <>
          <span className="title">비밀번호 재설정</span>
          <span className="description">
            {`새롭게 설정할 비밀번호를 입력해 주세요.`}
          </span>
          <label className="auth-input-field">
            비밀번호
            <div className="password-container">
              <input
                type={showPassword1 ? 'text' : 'password'}
                name="userPw"
                placeholder="비밀번호를 입력해 주세요"
                value={passwords.userPw}
                onChange={handleChange}
              />
              <div className="icon" onClick={handleTogglePassword1Visibility}>
                {showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
          </label>
          {errors.userPw && <span className="error-msg">{errors.userPw}</span>}
          <label className="auth-input-field">
            비밀번호 확인
            <div className="password-container">
              <input
                type={showPassword2 ? 'text' : 'password'}
                name="userPw2"
                placeholder="비밀번호를 입력해 주세요"
                value={passwords.userPw2}
                onChange={handleChange}
              />
              <div className="icon" onClick={handleTogglePassword2Visibility}>
                {showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
          </label>
          {errors.userPw2 && (
            <span className="error-msg">{errors.userPw2}</span>
          )}
          <input
            className={`submit-btn active`}
            type="submit"
            value={'저장하기'}
            onClick={handleSubmit}
          />
        </>
      </div>
    </div>
  );
};

export default ChangePwForm;
