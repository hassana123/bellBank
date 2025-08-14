import type { SettlementQueryListOptionsType, PaginatedSettlementResponseType } from '~/types';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as SettlementSerializer from '../serializers/settlement.serializer';
import type { ApiGetSettlementPaginatedType } from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse } from '../utils/response';

export async function getSettlements({
  token,
  filters,
}: {
  token: string;
  filters?: SettlementQueryListOptionsType;
}): Promise<PaginatedSettlementResponseType> {
  const url = createSearchUrl(routes.GET_SETTLEMENTS_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetSettlementPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => SettlementSerializer.serializeSettlement(item)),
    },
    'Fetched Settlements'
  );
}
