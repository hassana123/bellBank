import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiFleetType = {
  id: number;
  name: string;
  code: string;
  description: string | null;
  totalVehicles: number;
  status: string; // "active",
  createdAt: number;
  updatedAt: number;
  businessId: number | null;
  business: {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
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

export type ApiGetFleetPaginatedType = ApiPaginatedResponseType<ApiFleetType>;
export type ApiGetFleetDetailType = ApiResponseType<ApiFleetType>;
