import type { SubstationTransactionType, TransactionType } from '~/types';

import type { ApiTransactionType } from '../types/transaction';

export function serializeTransaction(input: ApiTransactionType): TransactionType {
  const amount = +input.amount;
  const charge = input.charge ? +input.charge : 0;
  const netAmount = input.netAmount ? +input.netAmount : amount + charge;

  const data: TransactionType = {
    id: input.id,
    amount,
    charge,
    netAmount,
    business: null,
    date: new Date(input.createdAt),
    description: input.description || input.details?.description || 'N/A',
    driver: null,
    litres: null,
    modeOfPayment: null,
    pump: null,
    reference: input.reference,
    status: input.status,
    station: null,
    transactionType: input.type,
    type: input.action,
  };

  return data;
}

export function serializeSubstationTransaction(input: ApiTransactionType): SubstationTransactionType {
  const amount = +input.amount;
  const charge = input.charge ? +input.charge : 0;
  const netAmount = input.netAmount ? +input.netAmount : amount + charge;

  const data: SubstationTransactionType = {
    id: input.id,
    amount,
    charge,
    netAmount,
    customer: null,
    date: new Date(input.createdAt),
    paymentMethod: 'N/A',
    product: null,
    quantity: 'N/A',
    reference: input.reference,
    status: input.status,
    transaction: serializeTransaction(input),
  };

  return data;
}
