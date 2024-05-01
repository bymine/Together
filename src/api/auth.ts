import axiosInstance from './axios';

interface LoginData {
  userId: string;
  userPw: string;
}

interface RegisterData {
  name: string;
  email: string;
  userPw: string;
  userPw2: string;
}

interface VerifyData {
  email: string;
  phone: string;
  verificationCodeType: string;
  verificationCode: string;
}

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axiosInstance.post('/auth', loginData);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const verifyRequest = async (verifyData: VerifyData) => {
  try {
    const response = await axiosInstance.post(
      '/auth/email-verification-code',
      verifyData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const verifyCode = async (verifyData: VerifyData) => {
  try {
    const response = await axiosInstance.patch(
      '/auth/email-verification',
      verifyData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (registerUser: RegisterData) => {
  try {
    const response = await axiosInstance.post('/user', registerUser);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
