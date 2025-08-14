import {
  ProductCode,
  type CreateSubstationResponseType,
  type CreateSubstationType,
  type PaginatedSubstationResponseType,
  type PaginatedSubstationTransactionResponseType,
  type QueryListOptionsType,
  type ResponseType,
  type SingleSubstationResponseType,
  type SingleSubstationTransactionResponseType,
  type SubstationDashboardCardResponseType,
  type SubstationDetailDashboardCardResponseType,
  type SubstationTransactionQueryListOptionsType,
  type SubstationType,
  type UpdateSubstationType,
} from '~/types';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as SubstationSerializer from '../serializers/substation.serializer';
import * as TransactionSerializer from '../serializers/transaction.serializer';
import type {
  ApiGetProductPaginatedType,
  ApiGetSubstationDetailType,
  ApiGetSubstationPaginatedType,
  ApiGetTransactionDetailType,
  ApiGetTransactionPaginatedType,
  ApiSubstationDashboardCardsType,
  ApiSubstationDetailDashboardCardsType,
} from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

export async function getSubstationDashboardCards({
  token,
}: {
  token: string;
}): Promise<SubstationDashboardCardResponseType> {
  const response = await HttpInstance.login(token)
    .get<ApiSubstationDashboardCardsType>(routes.GET_SUBSTATION_DASHBOARD_CARDS_URL)
    .then((response) => response.data);
  return NewSuccessDataResponse(
    SubstationSerializer.serializeSubstationsDashboardCards(response.data),
    'Fetched Cards'
  );
}

export async function getSubstationDetailDashboardCards({
  token,
  id,
}: {
  token: string;
  id: SubstationType['id'];
}): Promise<SubstationDetailDashboardCardResponseType> {
  const [substationDetailResponse, petrolResponse, dieselResponse, keroseneResponse] = await Promise.all([
    HttpInstance.login(token)
      .get<ApiSubstationDetailDashboardCardsType>(routes.GET_SUBSTATION_DETAIL_DASHBOARD_CARDS_URL(id))
      .then((response) => response.data),
    HttpInstance.login(token)
      .get<ApiGetProductPaginatedType>(routes.GET_PRODUCTS_URL + `?code=${ProductCode.PMS}`)
      .then((response) => response.data),
    HttpInstance.login(token)
      .get<ApiGetProductPaginatedType>(routes.GET_PRODUCTS_URL + `?code=${ProductCode.LPG}`)
      .then((response) => response.data),
    HttpInstance.login(token)
      .get<ApiGetProductPaginatedType>(routes.GET_PRODUCTS_URL + `?code=${ProductCode.DPK}`)
      .then((response) => response.data),
  ]);

  const result: SubstationDetailDashboardCardResponseType['data'] = {
    holdingBalance: +substationDetailResponse.data.holdngBalance,
    totalSales: +substationDetailResponse.data.totalSalesAmount,
    dieselPrice: +dieselResponse.data[0]?.price,
    petrolPrice: +petrolResponse.data[0]?.price,
    kerosenePrice: +keroseneResponse.data[0]?.price,
  };

  return NewSuccessDataResponse(result, 'Fetched Cards');
}

export async function getSubstations({
  token,
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedSubstationResponseType> {
  const url = createSearchUrl(routes.GET_SUBSTATIONS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetSubstationPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => SubstationSerializer.serializeSubstation(item)),
    },
    'Fetched Substations'
  );
}

export async function getSubstationById({
  token,
  id,
}: {
  token: string;
  id: SubstationType['id'];
}): Promise<SingleSubstationResponseType> {
  const url = routes.GET_SUBSTATION_URL(id);
  const response = await HttpInstance.login(token)
    .get<ApiGetSubstationDetailType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(
    SubstationSerializer.serializeSubstationDetail(response.data),
    'Fetched Substation Detail'
  );
}

export async function createSubstation({
  token,
  data,
}: {
  token: string;
  data: CreateSubstationType;
}): Promise<CreateSubstationResponseType> {
  const input = SubstationSerializer.serializeCreateSubstationInput(data);
  await HttpInstance.login(token).post(routes.CREATE_SUBSTATION_URL, input);

  return NewSuccessResponse('You have successfully added a new substation.');
}

export async function updateSubstation({
  token,
  id,
  data,
}: {
  token: string;
  id: SubstationType['id'];
  data: UpdateSubstationType;
}): Promise<CreateSubstationResponseType> {
  const input = SubstationSerializer.serializeUpdateSubstationInput(data);
  await HttpInstance.login(token).put(routes.UPDATE_SUBSTATION_URL(id), input);

  return NewSuccessResponse('You have successfully updated this substation data.');
}

export async function deleteSubstation(_: { token: string; id: SubstationType['id'] }): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: 'Substation Deleted.',
      });
    }, 2000);
  });
}

// ****** Sub station Transactions ********
export async function getSubstationTransactions({
  token,
  filters,
}: {
  token: string;
  filters: SubstationTransactionQueryListOptionsType;
}): Promise<PaginatedSubstationTransactionResponseType> {
  const url = createSearchUrl(routes.GET_SUBSTATION_TRANSACTIONS_URL(filters.stationId), filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetTransactionPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => TransactionSerializer.serializeSubstationTransaction(item)),
    },
    'Fetched Transactions'
  );
}

export async function getSubstationTransactionByReference({
  token,
  reference,
}: {
  token: string;
  reference: string;
}): Promise<SingleSubstationTransactionResponseType> {
  const url = routes.GET_TRANSACTION_BY_REFERENCE_URL(reference);
  const response = await HttpInstance.login(token)
    .get<ApiGetTransactionDetailType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(
    TransactionSerializer.serializeSubstationTransaction(response.data),
    'Fetched Transaction Detail'
  );
}
