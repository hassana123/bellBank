import type {
  FleetQueryListOptionsType,
  FleetType,
  PaginatedFleetResponseType,
  SingleFleetResponseType,
} from '~/types';
import { AppError, handleAllErrors } from '~/utils/errors';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as FleetSerializer from '../serializers/fleet.serializer';
import type { ApiGetFleetPaginatedType } from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse } from '../utils/response';

export async function getFleets({
  filters,
  token,
}: {
  token: string;
  filters: FleetQueryListOptionsType;
}): Promise<PaginatedFleetResponseType> {
  const url = createSearchUrl(routes.GET_BUSINESS_FLEETS_URL(filters.businessId), filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetFleetPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => FleetSerializer.serializeFleet(item)),
    },
    'Fetched Fleets'
  );
}

export async function getFleetById(_: { token: string; id: FleetType['id'] }): Promise<SingleFleetResponseType> {
  return new Promise((__, reject) => {
    try {
      setTimeout(() => {
        throw new AppError(500, 'Endpoint Yet To Be Implemented');
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}
