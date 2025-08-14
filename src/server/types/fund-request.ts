import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiFundRequestType = {
  id: number;
  amount: number;
  documentUrl: string | null;
  description: string | null;
  status: string; // "pending",
  createdAt: number;
  updatedAt: number;
  businessId: number | null;
  companyId: number | null;
  business: {
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
  } | null;
};

export type ApiGetFundRequestPaginatedType = ApiPaginatedResponseType<ApiFundRequestType>;
export type ApiGetFundRequestDetailType = ApiResponseType<ApiFundRequestType>;
