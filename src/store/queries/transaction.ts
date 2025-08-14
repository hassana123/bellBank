import { useQuery } from '@tanstack/react-query';

import * as TransactionService from '~/server/services/transaction.service';
import type {
  PaginatedTransactionResponseType,
  SingleTransactionResponseType,
  TransactionQueryListOptionsType,
} from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetTransactionsQuery(options?: {
  initialData?: PaginatedTransactionResponseType;
  filters?: TransactionQueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedTransactionResponseType>({
    queryKey: [tags.Transaction, { key: 'TRANSACTION_LIST', filters }],
    async queryFn() {
      return TransactionService.getTransactions({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetTransactionByReferenceQuery({
  initialData,
  reference = '',
}: {
  initialData?: SingleTransactionResponseType;
  reference?: string;
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleTransactionResponseType>({
    queryKey: [tags.Transaction, { reference }],
    enabled: !!reference,
    async queryFn() {
      return TransactionService.getTransactionByReference({ token, reference });
    },
    initialData,
  });

  return query;
}
