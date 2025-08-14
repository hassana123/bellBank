import type { ApiResponseType } from './base';

export type ApiLoginResponseType = ApiResponseType<{
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: string; // "staff",
  status: string; // "active",
  createdAt: number;
  updatedAt: number;
  staff: {
    id: number;
    role: string; // "general-manager",
    status: string; // "active",
    createdAt: number;
    updatedAt: number;
    userId: number;
    companyId: number | string;
    stationId: number | string;
    businessId: number | string;
  } | null;
}> & {
  token: string;
  duration: number;
};

export type ApiForgotPasswordResponseType = ApiResponseType & { token: string };
export type ApiVerifyPasswordOtpResponseType = ApiResponseType & { token: string };
export type ApiConfirmPasswordResetResponseType = ApiResponseType<{
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  accountType: string; // "staff",
  status: string; // "active",
  createdAt: number;
  updatedAt: number;
  staff: {
    id: number;
    role: string; // "general-manager",
    status: string; // "active",
    createdAt: number;
    updatedAt: number;
    userId: number | null;
    companyId: number | null;
    stationId: number | null;
    businessId: number | null;
  };
}>;
