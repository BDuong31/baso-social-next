import { IApiResponse } from '@/interfaces/api-response';
import axiosInstance, { endpoints } from '@/utils/axios';

//-------------------------------------------------------------------------------------------

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  avatar?: string | null;
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  email: string | null | undefined;
  password: string | undefined;
}

export const login = async ({ username, password }: LoginParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.login, {
    username,
    password,
  });
  return response.data;
}

export const register = async (params: RegisterParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.register, params);
  return response.data;
};

// export const logout = async (): Promise<IApiResponse<string>> => {
//   const response = await axiosInstance.post(endpoints.auth.logout);
//   return response.data;
// };

export  const googleLogin = async (params: RegisterParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.googleLogin, params);
  return response.data;
}
