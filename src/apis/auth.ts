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

interface VerifyF2aResponse {
  f2a: boolean;
  token: string;
}

interface EnableF2aResponse {
  qrcode: string;
  secret: string;
}
interface LoginResponse {
  token: string;
  f2a: boolean;
}
export const login = async ({ username, password }: LoginParams): Promise<LoginResponse> => {
  const response = await axiosInstance.post(endpoints.auth.login, {
    username,
    password,
  });
  return response.data.data;
}

export const register = async (params: RegisterParams): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.post(endpoints.auth.register, params);
  return response.data;
};

// export const logout = async (): Promise<IApiResponse<string>> => {
//   const response = await axiosInstance.post(endpoints.auth.logout);
//   return response.data;
// };

export  const googleLogin = async (params: RegisterParams): Promise<LoginResponse> => {
  const response = await axiosInstance.post(endpoints.auth.googleLogin, params);
  return response.data.data;
}

export const enableF2a = async (params: { id: string }): Promise<EnableF2aResponse> => {
  const response = await axiosInstance.post(endpoints.auth.f2a(params.id));
  return response.data.data;
}

export const disableF2a = async (params: { id: string }): Promise<IApiResponse<string>> => {
  const response = await axiosInstance.delete(endpoints.auth.f2a(params.id));
  return response.data;
}

export const verifyF2a = async (params: {id: string, token: string }): Promise<VerifyF2aResponse> => {
  const response = await axiosInstance.patch(endpoints.auth.verifyF2a(params.id), { token: params.token });
  return response.data.data;
}
