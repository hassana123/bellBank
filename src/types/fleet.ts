import type { PaginatedResponseType, QueryListOptionsType, ResponseType } from './base';
import type { BusinessType } from './business';

export type FleetQueryListOptionsType = QueryListOptionsType & {
  businessId: BusinessType['id'];
};

export const FleetStatus = {
  Active: 'active',
  Inactive: 'inactive',
};

export type FleetType = {
  id: number;
  driver: { name: string } | null;
  vehicle: { model: string; numberPlate: string } | null;
  totalVehicles: number;
  location: string;
  status: string;
};

export type PaginatedFleetResponseType = PaginatedResponseType<FleetType>;
export type SingleFleetResponseType = ResponseType<FleetType>;
