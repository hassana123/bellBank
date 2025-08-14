import type { HoldingBalanceDashboardCardResponseType, HoldingBalanceType } from '~/types';
import type { ApiHoldingBalanceDashboardCardsType, ApiSubstationType } from '../types';

export function serializeHoldingBalanceFromSubstation(input: ApiSubstationType): HoldingBalanceType {
  const amount = input.wallet?.holdingBalance || 0;
  const data: HoldingBalanceType = {
    id: input.id,
    amount,
    date: new Date(input.wallet?.updatedAt || input.updatedAt),
    status: amount > 0 ? 'pending' : 'settled',
    substation: {
      id: input.id,
      email: input.email || 'N/A',
      name: input.name,
    },
  };
  return data;
}

export function serializeHoldingBalanceCards(
  input: ApiHoldingBalanceDashboardCardsType['data']
): HoldingBalanceDashboardCardResponseType['data'] {
  const data: HoldingBalanceDashboardCardResponseType['data'] = {
    pendingHoldingBalance: input.pendingHoldingBalance,
    settledHoldingBalance: input.settledHoldingBalance,
    totalHoldingBalance: input.holdingBalance,
  };

  return data;
}
