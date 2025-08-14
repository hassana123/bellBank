import type {
  FundRequestApprovalRequestType,
  FundRequestType,
  PaginatedFundRequestResponseType,
  QueryListOptionsType,
  ResponseType,
  SingleFundRequestResponseType,
} from '~/types';
import formatPrice from '~/utils/format-price';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as FundRequestSerializer from '../serializers/fund-request.serializer';
import type { ApiGetFundRequestDetailType, ApiGetFundRequestPaginatedType, ApiResponseType } from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse } from '../utils/response';

export async function getFundRequests({
  token,
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedFundRequestResponseType> {
  const url = createSearchUrl(routes.GET_FUND_REQUESTS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetFundRequestPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => FundRequestSerializer.serializeFundRequest(item)),
    },
    'Fetched Requests'
  );
}

export async function getFundRequestById({
  token,
  id,
}: {
  token: string;
  id: FundRequestType['id'];
}): Promise<SingleFundRequestResponseType> {
  const url = routes.GET_FUND_REQUEST_URL(id);
  const response = await HttpInstance.login(token)
    .get<ApiGetFundRequestDetailType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(FundRequestSerializer.serializeFundRequest(response.data), 'Fetched Request Detail');
}

export async function approveOrDenyFundRequest({
  token,
  data,
}: {
  token: string;
  data: FundRequestApprovalRequestType;
}): Promise<ResponseType> {
  const url = routes.APPROVE_DENY_FUND_REQUEST_URL(data.fundRequestId);
  const response = await HttpInstance.login(token)
    .put<ApiResponseType>(url, {
      action: data.action === 'approve' ? 'approved' : 'rejected',
      remark: data.reason,
    })
    .then((response) => response.data);

  return NewSuccessDataResponse(
    response.data,
    data.action === 'approve'
      ? `You have successfully approved the request for ${formatPrice(data.amount).value}`
      : `You have successfully denied the request for ${formatPrice(data.amount).value}`
  );
}
