import type {
  HoldingBalanceDashboardCardResponseType,
  HoldingBalanceType,
  PaginatedHoldingBalanceResponseType,
  QueryListOptionsType,
  ResponseType,
  SettleHoldingBalanceRequestType,
  SingleHoldingBalanceResponseType,
} from '~/types';
import { formatPrice } from '~/utils';
import { AppError } from '~/utils/errors';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as HoldingSerializer from '../serializers/holding.serializer';
import type { ApiGetSubstationPaginatedType, ApiHoldingBalanceDashboardCardsType } from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

export async function getHoldingBalanceDashboardCards({
  token,
}: {
  token: string;
}): Promise<HoldingBalanceDashboardCardResponseType> {
  const response = await HttpInstance.login(token)
    .get<ApiHoldingBalanceDashboardCardsType>(routes.GET_HOLDING_BALANCE_CARDS_URL)
    .then((response) => response.data);
  return NewSuccessDataResponse(HoldingSerializer.serializeHoldingBalanceCards(response.data), 'Fetched Cards');
}

export async function getHoldingBalances({
  token,
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedHoldingBalanceResponseType> {
  const url = createSearchUrl(routes.GET_SUBSTATIONS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetSubstationPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => HoldingSerializer.serializeHoldingBalanceFromSubstation(item)),
    },
    'Fetched Holding Balance'
  );
}

export async function getHoldingBalanceById({
  id: _,
}: {
  token: string;
  id: HoldingBalanceType['id'];
}): Promise<SingleHoldingBalanceResponseType> {
  throw new AppError(500);
}

export async function settleHoldingBalance({
  token,
  data,
}: {
  token: string;
  data: SettleHoldingBalanceRequestType;
}): Promise<ResponseType> {
  const url = routes.SETTLE_HOLDING_BALANCE_URL(data.stationId);
  await HttpInstance.login(token).post(url, { description: '' });

  return NewSuccessResponse(
    `You have successfully settled ${formatPrice(data.amount).value} from ${data.stationName}.`
  );
}
