import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export const ApiStaffRole = {
  'Business Manager': 'business-manager',
  'General Manager': 'general-manager',
  'Station Manager': 'station-manager',
};

export const ApiStaffStatus = {
  Active: 'active',
};

export type ApiStaffDashboardCardsType = ApiResponseType<{
  total: number;
  active: number;
  inActive: number;
  new: number;
}>;

export type ApiStaffType = {
  id: number;
  role: string; // "general-manager",
  status: string; // "active",
  createdAt: number;
  updatedAt: number;
  userId: number;
  companyId: number | null;
  stationId: number | null;
  businessId: number | null;
  user: {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    photo?: string | null;
    gender?: string;
    accountType: string; // 'staff';
    status: string; // 'active';
    createdAt: number;
    updatedAt: number;
  } | null;
};

export type ApiStaffCreateType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: 'male' | 'fe-male';
  role: string; // "secretary",
  stationId?: string;
  photo?: string;
};

export type ApiStaffUpdateType = Omit<ApiStaffCreateType, 'password' | 'email' | 'phone'> & {
  email?: string;
  phone?: string;
};

export type ApiGetStaffPaginatedType = ApiPaginatedResponseType<ApiStaffType>;
export type ApiGetStaffDetailResponseType = ApiResponseType<ApiStaffType>;
