import type { FundRequestType } from '~/types';
import type { ApiFundRequestType } from '../types';

export function serializeFundRequest(input: ApiFundRequestType): FundRequestType {
  const data: FundRequestType = {
    id: input.id,
    amountApproved: null,
    amountRequested: +input.amount,
    regDate: new Date(input.createdAt),
    status: input.status,
    uploads: input.documentUrl
      ? [
          {
            id: 1,
            name: 'fund_request',
            type: undefined,
            url: input.documentUrl,
          },
        ]
      : [],
    business: input.business
      ? {
          email: input.business.email,
          name: input.business.name,
          id: input.business.id,
          logo: input.business.logo,
        }
      : null,
  };
  return data;
}
