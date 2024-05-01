import { AxiosError } from 'axios';
import { useState } from 'react';
import { registerUser, verifyCode, verifyRequest } from '../../api/auth';
import {
  isValidateEmail,
  isValidateName,
  isValidatePassword,
} from '../../utils/validationUtils';

const useRegisterHook = () => {
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    userPw: '',
    userPw2: '',
    code: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    userPw: '',
    userPw2: '',
    code: '',
  });

  const [verifyStatus, setVerifyStatus] = useState({
    email: false,
    code: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormRegister({
      ...formRegister,
      [name]: value,
    });

    switch (name) {
      case 'email':
        if (verifyStatus.email) initializeVerfiyStatus();
        validateEmail(value);
        break;
      case 'userPw':
        validatePw(value);
        break;
      case 'userPw2':
        validatePwConfirmation(value);
        break;
      case 'name':
        validateName(value);
    }
  };

  const initializeVerfiyStatus = () => {
    setVerifyStatus({ email: false, code: false });
    setFormRegister({ ...formRegister, code: '' });
  };

  const validateEmail = (email: string) => {
    if (!isValidateEmail(email)) {
      setErrors({ ...errors, email: '유효한 이메일 주소를 입력하세요' });
    } else {
      setErrors({ ...errors, email: '' });
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

  const validatePwConfirmation = (confirmPw: string) => {
    if (confirmPw !== formRegister.userPw) {
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

  const validateName = (name: string) => {
    if (!isValidateName(name)) {
      setErrors({
        ...errors,
        name: '유효한 이름이 아닙니다.',
      });
    } else {
      setErrors({ ...errors, name: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(formRegister);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickVerifyRequest = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      const response = await verifyRequest({
        email: formRegister.email,
        phone: '',
        verificationCodeType: 'EMAIL',
        verificationCode: '',
      });

      if (response?.status === 200) {
        setVerifyStatus({ ...verifyStatus, email: true });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const statusCode = e.response?.status;
        if (statusCode === 400) {
          setVerifyStatus({ ...verifyStatus, email: false });
          setErrors({
            ...errors,
            email: '이메일 양식이 아닙니다. 이메일 양식으로 다시 입력해 주세요',
          });
        } else if (statusCode === 409) {
          setVerifyStatus({ ...verifyStatus, email: false });
          setErrors({
            ...errors,
            email: '이미 존재하는 이메일 입니다. 다른 이메일을 사용해 주세요',
          });
        }
      }
    }
  };

  const onClickVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await verifyCode({
        email: formRegister.email,
        phone: '',
        verificationCodeType: 'EMAIL',
        verificationCode: formRegister.code,
      });
      if (response?.status === 200) {
        setVerifyStatus({ ...verifyStatus, code: true });
        setErrors({
          ...errors,
          code: '',
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const statusCode = e.response?.status;
        if (statusCode === 400) {
          setVerifyStatus({ ...verifyStatus, code: false });
          setErrors({
            ...errors,
            code: '잘못된 인증번호 입니다. 확인 후 다시 입력해 주세요',
          });
        } else if (statusCode === 409) {
          setVerifyStatus({ ...verifyStatus, code: false });
          setErrors({
            ...errors,
            code: '이메일 양식이 아닙니다. 이메일 양식으로 다시 입력해 주세요',
          });
        }
      }
    }
  };

  const verifyComplete = verifyStatus.email && verifyStatus.code;
  const activeCodeInput =
    formRegister.email && verifyStatus.email && !verifyStatus.code;

  return {
    formRegister,
    errors,
    handleChange,
    handleSubmit,
    onClickVerifyRequest,
    onClickVerifyCode,
    verifyComplete,
    activeCodeInput,
  };
};

export default useRegisterHook;
