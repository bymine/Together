import axiosInstance from './axios';
import { getCookie, removeCookie, setCookie } from './Cookie';

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
    axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
    removeCookie('refreshToken');
    setCookie('refreshToken', response.data.refreshTokenIdxHash, {});
    silentRefresh();
    return response;
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
  }
};

export const silentRefresh = async () => {
  try {
    const response = await axiosInstance.get(
      `/auth/renewal?refreshTokenIdxHash=${getCookie('refreshToken')}`,
    );
    console.log(response);
  } catch (e) {
    throw e;
  }
};

// export const findPassword = async (email: string) => {
//   try{
//     const response = await axiosInstance.get(`/user/link/password`)
//   }
// };
