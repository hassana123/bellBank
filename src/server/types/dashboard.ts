import type { ApiResponseType } from './base';

export type ApiDashboardCardsResponseType = ApiResponseType<{
  totalSales: number;
  totalBusiness: number;
  totalStations: number;
  totalCards: number;
}>;
