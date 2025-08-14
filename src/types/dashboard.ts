import type { ResponseType } from './base';

export type DashboardCardsResponseType = ResponseType<{
  totalSales?: number;
  totalBusiness?: number;
  totalSubstation?: number;
  totalCards?: number;
}>;

export type DashboardActivityResponseType = ResponseType<
  {
    id: string;
    message: string;
    date: Date;
    actionBy: string;
  }[]
>;

export type DashboardTopSellingStationsType = ResponseType<
  {
    id: number;
    name: string;
    balance: number;
    litresSold: string;
  }[]
>;
