import type { ResponseType } from './base';

export type AuthDataType = {
  id: number;
  name: string;
  displayName: string | null;
  email: string;
  phone: string;
  address: string | null;
  city: string;
  state: string;
  logo: string | null;
};

export type LoginRequestDataType = {
  email: string;
  password: string;
};
export type LoginResponseType = ResponseType<{
  csrfToken: string;
  token: string;
  user: AuthDataType;
}>;
export type ServerLoginResponseType = ResponseType<{
  token: string;
  user: AuthDataType;
}>;

export type ResetPasswordRequestDataType = { email: string };
export type ResetPasswordResponseType = ResponseType<{ token: string }>;

export type VerifyResetPasswordRequestDataType = { otp: string; token: string };
export type VerifyResetPasswordResponseType = ResponseType<{ token: string }>;

export type ConfirmResetPasswordRequestDataType = {
  password: string;
  token: string;
};

export type ChangePasswordRequestDataType = { oldPassword: string; newPassword: string; confirmPassword: string };
