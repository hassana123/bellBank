import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiCardType = {
  id: number;
  serialNumber: string;
  type: string | null;
  cardNumber: string | null;
  cvv: string | null;
  status: string; // "assigned",
  createdAt: number;
  updatedAt: number;
  companyId: number | null;
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
    type: string | null;
    status: string; // "active",
    createdAt: number;
    updatedAt: number;
  } | null;
  nfc: {
    product: string[];
    id: number;
    serialNumber: string;
    name: string;
    useType: string; // "specific",
    cardNumber: string | null;
    cvv: string | null;
    status: string; // "active"
    createdAt: number;
    updatedAt: number;
    businessId: number | null;
    nfcRepoId: number | null;
    driverId: number | null;
  } | null;
};

export type ApiGetCardPaginatedType = ApiPaginatedResponseType<ApiCardType>;
export type ApiGetCardDetailType = ApiResponseType<ApiCardType>;

// ******** Card Request *************

export type ApiCardRequestType = {
  id: number;
  requestedBy: string;
  rejectReason?: string;
  quantity: number;
  status: string; // "requested",
  createdAt: number;
  updatedAt: number;
  businessId: number | null;
  stationId: number | null;
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

export type ApiGetCardRequestPaginatedType = ApiPaginatedResponseType<ApiCardRequestType>;
export type ApiApproveOrDenyCardRequestType = { action: 'approved' } | { action: 'rejected'; rejectReason: string };
