import { useQuery } from '@tanstack/react-query';

import * as SettlementService from '~/server/services/settlement.service';
import type { PaginatedSettlementResponseType, SettlementQueryListOptionsType } from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetSettlementsQuery(options?: {
  initialData?: PaginatedSettlementResponseType;
  filters?: SettlementQueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedSettlementResponseType>({
    queryKey: [tags.Settlement, { key: 'SETTLEMENT_LIST', filters }],
    async queryFn() {
      return SettlementService.getSettlements({ filters, token });
    },
    initialData,
  });

  return query;
}
