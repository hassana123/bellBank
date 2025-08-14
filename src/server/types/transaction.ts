import type { ApiPaginatedResponseType, ApiResponseType } from './base';

export type ApiTransactionType = {
  details: {
    id: number;
    amount: number;
    documentUrl: string | null;
    description: string | null;
    status: string; // 'pending';
    createdAt: number;
    updatedAt: number;
    businessId: number | null;
    companyId: number | null;
  } | null;
  createdAt: string;
  responseData: Record<string, unknown>;
  id: number;
  amount: string;
  description: string | null;
  remark: string | null;
  responseMessage: string | null;
  charge: string;
  netAmount: string | null;
  channel: string | null; // 'wallet';
  channelReference: string | null;
  reference: string;
  transactionType: string | null;
  status: string; // 'successful';
  statusCode: number | null;
  category: string | null;
  type: string; // 'fund-request';
  action: 'credit' | 'debit'; // 'debit';
  completedAt: number | null;
  updatedAt: number;
  businessId: number | null;
  stationId: number | null;
  companyId: number | null;
  fundRequestId: number | null;
  driverId: number | null;
  staffId: number | null;
  salesId: number | null;
  nfcId: number | null;
};

export type ApiGetTransactionPaginatedType = ApiPaginatedResponseType<ApiTransactionType>;
export type ApiGetTransactionDetailType = ApiResponseType<ApiTransactionType>;

// ******* Holding Balance

export type ApiHoldingBalanceDashboardCardsType = ApiResponseType<{
  holdingBalance: number;
  settledHoldingBalance: number;
  pendingHoldingBalance: number;
}>;
