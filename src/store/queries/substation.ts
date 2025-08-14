import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as SubstationService from '~/server/services/substation.service';
import type {
  CreateSubstationResponseType,
  CreateSubstationType,
  MutationOptionsType,
  PaginatedSubstationResponseType,
  PaginatedSubstationTransactionResponseType,
  QueryListOptionsType,
  SingleSubstationResponseType,
  SingleSubstationTransactionResponseType,
  SubstationDashboardCardResponseType,
  SubstationDetailDashboardCardResponseType,
  SubstationTransactionQueryListOptionsType,
  SubstationType,
  UpdateSubstationType,
} from '~/types';
import { handleAllErrors } from '~/utils/errors';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetSubstationDashboardCardsQuery(options?: { initialData?: SubstationDashboardCardResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<SubstationDashboardCardResponseType>({
    queryKey: [tags.Substation, { key: 'DASHBOARD_CARDS' }],
    async queryFn() {
      return SubstationService.getSubstationDashboardCards({ token });
    },
    initialData,
  });

  return query;
}

export function useGetSubstationDetailDashboardCardsQuery(options?: {
  initialData?: SubstationDetailDashboardCardResponseType;
  id?: SubstationType['id'];
}) {
  const { initialData, id = 0 } = options || {};
  const { token } = useUserContext();

  const query = useQuery<SubstationDetailDashboardCardResponseType>({
    queryKey: [tags.Substation, { key: 'DETAIL_DASHBOARD_CARDS', id }],
    enabled: !!id,
    async queryFn() {
      return SubstationService.getSubstationDetailDashboardCards({ token, id });
    },
    initialData,
  });

  return query;
}

export function useGetSubstationsQuery(options?: {
  initialData?: PaginatedSubstationResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedSubstationResponseType>({
    queryKey: [tags.Substation, { key: 'SUBSTATION_LIST', filters }],
    async queryFn() {
      return SubstationService.getSubstations({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetSubstationByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleSubstationResponseType;
  id?: SubstationType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleSubstationResponseType>({
    queryKey: [tags.Substation, { id }],
    enabled: !!id,
    async queryFn() {
      return SubstationService.getSubstationById({ token, id });
    },
    initialData,
  });

  return query;
}

export function useGetSubstationTransactionsQuery(options: {
  initialData?: PaginatedSubstationTransactionResponseType;
  filters: SubstationTransactionQueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedSubstationTransactionResponseType>({
    queryKey: [tags.SubstationTransaction, { key: 'TRANSACTION_LIST', filters }],
    async queryFn() {
      return SubstationService.getSubstationTransactions({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetSubstationTransactionByReferenceQuery({
  initialData,
  reference = '',
}: {
  initialData?: SingleSubstationTransactionResponseType;
  reference?: string;
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleSubstationTransactionResponseType>({
    queryKey: [tags.SubstationTransaction, { reference }],
    enabled: !!reference,
    async queryFn() {
      return SubstationService.getSubstationTransactionByReference({ token, reference });
    },
    initialData,
  });

  return query;
}

// ****** Mutations *******

export function useCreateSubstationMutation(options: MutationOptionsType<CreateSubstationResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: CreateSubstationType) {
      return SubstationService.createSubstation({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Substation] });
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

export function useEditSubstationMutation(options: MutationOptionsType<CreateSubstationResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn({ id, data }: { data: UpdateSubstationType; id: SubstationType['id'] }) {
      return SubstationService.updateSubstation({ data, id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Substation] });
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

export function useDeleteSubstationMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(id: SubstationType['id']) {
      return SubstationService.deleteSubstation({ id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Substation] });
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
