import type { PaginatedResponseType, QueryListOptionsType, ResponseType } from './base';
import type { BusinessType } from './business';

export type CardQueryListOptionsType = QueryListOptionsType & {
  businessId: BusinessType['id'];
};

export const CardStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Not_Assigned: 'not_assigned',
};

export type CardType = {
  id: number;
  cardNumber: string;
  driver: { name: string } | null;
  vehicle: { name: string } | null;
  lastUsed: Date | null;
  status: string;
};

export type PaginatedCardResponseType = PaginatedResponseType<CardType>;
export type SingleCardResponseType = ResponseType<CardType>;

// ***** Card Requests ****
export const CardRequestStatus = {
  Complete: 'complete',
  Denied: 'denied',
  Pending: 'pending',
};

export type CardRequestType = {
  id: number;
  business: {
    id: BusinessType['id'];
    name: BusinessType['name'];
    email: BusinessType['email'];
    logo: BusinessType['logo'];
  } | null;
  quantity: number;
  regDate: Date;
  status: string;
};
export type CardRequestApprovalRequestType = ({ action: 'approve' } | { action: 'deny'; reason: string }) & {
  cardRequestId: CardRequestType['id'];
};

export type PaginatedCardRequestResponseType = PaginatedResponseType<CardRequestType>;
export type SingleCardRequestResponseType = ResponseType<CardRequestType>;
