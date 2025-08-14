import type {
  BusinessDashboardCardResponseType,
  BusinessDetailDashboardCardResponseType,
  BusinessTransactionQueryListOptionsType,
  BusinessType,
  CreateBusinessResponseType,
  CreateBusinessType,
  PaginatedBusinessResponseType,
  PaginatedTransactionResponseType,
  QueryListOptionsType,
  ResponseType,
  SingleBusinessResponseType,
  ToggleBusinessStatusType,
  UpdateBusinessResponseType,
  UpdateBusinessType,
} from '~/types';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as BusinessSerializer from '../serializers/business.serializer';
import * as TransactionSerializer from '../serializers/transaction.serializer';
import * as FileService from '../services/file.service';
import type {
  ApiBusinessDashboardCardsType,
  ApiBusinessDetailDashboardCardsType,
  ApiGetBusinessDetailType,
  ApiGetBusinessPaginatedType,
  ApiGetTransactionPaginatedType,
} from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

export async function getBusinessDashboardCards({
  token,
}: {
  token: string;
}): Promise<BusinessDashboardCardResponseType> {
  const response = await HttpInstance.login(token)
    .get<ApiBusinessDashboardCardsType>(routes.GET_BUSINESS_DASHBOARD_CARDS_URL)
    .then((response) => response.data);
  return NewSuccessDataResponse(BusinessSerializer.serializeBusinessDashboardCards(response.data), 'Fetched Cards');
}

export async function getBusinessDetailDashboardCards({
  token,
  id,
}: {
  token: string;
  id: BusinessType['id'];
}): Promise<BusinessDetailDashboardCardResponseType> {
  const response = await HttpInstance.login(token)
    .get<ApiBusinessDetailDashboardCardsType>(routes.GET_BUSINESS_DETAIL_DASHBOARD_CARDS_URL(id))
    .then((response) => response.data);
  return NewSuccessDataResponse(
    BusinessSerializer.serializeBusinessDetailDashboardCards(response.data),
    'Fetched Detail Cards'
  );
}

export async function getBusinesses({
  token,
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedBusinessResponseType> {
  const url = createSearchUrl(routes.GET_BUSINESS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetBusinessPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => BusinessSerializer.serializeBusiness(item)),
    },
    'Fetched Business'
  );
}

export async function getBusinessById({
  token,
  id,
}: {
  token: string;
  id: BusinessType['id'];
}): Promise<SingleBusinessResponseType> {
  const url = routes.GET_BUSINESS_DETAIL_URL(id);
  const response = await HttpInstance.login(token)
    .get<ApiGetBusinessDetailType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(BusinessSerializer.serializeBusiness(response.data), 'Fetched Business Detail');
}

export async function createBusiness({
  token,
  data,
}: {
  token: string;
  data: CreateBusinessType;
}): Promise<CreateBusinessResponseType> {
  const input = BusinessSerializer.serializeCreateBusinessInput(data);
  // Upload File
  if (((data.logo && data.logo.length) || 0) > 0) {
    const fileData = await FileService.uploadFile({ token, file: (data.logo || [])[0] }).then(
      (response) => response.data
    );
    input.logo = fileData.url;
  }
  await HttpInstance.login(token).post(routes.CREATE_BUSINESS_URL, input);

  return NewSuccessResponse('You have successfully added a new business');
}

export async function updateBusiness({
  token,
  id,
  data,
}: {
  token: string;
  id: BusinessType['id'];
  data: UpdateBusinessType;
}): Promise<UpdateBusinessResponseType> {
  const input = BusinessSerializer.serializeUpdateBusinessInput(data);
  // Upload File
  if (((data.logo && data.logo.length) || 0) > 0) {
    const fileData = await FileService.uploadFile({ token, file: (data.logo || [])[0] }).then(
      (response) => response.data
    );
    input.logo = fileData.url;
  }
  await HttpInstance.login(token).put(routes.UPDATE_BUSINESS_URL(id), input);

  return NewSuccessResponse('You have successfully updated this business data.');
}

export async function deleteBusiness(_: { token: string; id: BusinessType['id'] }): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: 'Business Deleted.',
      });
    }, 2000);
  });
}

export async function toggleBusinessStatus({
  data,
}: {
  token: string;
  data: ToggleBusinessStatusType;
}): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: data.action === 'suspend' ? 'Business Suspended.' : 'Business Activated.',
      });
    }, 2000);
  });
}

export async function getBusinessTransactions({
  token,
  filters,
}: {
  token: string;
  filters: BusinessTransactionQueryListOptionsType;
}): Promise<PaginatedTransactionResponseType> {
  const url = createSearchUrl(routes.GET_BUSINESS_TRANSACTIONS_URL(filters.businessId), filters);
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
