import type { PaginatedResponseType, QueryListOptionsType, ResponseType } from './base';

export type TransactionQueryListOptionsType = QueryListOptionsType & {
  type?: string;
};

export const TransactionOptionType = {
  'Fund Request': 'fund-request',
};

export const TransactionStatus = {
  Failed: 'failed',
  Pending: 'pending',
  Successful: 'successful',
};

export const TransactionType = {
  Credit: 'credit',
  Debit: 'debit',
};

export type TransactionType = {
  id: number;
  charge: number;
  amount: number;
  netAmount: number;
  business: { name: string } | null;
  reference: string;
  status: string;
  type: string; // 'credit' | 'debit';
  transactionType: string;
  date: Date;
  litres: string | null;
  driver: { name: string } | null;
  description: string | null;
  modeOfPayment: string | null;
  station: { name: string } | null;
  pump: { name: string } | null;
};

export type SingleTransactionResponseType = ResponseType<TransactionType>;
export type PaginatedTransactionResponseType = PaginatedResponseType<TransactionType>;
