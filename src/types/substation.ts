import type { GetValidatorErrorType, PaginatedResponseType, QueryListOptionsType, ResponseType } from './base';
import type { StaffType } from './staff';
import type { TransactionType } from './transaction';

export const SubstationStatus = {
  Active: 'active',
  Inactive: 'inactive',
};

export type SubstationDashboardCardResponseType = ResponseType<{
  totalCards?: number;
  totalSubstation?: number;
  activeSubstation?: number;
  inactiveSubstation?: number;
}>;

export type SubstationDetailDashboardCardResponseType = ResponseType<{
  totalSales?: number;
  holdingBalance?: number;
  petrolPrice?: number;
  dieselPrice?: number;
  kerosenePrice?: number;
}>;

export type SubstationType = {
  id: number;
  name: string;
  city: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  manager: {
    id: StaffType['id'];
    name: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string; // 'm
  } | null;
  holdings: { balance: number } | null;
  wallet: { balance: number } | null;
  status: string;
  createdAt: Date;
};

export type CreateSubstationType = {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address: string;
  manager: {
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    gender: string; // 'male' | 'female';
  };
};
export type CreateSubstationErrorType = GetValidatorErrorType<CreateSubstationType>;
export type CreateSubstationResponseType = ResponseType;

export type UpdateSubstationType = Omit<CreateSubstationType, 'email' | 'phone' | 'manager'> & {
  email?: string;
  phone?: string;
  manager?: CreateSubstationType['manager'];
  original?: SubstationType;
};
export type UpdateSubstationErrorType = GetValidatorErrorType<UpdateSubstationType>;
export type UpdateSubstationResponseType = ResponseType;

export type SingleSubstationResponseType = ResponseType<SubstationType>;
export type PaginatedSubstationResponseType = PaginatedResponseType<SubstationType>;

// ******* Substation Transaction *********

export const SubstationTransactionStatus = {
  Failed: 'failed',
  Pending: 'pending',
  Successful: 'successful',
};

export type SubstationTransactionType = {
  id: number;
  product: { name: string } | null;
  quantity: string;
  amount: number;
  charge: number;
  netAmount: number;
  reference: string;
  customer: { id: number } | null;
  paymentMethod: string;
  status: string;
  date: Date;
  transaction: TransactionType | null;
};

export type SubstationTransactionQueryListOptionsType = QueryListOptionsType & {
  stationId: SubstationType['id'];
};

export type SingleSubstationTransactionResponseType = ResponseType<SubstationTransactionType>;
export type PaginatedSubstationTransactionResponseType = PaginatedResponseType<SubstationTransactionType>;
