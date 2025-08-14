import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiSettlementType = {
  id: number;
  settledBy: string; // "company",
  description: string | null;
  reference: string;
  documentUrl?: string;
  settlementType: string; //  "holding-balance",
  amount: number;
  status: string; // "successful",
  createdAt: number;
  updatedAt: number;
  stationId: number | null;
  companyId: number | null;
  station: {
    id: number;
    name: string;
    state: string | null;
    lga: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    status: string; // 'active';
    createdAt: number;
    updatedAt: number;
    companyId: number | null;
  } | null;
};

export type ApiGetSettlementPaginatedType = ApiPaginatedResponseType<ApiSettlementType>;
export type ApiGetSettlementDetailType = ApiResponseType<ApiSettlementType>;
