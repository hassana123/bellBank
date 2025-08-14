import type { ApiPaginatedResponseType } from './base';

export type ApiProductType = {
  id: number;
  title: string;
  code: string; // pms, lpg, dpk
  price: number;
  unit: string; // kg, liter
  status: string; // active
  createdAt: number;
  updatedAt: number;
  stationId: number | null;
  station: {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    state: string | null;
    lga: string | null;
    address: string | null;
    allowSettlement: boolean;
    status: string | null;
    createdAt: number;
    updatedAt: number;
    companyId: number | null;
  } | null;
};

export type ApiGetProductPaginatedType = ApiPaginatedResponseType<ApiProductType>;
