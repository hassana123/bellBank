import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as HoldingService from '~/server/services/holding.service';
import type {
  HoldingBalanceDashboardCardResponseType,
  HoldingBalanceType,
  MutationOptionsType,
  PaginatedHoldingBalanceResponseType,
  QueryListOptionsType,
  SettleHoldingBalanceRequestType,
  SingleHoldingBalanceResponseType,
} from '~/types';
import { handleAllErrors } from '~/utils/errors';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetHoldingBalanceDashboardCardsQuery(options?: {
  initialData?: HoldingBalanceDashboardCardResponseType;
}) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<HoldingBalanceDashboardCardResponseType>({
    queryKey: [tags.HoldingBalance, { key: 'DASHBOARD_CARDS' }],
    async queryFn() {
      return HoldingService.getHoldingBalanceDashboardCards({ token });
    },
    initialData,
  });

  return query;
}

export function useGetHoldingBalancesQuery(options?: {
  initialData?: PaginatedHoldingBalanceResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedHoldingBalanceResponseType>({
    queryKey: [tags.HoldingBalance, { key: 'BALANCE_LIST', filters }],
    async queryFn() {
      return HoldingService.getHoldingBalances({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetHoldingBalanceByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleHoldingBalanceResponseType;
  id?: HoldingBalanceType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleHoldingBalanceResponseType>({
    queryKey: [tags.HoldingBalance, { id }],
    enabled: !!id,
    async queryFn() {
      return HoldingService.getHoldingBalanceById({ token, id });
    },
    initialData,
  });

  return query;
}

// ******* Mutations *******
export function useSettleHoldingBalanceMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: SettleHoldingBalanceRequestType) {
      return HoldingService.settleHoldingBalance({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.HoldingBalance] });
      queryClient.invalidateQueries({ queryKey: [tags.Settlement] });
      options.onSuccess(response);
    },
    onError: options?.onError
      ? (err) => {
          if (options.onError) {
            const error = handleAllErrors(err);
            options.onError(error);
          }
        }
      : undefined,
  });

  return mutation;
}
