import type { CreateStaffType, StaffDashboardCardResponseType, StaffType, UpdateStaffType } from '~/types';
import type { ApiStaffCreateType, ApiStaffDashboardCardsType, ApiStaffType, ApiStaffUpdateType } from '../types';

export function serializeStaffDashboardCards(
  input: ApiStaffDashboardCardsType['data']
): StaffDashboardCardResponseType['data'] {
  const data: StaffDashboardCardResponseType['data'] = {
    activeStaff: input.active,
    inactiveStaff: input.inActive,
    newStaff: input.new,
    totalStaff: input.total,
  };
  return data;
}

export function serializeStaff(input: ApiStaffType): StaffType {
  const firstname = input.user?.firstName || '';
  const middlename = input.user?.middleName || '';
  const lastname = input.user?.lastName || '';
  const fullname = `${firstname} ${middlename}`.trim() + ` ${lastname}`.trimEnd();

  const gender = input.user?.gender || 'N/A';

  const data: StaffType = {
    id: input.id,
    name: fullname || 'N/A',
    firstname: firstname || 'N/A',
    middlename: middlename,
    lastname: lastname,
    email: input.user?.email || 'N/A',
    phone: input.user?.phone || 'N/A',
    gender: gender === 'male' ? 'male' : ['fe-male', 'female'].includes(gender) ? 'female' : gender,
    substation: input.stationId ? { id: input.stationId, name: 'N/A' } : null,
    status: input.status,
    photo: input.user?.photo || null,
    role: input.role,
    createdAt: new Date(input.createdAt),
  };

  return data;
}

export function serializeCreateStaffInput(input: CreateStaffType): ApiStaffCreateType {
  const data: ApiStaffCreateType = {
    firstName: input.firstname,
    lastName: input.lastname,
    email: input.email,
    gender: input.gender.toLowerCase().startsWith('male') ? 'male' : 'fe-male',
    password: input.password,
    phone: input.phone,
    role: input.role,
  };

  if (input.middlename) data.middleName = input.middlename;
  if (input.substationId) data.stationId = input.substationId.toString();

  return data;
}

export function serializeUpdateStaffInput(input: UpdateStaffType): ApiStaffUpdateType {
  const data: ApiStaffUpdateType = {
    firstName: input.firstname,
    lastName: input.lastname,
    email: input.email,
    gender: input.gender.toLowerCase().startsWith('male') ? 'male' : 'fe-male',
    phone: input.phone,
    role: input.role,
  };

  if (input.middlename) data.middleName = input.middlename;
  if (input.substationId) data.stationId = input.substationId.toString();

  if (input.original?.email === data.email) {
    delete data.email;
  }

  if (input.original?.phone === data.phone) {
    delete data.phone;
  }

  return data;
}
