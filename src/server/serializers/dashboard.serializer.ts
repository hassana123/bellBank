import type { DashboardCardsResponseType, DashboardTopSellingStationsType } from '~/types';
import type { ApiDashboardCardsResponseType, ApiGetTopSellingSubStationPaginatedType } from '../types';

export function serializeDashboardCards(
  input: ApiDashboardCardsResponseType['data']
): DashboardCardsResponseType['data'] {
  const data: DashboardCardsResponseType['data'] = {
    totalBusiness: input.totalBusiness,
    totalCards: input.totalCards,
    totalSales: input.totalSales,
    totalSubstation: input.totalStations,
  };

  return data;
}

export function serializeTopSellingStation(
  input: ApiGetTopSellingSubStationPaginatedType['data'][0]
): DashboardTopSellingStationsType['data'][0] {
  const data: DashboardTopSellingStationsType['data'][0] = {
    balance: input.totalSales,
    litresSold: input.salesCount.toLocaleString(),
    name: input.name,
    id: input.id,
  };

  return data;
}
