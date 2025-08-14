import type { UploadFileType } from '~/components/controls';
import type { GetValidatorErrorType, PaginatedResponseType, QueryListOptionsType, ResponseType } from './base';
import type { StaffType } from './staff';

export const BusinessStatus = {
  Active: 'active' as const,
  Inactive: 'inactive' as const,
};

export type BusinessTransactionQueryListOptionsType = QueryListOptionsType & {
  businessId: BusinessType['id'];
};

export type BusinessDashboardCardResponseType = ResponseType<{
  totalBusiness: number;
  activeBusiness: number;
  inactiveBusiness: number;
  totalCards: number;
}>;

export type BusinessDetailDashboardCardResponseType = ResponseType<{
  walletBalance: number;
  totalNFCCards: number;
  fleets: number;
  totalDeposits: number;
}>;

export type BusinessType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  logo: string | null;
  regDate: Date;
  status: string;
  manager: {
    id: StaffType['id'];
    name: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string; // 'male' | 'female';
  } | null;
  wallet: {
    id: number;
    balance: number;
  } | null;
};

export type CreateBusinessType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  logo?: UploadFileType[];
  manager: {
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string; // 'male' | 'female';
    password: string;
  };
};
export type CreateBusinessErrorType = GetValidatorErrorType<CreateBusinessType>;
export type CreateBusinessResponseType = ResponseType;
export type ToggleBusinessStatusType = { action: 'suspend' | 'activate'; businessId: BusinessType['id'] };

export type UpdateBusinessType = Omit<CreateBusinessType, 'email' | 'phone' | 'manager'> & {
  email?: string;
  phone?: string;
  manager?: CreateBusinessType['manager'];
  original?: BusinessType;
};
export type UpdateBusinessErrorType = GetValidatorErrorType<UpdateBusinessType>;
export type UpdateBusinessResponseType = ResponseType;

export type PaginatedBusinessResponseType = PaginatedResponseType<BusinessType>;
export type SingleBusinessResponseType = ResponseType<BusinessType>;
