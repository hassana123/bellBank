import type {
  CreateSubstationType,
  SubstationDashboardCardResponseType,
  SubstationType,
  UpdateSubstationType,
} from '~/types';

import {
  ApiStaffRole,
  ApiStaffStatus,
  type ApiSubstationCreateType,
  type ApiSubstationDashboardCardsType,
  type ApiSubstationDetailType,
  type ApiSubstationType,
  type ApiSubstationUpdateType,
} from '../types';

export function serializeSubstationsDashboardCards(
  input: ApiSubstationDashboardCardsType['data']
): SubstationDashboardCardResponseType['data'] {
  const data: SubstationDashboardCardResponseType['data'] = {
    activeSubstation: input.activeCount,
    inactiveSubstation: input.inActiveCount,
    totalSubstation: input.allCount,
    totalCards: input.totalCards,
  };

  return data;
}

export function serializeSubstation(input: ApiSubstationType): SubstationType {
  const manager = input.staffs?.find(
    (item) => item.status === ApiStaffStatus.Active && item.role === ApiStaffRole['Station Manager']
  );
  const managerName = manager
    ? `${manager.firstName} ${manager?.middleName || ''}`.trim() + ` ${manager.lastName}`
    : '';

  const data: SubstationType = {
    id: input.id,
    name: input.name,
    email: input.email || 'N/A',
    phone: input.phone || 'N/A',
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
    holdings: input.wallet ? { balance: input.wallet.holdingBalance } : null,
    wallet: input.wallet ? { balance: input.wallet.balance } : null,
    address: input.address || 'N/A',
    city: input.lga || 'N/A',
    state: input.state || 'N/A',
    createdAt: new Date(input.createdAt),
  };

  return data;
}

export function serializeSubstationDetail(input: ApiSubstationDetailType): SubstationType {
  const manager = input.staffs?.find(
    (item) => item.status === ApiStaffStatus.Active && item.role === ApiStaffRole['Station Manager']
  );
  const managerName = manager
    ? `${manager.firstName} ${manager?.middleName || ''}`.trim() + ` ${manager.lastName}`
    : '';

  const data: SubstationType = {
    id: input.id,
    name: input.name,
    email: input.email || 'N/A',
    phone: input.phone || 'N/A',
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
    holdings: input.wallet ? { balance: input.wallet.holdingBalance } : null,
    wallet: input.wallet ? { balance: input.wallet.balance } : null,
    address: input.address || 'N/A',
    city: input.lga || 'N/A',
    state: input.state || 'N/A',
    createdAt: new Date(input.createdAt),
  };

  return data;
}

export function serializeCreateSubstationInput(input: CreateSubstationType): ApiSubstationCreateType {
  const data: ApiSubstationCreateType = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    address: input.address,
    state: input.state,
    lga: input.city,
    manager: {
      firstName: input.manager.firstname,
      lastName: input.manager.lastname,
      email: input.manager.email,
      password: input.manager.password,
      gender: input.manager.gender.toLowerCase().startsWith('male') ? 'male' : 'female',
      phone: input.manager.phone,
    },
  };

  if (input.manager.middlename) data.manager.middleName = input.manager.middlename;

  return data;
}

export function serializeUpdateSubstationInput(input: UpdateSubstationType): ApiSubstationUpdateType {
  const data: ApiSubstationUpdateType = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    address: input.address,
    state: input.state,
    lga: input.city,
    manager: input.manager
      ? {
          firstName: input.manager.firstname,
          lastName: input.manager.lastname,
          email: input.manager.email,
          password: input.manager.password,
          gender: input.manager.gender.toLowerCase().startsWith('male') ? 'male' : 'female',
          phone: input.manager.phone,
        }
      : undefined,
  };

  if (input.manager?.middlename && data.manager) data.manager.middleName = input.manager.middlename;

  // Substation Detail
  if (input.original?.email === data.email) delete data.email;
  if (input.original?.phone === data.phone) delete data.phone;

  // Substation Manager Detail
  if (data.manager && input.original?.manager) {
    if (input.original.manager.email === data.manager.email) delete data.manager.email;
    if (input.original.manager.phone === data.manager.phone) delete data.manager.phone;
  }

  return data;
}
