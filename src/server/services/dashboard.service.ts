import type {
  DashboardActivityResponseType,
  DashboardCardsResponseType,
  DashboardTopSellingStationsType,
} from '~/types';
import { handleAllErrors } from '~/utils/errors';
import HttpInstance from '~/utils/http';
import * as routes from '../config/routes';
import * as DashboardSerializer from '../serializers/dashboard.serializer';
import type { ApiDashboardCardsResponseType, ApiGetTopSellingSubStationPaginatedType } from '../types';
import { NewSuccessDataResponse } from '../utils/response';
import { createSearchUrl } from '../utils/params';

export async function getCards({ token }: { token: string }): Promise<DashboardCardsResponseType> {
  const response = await HttpInstance.login(token)
    .get<ApiDashboardCardsResponseType>(routes.GET_DASHBOARD_CARDS_URL)
    .then((response) => response.data);

  return NewSuccessDataResponse(DashboardSerializer.serializeDashboardCards(response.data));
}

export async function getTopSellingStations({ token }: { token: string }): Promise<DashboardTopSellingStationsType> {
  const url = createSearchUrl(routes.GET_TOP_SELLING_STATIONS_URL, { limit: 4 });
  const response = await HttpInstance.login(token)
    .get<ApiGetTopSellingSubStationPaginatedType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(response.data.map((item) => DashboardSerializer.serializeTopSellingStation(item)));
}

export async function getActivities(_: { token: string }): Promise<DashboardActivityResponseType> {
  return new Promise((resolve, reject) => {
    try {
      const currentDate = new Date();
      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Fetched Activities',
          data: [
            {
              id: '1',
              message: 'created a new user',
              date: new Date(currentDate.getTime() - 1000 * 60 * 60 * 5),
              actionBy: 'Michael',
            },
            {
              id: '2',
              message: 'added 25 new sub-stations.',
              date: new Date(currentDate.getTime() - 1000 * 60 * 60 * 2),
              actionBy: 'You',
            },
            {
              id: '3',
              message: 'added a new user',
              date: new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 7),
              actionBy: 'Rizal Fiat',
            },
            {
              id: '4',
              message: 'edit HIPS details',
              date: new Date(currentDate.getTime() - 1000 * 60 * 60 * 9),
              actionBy: 'Rizal Fiat',
            },
            {
              id: '5',
              message: 'created a new user',
              date: new Date(currentDate.getTime() - 1000 * 60 * 60 * 5),
              actionBy: 'You',
            },
          ],
        });
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}
