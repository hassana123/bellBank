import type { QueryListOptionsType } from './base';
import type { SubstationType } from './substation';

export const ProductCode = {
  DPK: 'dpk',
  LPG: 'lpg',
  PMS: 'pms',
};

export type ProductQueryListOptionsType = QueryListOptionsType & {
  code?: string;
  stationId?: SubstationType['id'];
};
