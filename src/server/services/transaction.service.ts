import type {
  PaginatedTransactionResponseType,
  TransactionQueryListOptionsType,
  SingleTransactionResponseType,
} from '~/types';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as TransactionSerializer from '../serializers/transaction.serializer';
import type { ApiGetTransactionDetailType, ApiGetTransactionPaginatedType } from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse } from '../utils/response';

export async function getTransactions({
  token,
  filters,
}: {
  token: string;
  filters?: TransactionQueryListOptionsType;
}): Promise<PaginatedTransactionResponseType> {
  const url = createSearchUrl(routes.GET_TRANSACTIONS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetTransactionPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => TransactionSerializer.serializeTransaction(item)),
    },
    'Fetched Transactions'
  );
}

export async function getTransactionByReference({
  token,
  reference,
}: {
  token: string;
  reference: string;
}): Promise<SingleTransactionResponseType> {
  const url = routes.GET_TRANSACTION_BY_REFERENCE_URL(reference);
  const response = await HttpInstance.login(token)
    .get<ApiGetTransactionDetailType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(
    TransactionSerializer.serializeTransaction(response.data),
    'Fetched Transaction Detail'
  );
}
