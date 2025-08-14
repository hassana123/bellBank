import type { FleetType } from '~/types';
import type { ApiFleetType } from '../types';

export function serializeFleet(input: ApiFleetType): FleetType {
  const data: FleetType = {
    id: input.id,
    driver: null,
    location: 'N/A',
    status: input.status,
    totalVehicles: input.totalVehicles,
    vehicle: input.name
      ? {
          model: input.name,
          numberPlate: 'N/A',
        }
      : null,
  };
  return data;
}
