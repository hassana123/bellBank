import { useQuery } from '@tanstack/react-query';

import * as DashboardService from '~/server/services/dashboard.service';
import type {
  DashboardActivityResponseType,
  DashboardCardsResponseType,
  DashboardTopSellingStationsType,
} from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ******* Queries ********

export function useGetDashboardCardsQuery(options?: { initialData?: DashboardCardsResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<DashboardCardsResponseType>({
    queryKey: [tags.Dashboard, { key: 'CARD_LIST' }],
    async queryFn() {
      return DashboardService.getCards({ token });
    },
    initialData,
  });

  return query;
}

export function useGetDashboardActivitiesQuery(options?: { initialData?: DashboardActivityResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<DashboardActivityResponseType>({
    queryKey: [tags.Dashboard, { key: 'ACTIVITIES' }],
    async queryFn() {
      return DashboardService.getActivities({ token });
    },
    initialData,
  });

  return query;
}

export function useGetDashboardTopSellingStationsQuery(options?: { initialData?: DashboardTopSellingStationsType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<DashboardTopSellingStationsType>({
    queryKey: [tags.Dashboard, { key: 'TOP_SELLING_STATIONS' }],
    async queryFn() {
      return DashboardService.getTopSellingStations({ token });
    },
    initialData,
  });

  return query;
}
