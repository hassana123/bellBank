import type {
  BusinessDashboardCardResponseType,
  BusinessDetailDashboardCardResponseType,
  BusinessType,
  CreateBusinessType,
  UpdateBusinessType,
} from '~/types';

import {
  ApiStaffRole,
  ApiStaffStatus,
  type ApiBusinessCreateType,
  type ApiBusinessDashboardCardsType,
  type ApiBusinessDetailDashboardCardsType,
  type ApiBusinessType,
  type ApiBusinessUpdateType,
} from '../types';

export function serializeBusinessDashboardCards(
  input: ApiBusinessDashboardCardsType['data']
): BusinessDashboardCardResponseType['data'] {
  const data: BusinessDashboardCardResponseType['data'] = {
    activeBusiness: input.activeCount,
    inactiveBusiness: input.inActiveCount,
    totalBusiness: input.allCount,
    totalCards: input.totalCards,
  };

  return data;
}

export function serializeBusinessDetailDashboardCards(
  input: ApiBusinessDetailDashboardCardsType['data']
): BusinessDetailDashboardCardResponseType['data'] {
  const data: BusinessDetailDashboardCardResponseType['data'] = {
    fleets: input.totalFleets,
    totalDeposits: input.totalDeposits,
    totalNFCCards: input.totalNfc,
    walletBalance: 0,
  };

  return data;
}

export function serializeBusiness(input: ApiBusinessType): BusinessType {
  const manager = input.staffs?.find(
    (item) => item.status === ApiStaffStatus.Active && item.role === ApiStaffRole['Business Manager']
  );
  const managerName = manager
    ? `${manager.firstName} ${manager?.middleName || ''}`.trim() + ` ${manager.lastName}`
    : '';

  const data: BusinessType = {
    id: input.id,
    name: input.name,
    email: input.email,
    phone: input.phone,
    address: input.address || 'N/A',
    city: input.lga || 'N/A',
    state: input.state || 'N/A',
    logo: input.logo,
    regDate: new Date(input.createdAt),
    status: input.status,
    manager: manager
      ? {
          id: manager.id,
          email: manager.email,
          phone: manager.phone,
          name: managerName,
          firstname: manager.firstName,
          middlename: manager.middleName || undefined,
          lastname: manager.lastName,
          gender: ['female', 'fe-male'].includes(manager.gender) ? 'female' : 'male',
        }
      : null,
    wallet: input.wallet
      ? {
          id: input.wallet.id,
          balance: input.wallet.balance,
        }
      : null,
  };

  return data;
}

export function serializeCreateBusinessInput(input: CreateBusinessType): ApiBusinessCreateType {
  const data: ApiBusinessCreateType = {
    address: input.address,
    email: input.email,
    lga: input.city,
    state: input.state,
    name: input.name,
    phone: input.phone,
    manager: {
      email: input.manager.email,
      firstName: input.manager.firstname,
      lastName: input.manager.lastname,
      gender: input.manager.gender.toLocaleLowerCase().startsWith('male') ? 'male' : 'female',
      password: input.manager.password,
      phone: input.manager.phone,
    },
  };

  if (input.manager.middlename) {
    data.manager.middleName = input.manager.middlename;
  }

  return data;
}

export function serializeUpdateBusinessInput(input: UpdateBusinessType): ApiBusinessUpdateType {
  const data: ApiBusinessUpdateType = {
    address: input.address,
    email: input.email,
    lga: input.city,
    state: input.state,
    name: input.name,
    phone: input.phone,
    manager: input.manager
      ? {
          email: input.manager.email,
          firstName: input.manager.firstname,
          lastName: input.manager.lastname,
          gender: input.manager.gender.toLocaleLowerCase().startsWith('male') ? 'male' : 'female',
          password: input.manager.password,
          phone: input.manager.phone,
        }
      : undefined,
  };

  if (input.manager?.middlename && data.manager) data.manager.middleName = input.manager.middlename;

  // Business Detail
  if (input.original?.email === data.email) delete data.email;
  if (input.original?.phone === data.phone) delete data.phone;

  // Business Manager Detail
  if (data.manager && input.original?.manager) {
    if (input.original.manager.email === data.manager.email) delete data.manager.email;
    if (input.original.manager.phone === data.manager.phone) delete data.manager.phone;
  }

  return data;
}
