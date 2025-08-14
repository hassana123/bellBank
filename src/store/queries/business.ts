import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as BusinessService from '~/server/services/business.service';
import type {
  BusinessDashboardCardResponseType,
  BusinessDetailDashboardCardResponseType,
  BusinessTransactionQueryListOptionsType,
  BusinessType,
  CreateBusinessResponseType,
  CreateBusinessType,
  MutationOptionsType,
  PaginatedBusinessResponseType,
  PaginatedTransactionResponseType,
  QueryListOptionsType,
  SingleBusinessResponseType,
  ToggleBusinessStatusType,
  UpdateBusinessResponseType,
  UpdateBusinessType,
} from '~/types';
import { handleAllErrors } from '~/utils/errors';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetBusinessDashboardCardsQuery(options?: { initialData?: BusinessDashboardCardResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<BusinessDashboardCardResponseType>({
    queryKey: [tags.Business, { key: 'DASHBOARD_CARDS' }],
    async queryFn() {
      return BusinessService.getBusinessDashboardCards({ token });
    },
    initialData,
  });

  return query;
}

export function useGetBusinessDetailDashboardCardsQuery(options?: {
  initialData?: BusinessDetailDashboardCardResponseType;
  id?: BusinessType['id'];
}) {
  const { initialData, id = 0 } = options || {};
  const { token } = useUserContext();

  const query = useQuery<BusinessDetailDashboardCardResponseType>({
    queryKey: [tags.Business, { key: 'DETAIL_DASHBOARD_CARDS', id }],
    enabled: !!id,
    async queryFn() {
      return BusinessService.getBusinessDetailDashboardCards({ token, id });
    },
    initialData,
  });

  return query;
}

export function useGetBusinessesQuery(options?: {
  initialData?: PaginatedBusinessResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedBusinessResponseType>({
    queryKey: [tags.Business, { key: 'TRANSACTION_LIST', filters }],
    async queryFn() {
      return BusinessService.getBusinesses({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetBusinessByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleBusinessResponseType;
  id?: BusinessType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleBusinessResponseType>({
    queryKey: [tags.Business, { id }],
    enabled: !!id,
    async queryFn() {
      return BusinessService.getBusinessById({ token, id });
    },
    initialData,
  });

  return query;
}

export function useGetBusinessTransactionsQuery(options: {
  initialData?: PaginatedTransactionResponseType;
  filters: BusinessTransactionQueryListOptionsType;
}) {
  const { initialData, filters } = options;
  const { token } = useUserContext();

  const query = useQuery<PaginatedTransactionResponseType>({
    queryKey: [tags.Business, { key: 'TRANSACTION_LIST', filters }],
    async queryFn() {
      return BusinessService.getBusinessTransactions({ filters, token });
    },
    initialData,
  });

  return query;
}

// ****** Mutations *******

export function useCreateBusinessMutation(options: MutationOptionsType<CreateBusinessResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: CreateBusinessType) {
      return BusinessService.createBusiness({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Business] });
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

export function useEditBusinessMutation(options: MutationOptionsType<UpdateBusinessResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn({ id, data }: { data: UpdateBusinessType; id: BusinessType['id'] }) {
      return BusinessService.updateBusiness({ data, id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Business] });
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

export function useDeleteBusinessMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(id: BusinessType['id']) {
      return BusinessService.deleteBusiness({ id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Business] });
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

export function useToggleBusinessStatusMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: ToggleBusinessStatusType) {
      return BusinessService.toggleBusinessStatus({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Business] });
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
