import { useState } from 'react';
import { loginUser } from '../../api/auth';
import {
  isValidateEmail,
  isValidatePassword,
} from '../../utils/validationUtils';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axiosInstance from '../../api/axios';

const useLoginHook = () => {
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({
    userId: '',
    userPw: '',
  });
  const [errors, setErrors] = useState('');

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
  };
  const validateEmail = (email: string) => {
    if (!isValidateEmail(email)) {
      setErrors(
        '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.',
      );
      return false;
    } else {
      setErrors('');
      return true;
    }
  };

  const validatePw = (pw: string) => {
    if (!isValidatePassword(pw)) {
      setErrors(
        '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.',
      );
      return false;
    } else {
      setErrors('');
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formLogin.userId) || !validatePw(formLogin.userPw))
      return;

    try {
      const response = await loginUser(formLogin);
      if (response.status === 200) {
        navigate('/dashboard');
        console.log(axiosInstance.defaults.headers);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const statusCode = e.response?.status;
        const message = e.response?.data.message;
        if (statusCode === 401) {
          if (message === 'Your user ID or password is incorrect.') {
            setErrors(
              '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.',
            );
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
