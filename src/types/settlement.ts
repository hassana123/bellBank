import type { PaginatedResponseType, QueryListOptionsType, ResponseType } from './base';
import type { SubstationType } from './substation';

export type SettlementQueryListOptionsType = QueryListOptionsType & {
  type?: string;
  stationId?: SubstationType['id'];
};

export const SettlementOptionType = {
  'Holding Balance': 'holding-balance',
};

export const SettlementStatus = {
  Failed: 'failed',
  Pending: 'pending',
  Successful: 'successful',
};

export type SettlementType = {
  id: number;
  amount: number;
  settledBy: { name: string } | null;
  description: string | null;
  reference: string;
  document: { url: string } | null;
  type: string;
  status: string;
  date: Date;
  station: {
    id: SubstationType['id'];
    name: string;
    email: string;
    phone: string;
  } | null;
};

export type SingleSettlementResponseType = ResponseType<SettlementType>;
export type PaginatedSettlementResponseType = PaginatedResponseType<SettlementType>;
