import { ApiError, extractMessageFromResponse } from "./error"
import api from "./api"

export interface AuthResp {
  token: string;
  expiresIn: string;
  email: string;
}


export async function register(email: string, password: string, confirmPassword: string): Promise<AuthResp> {
  const { data } = await api.post<AuthResp>("/auth/register", { email, password, confirmPassword })
  return data
}

export async function login(email: string, password: string): Promise<AuthResp> {
  const { data } = await api.post<AuthResp>("/auth/login", { email, password });
  return data;
}