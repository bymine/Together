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

interface ChangePasswordData {
  userPw: string;
  userPw2: string;
  randomValue1: string;
  randomValue2: string;
}

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axiosInstance.post('/auth', loginData);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshTokenIdxHash);
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
      `/auth/renewal?refreshTokenIdxHash=${localStorage.getItem('refreshToken')}`,
    );
    console.log(response);
  } catch (e) {
    throw e;
  }
};

export const findPassword = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/user/link/password/${email}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  changePasswordData: ChangePasswordData,
) => {
  try {
    const response = await axiosInstance.patch(
      'user/password',
      changePasswordData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const logOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
