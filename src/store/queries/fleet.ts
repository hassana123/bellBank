import { useQuery } from '@tanstack/react-query';

import * as FleetService from '~/server/services/fleet.service';
import type {
  FleetQueryListOptionsType,
  FleetType,
  PaginatedFleetResponseType,
  SingleFleetResponseType,
} from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetFleetsQuery(options: {
  initialData?: PaginatedFleetResponseType;
  filters: FleetQueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedFleetResponseType>({
    queryKey: [tags.Fleet, { key: 'FLEET_LIST', filters }],
    async queryFn() {
      return FleetService.getFleets({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetFleetByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleFleetResponseType;
  id?: FleetType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleFleetResponseType>({
    queryKey: [tags.Fleet, { id }],
    enabled: !!id,
    async queryFn() {
      return FleetService.getFleetById({ token, id });
    },
    initialData,
  });

  return query;
}
