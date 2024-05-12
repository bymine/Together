import { useState } from 'react';
import { loginUser } from '../../api/auth';
import {
  isValidateEmail,
  isValidatePassword,
} from '../../utils/validationUtils';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const useLoginHook = () => {
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({
    userId: '',
    userPw: '',
  });
  const [errors, setErrors] = useState({
    userId: '',
    userPw: '',
    description: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });

    switch (name) {
      case 'userId':
        validateEmail(value);
        break;
      case 'userPw':
        validatePw(value);
        break;
    }
  };
  const validateEmail = (email: string) => {
    if (!isValidateEmail(email)) {
      setErrors({ ...errors, userId: '유효한 이메일 주소를 입력하세요' });
    } else {
      setErrors({ ...errors, userId: '' });
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formLogin);
      if (response.status === 200) {
        console.log(response.data.accessToken);
        console.log(response.data.refreshTokenIdxHash);
        navigate('/dashboard');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const statusCode = e.response?.status;
        const message = e.response?.data.message;

        if (statusCode === 401) {
          if (message === 'Your user ID or password is incorrect.') {
            setErrors({
              ...errors,
              description:
                '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.',
            });
          }
        }
      }
    }
  };

  return {
    formLogin,
    errors,
    handleChange,
    handleSubmit,
    showPassword,
    handleTogglePasswordVisibility,
  };
};

export default useLoginHook;
