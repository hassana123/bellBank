import type { SettlementType } from '~/types';

import type { ApiSettlementType } from '../types/settlement';

export function serializeSettlement(input: ApiSettlementType): SettlementType {
  const data: SettlementType = {
    id: input.id,
    amount: +input.amount,
    settledBy: input.settledBy ? { name: input.settledBy } : null,
    reference: input.reference,
    description: input.description || null,
    document: input.documentUrl ? { url: input.documentUrl } : null,
    type: input.settlementType,
    status: input.status,
    date: new Date(input.updatedAt),
    station: input.station
      ? {
          id: input.station.id,
          name: input.station.name,
          email: input.station.email || 'N/A',
          phone: input.station.phone || 'N/A',
        }
      : null,
  };

  return data;
}
