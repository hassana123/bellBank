import type { CardRequestApprovalRequestType, CardRequestType, CardType } from '~/types';
import type { ApiApproveOrDenyCardRequestType, ApiCardRequestType, ApiCardType } from '../types';

export function serializeCard(input: ApiCardType): CardType {
  const data: CardType = {
    id: input.id,
    cardNumber: input.cardNumber || 'N/A',
    driver: null,
    lastUsed: new Date(input.updatedAt),
    status: input.status,
    vehicle: null,
  };

  return data;
}

// ****** Card Requests *********
export function serializeCardRequest(input: ApiCardRequestType): CardRequestType {
  let itemStatus = input.status;

  switch (input.status) {
    case 'approved':
      itemStatus = 'complete';
      break;
    case 'rejected':
      itemStatus = 'denied';
      break;
    case 'requested':
      itemStatus = 'pending';
      break;
    default:
      break;
  }

  const data: CardRequestType = {
    id: input.id,
    status: itemStatus,
    quantity: input.quantity,
    regDate: new Date(input.createdAt),
    business: input.business
      ? {
          id: input.business.id,
          name: input.business.name,
          email: input.business.email,
          logo: input.business.logo,
        }
      : null,
  };

  return data;
}

export function serializeCardRequestApproveOrDenyInput(
  input: CardRequestApprovalRequestType
): ApiApproveOrDenyCardRequestType {
  const data: ApiApproveOrDenyCardRequestType =
    input.action === 'approve'
      ? {
          action: 'approved',
        }
      : {
          action: 'rejected',
          rejectReason: input.reason,
        };

  return data;
}
