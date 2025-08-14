import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiBusinessDashboardCardsType = ApiResponseType<{
  allCount: number;
  activeCount: number;
  inActiveCount: number;
  totalCards: number;
}>;

export type ApiBusinessDetailDashboardCardsType = ApiResponseType<{
  totalDeposits: number;
  totalFleets: number;
  totalNfc: number;
}>;

export type ApiBusinessType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  state: string | null;
  lga: string | null;
  address: string | null;
  logo: string | null;
  banner: string | null;
  description: string | null;
  type: string | null;
  status: string; // "active",
  createdAt: number;
  updatedAt: number;
  companyId: number | null;
  wallet: {
    id: number;
    balance: number;
    holdingBalance: number;
    prevBalance: number;
    prevHoldingBalance: number;
    createdAt: number;
    updatedAt: number;
    companyId: number | null;
    businessId: number;
    nfcId: number | null;
  } | null;
  staffs?: {
    id: number;
    role: string; // business-manager
    status: string; // active
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phone: string;
    gender: 'male' | 'fe-male'; // "male"
    createdAt: number;
    updatedAt: number;
    userId: number | null;
    companyId: number | null;
    stationId: number | null;
    businessId: number | null;
  }[];
};

export type ApiBusinessCreateType = {
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  address: string;
  logo?: string;
  kyc?: {
    identityType: string; //rc,bn,tin
    identityNumber: string;
    documentUrl: string;
  };
  manager: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    gender: 'male' | 'female';
  };
};

export type ApiBusinessUpdateType = {
  name: string;
  email?: string;
  phone?: string;
  state: string;
  lga: string;
  address: string;
  logo?: string;
  kyc?: {
    identityType: string; //rc,bn,tin
    identityNumber: string;
    documentUrl: string;
  };
  manager?: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    phone?: string;
    password: string;
    gender: 'male' | 'female';
  };
};

export type ApiGetBusinessPaginatedType = ApiPaginatedResponseType<ApiBusinessType>;
export type ApiGetBusinessDetailType = ApiResponseType<ApiBusinessType>;
