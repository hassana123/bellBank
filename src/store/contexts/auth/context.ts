import React from 'react';

import type { AuthDataType } from '~/types';
import { AppError } from '~/utils/errors';

export type OTPContextType = {
  token: string;
};

export type AuthType = {
  csrfToken: string | null;
  data: AuthDataType | null;
  auth: boolean;
  loading: boolean;
  token: string | null;
  otp: OTPContextType | null;
};

export type LoginPayloadType = { token: string; user: AuthDataType; csrfToken: string };
export type LogoutPayloadType = { csrfToken?: string } | void;
export type ReducerActionType =
  | { type: 'change-csrf'; payload: string }
  | { type: 'logout'; payload: LogoutPayloadType }
  | { type: 'login'; payload: LoginPayloadType }
  | { type: 'set-otp'; payload: OTPContextType | null };

export type AuthContextType = AuthType & {
  changeCSRFToken: (payload: string) => void;
  login: (payload: LoginPayloadType) => void;
  logout: (payload: LogoutPayloadType) => void;
  setOTP: (payload: OTPContextType | null) => void;
};

export const useAuthContext = () => {
  return React.useContext(AuthContext) as AuthContextType;
};

export const useUserContext = () => {
  const { data, token, csrfToken, ...context } = useAuthContext();
  if (!data || !token || !csrfToken) throw new AppError(401);

  return { ...context, token, csrfToken, user: data, data };
};

export const AuthContext = React.createContext<AuthContextType | null>(null);
