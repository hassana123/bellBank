import type {
  CardQueryListOptionsType,
  CardRequestApprovalRequestType,
  CardType,
  PaginatedCardRequestResponseType,
  PaginatedCardResponseType,
  QueryListOptionsType,
  ResponseType,
  SingleCardRequestResponseType,
  SingleCardResponseType,
} from '~/types';
import { AppError } from '~/utils/errors';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as CardSerializer from '../serializers/card.serializer';
import type { ApiGetCardDetailType, ApiGetCardPaginatedType, ApiGetCardRequestPaginatedType } from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

export async function getCards({
  token,
  filters,
}: {
  token: string;
  filters?: CardQueryListOptionsType;
}): Promise<PaginatedCardResponseType> {
  const url = createSearchUrl(routes.GET_CARDS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetCardPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => CardSerializer.serializeCard(item)),
    },
    'Fetched Cards'
  );
}

export async function getCardById({
  token,
  id,
}: {
  token: string;
  id: CardType['id'];
}): Promise<SingleCardResponseType> {
  const url = routes.GET_CARD_URL(id);
  const response = await HttpInstance.login(token)
    .get<ApiGetCardDetailType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(CardSerializer.serializeCard(response.data), 'Fetched Card Detail');
}

export async function getCardRequests({
  token,
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedCardRequestResponseType> {
  const url = createSearchUrl(routes.GET_CARD_REQUESTS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetCardRequestPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => CardSerializer.serializeCardRequest(item)),
    },
    'Fetched Card Requests'
  );
}

export async function getCardRequestById({
  id: _,
}: {
  token: string;
  id: CardType['id'];
}): Promise<SingleCardRequestResponseType> {
  throw new AppError(500);
}

export async function approveOrDenyCardRequest({
  token,
  data,
}: {
  token: string;
  data: CardRequestApprovalRequestType;
}): Promise<ResponseType> {
  const input = CardSerializer.serializeCardRequestApproveOrDenyInput(data);
  const url = routes.APPROVE_OR_DENY_CARD_REQUEST_URL(data.cardRequestId);
  await HttpInstance.login(token)
    .put(url, input)
    .then((response) => response.data);

  return NewSuccessResponse(
    data.action === 'approve'
      ? 'You have successfully approved the request for these cards.'
      : 'You have successfully denied the request for these cards.'
  );
}
