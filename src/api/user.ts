import axiosInstance from './axios';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/user/test');
    console.log(response);
  } catch (error) {
    throw error;
  }
};

export const patchNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.patch('/user/nickname', nickname);
    console.log(response);
  } catch (error) {
    throw error;
  }
};
