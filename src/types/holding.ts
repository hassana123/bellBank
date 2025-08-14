import type { PaginatedResponseType, ResponseType } from './base';
import type { SubstationType } from './substation';

export const HoldingBalanceStatus = {
  Pending: 'pending',
  Settled: 'settled',
};

export type HoldingBalanceType = {
  id: number;
  substation: {
    id: SubstationType['id'];
    name: SubstationType['name'];
    email: SubstationType['email'];
  } | null;
  amount: number;
  date: Date;
  status: string;
};

export type HoldingBalanceDashboardCardResponseType = ResponseType<{
  totalHoldingBalance?: number;
  settledHoldingBalance?: number;
  pendingHoldingBalance?: number;
}>;

export type PaginatedHoldingBalanceResponseType = PaginatedResponseType<HoldingBalanceType>;
export type SingleHoldingBalanceResponseType = ResponseType<HoldingBalanceType>;
export type SettleHoldingBalanceRequestType = {
  stationId: SubstationType['id'];
  amount: number;
  stationName: string;
};
