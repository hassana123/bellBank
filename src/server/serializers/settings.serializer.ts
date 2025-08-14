import type { CompanyInfoType, UpdateCompanyInfoRequestDataType } from '~/types';
import type { ApiCompanyInfoType, ApiCompanyInfoUpdateType } from '../types';

export function serializeCompanyInfo(input: ApiCompanyInfoType): CompanyInfoType {
  const data: CompanyInfoType = {
    id: input.id,
    company: { name: input.name },
    email: input.email,
    phone: input.phone,
    logo: input.logo || null,
    address: input.address || 'N/A',
    city: input.lga || 'N/A',
    state: input.state || 'N/A',
  };

  return data;
}

export function serializeCompanyInfoUpdateInput(input: UpdateCompanyInfoRequestDataType): ApiCompanyInfoUpdateType {
  const data: ApiCompanyInfoUpdateType = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    lga: input.city,
    state: input.state,
    address: input.address,
  };

  if (data.email === input.original?.email) {
    delete data.email;
  }

  if (data.phone === input.original?.phone) {
    delete data.phone;
  }

  return data;
}
