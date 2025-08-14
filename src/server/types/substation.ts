import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiSubstationDashboardCardsType = ApiResponseType<{
  allCount: number;
  activeCount: number;
  inActiveCount: number;
  totalCards: number;
}>;

export type ApiSubstationDetailDashboardCardsType = ApiResponseType<{
  totalSalesCount: string;
  totalSalesAmount: string;
  holdngBalance: string;
}>;

export type ApiSubstationType = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  state: string | null;
  lga: string | null;
  address: string | null;
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
    stationId: number | null;
    nfcId: null;
  } | null;
  staffs?: {
    id: number;
    role: string; // station-manager
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

export type ApiSubstationDetailType = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  state: string | null;
  lga: string | null;
  address: string | null;
  status: string; // 'active';
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
    stationId: number | null;
    businessId: number | null;
    nfcId: number | null;
  } | null;
  company: {
    id: number;
    name: string;
    state: string | null;
    lga: string | null;
    address: string | null;
    logo: string | null;
    banner: string | null;
    description: string | null;
    email: string;
    phone: string;
    type: string;
    status: string; // 'active';
    createdAt: number;
    updatedAt: number;
  } | null;
  staffs?: {
    id: number;
    role: string; // station-manager
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

export type ApiSubstationCreateType = {
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  address: string;
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

export type ApiSubstationUpdateType = {
  name: string;
  email?: string;
  phone?: string;
  state: string;
  lga: string;
  address: string;
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

export type ApiGetTopSellingSubStationPaginatedType = ApiPaginatedResponseType<{
  id: number;
  name: string;
  state: string | null;
  lga: string | null;
  email: string;
  phone: string;
  address: string | null;
  allowSettlement: boolean;
  status: string; // "active",
  createdAt: number;
  updatedAt: number;
  companyId: number | null;
  salesCount: number;
  totalSales: number;
}>;

export type ApiGetSubstationPaginatedType = ApiPaginatedResponseType<ApiSubstationType>;
export type ApiGetSubstationDetailType = ApiResponseType<ApiSubstationDetailType>;
