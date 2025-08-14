import type {
  BankAccountHolderRequestDataType,
  BankAccountHolderResponseType,
  CreateSettlementAccountResponseType,
  CreateSettlementAccountType,
  GetCompanyInfoResponseType,
  GetNotificationSettingsResponseType,
  PaginatedBankItemResponseType,
  PaginatedSettlementAccountResponseType,
  QueryListOptionsType,
  ResponseType,
  SettlementAccountType,
  SingleSettlementAccountResponseType,
  UpdateCompanyInfoRequestDataType,
  UpdateCompanyInfoResponseType,
  UpdateNotificationSettingsRequestType,
} from '~/types';
import { AppError, handleAllErrors } from '~/utils/errors';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as SettingsSerializer from '../serializers/settings.serializer';
import * as FileService from '../services/file.service';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

// ********* Company Settings **********

export async function getCompanyInfo({ token }: { token: string }): Promise<GetCompanyInfoResponseType> {
  const url = routes.GET_COMPANY_INFO_URL;
  const response = await HttpInstance.login(token)
    .get(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(SettingsSerializer.serializeCompanyInfo(response.data), 'Fetched Company Info');
}

export async function updateCompanyInfo({
  token,
  data,
}: {
  token: string;
  data: UpdateCompanyInfoRequestDataType;
}): Promise<UpdateCompanyInfoResponseType> {
  const input = SettingsSerializer.serializeCompanyInfoUpdateInput(data);
  // Upload File
  if (((data.logo && data.logo.length) || 0) > 0) {
    const fileData = await FileService.uploadFile({ token, file: (data.logo || [])[0] }).then(
      (response) => response.data
    );
    input.logo = fileData.url;
  }

  await HttpInstance.login(token).put(routes.UPDATE_COMPANY_INFO_URL, input);
  return NewSuccessResponse("You have successfully updated this company's record.");
}

// ********* Company Settings **********

// ********* Notification Settings ***********

let notificationSettings = { business: true, substation: true, transaction: false };

export async function getNotificationSettings({
  token,
}: {
  token: string;
}): Promise<GetNotificationSettingsResponseType> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Fetched Notification Settings ' + token,
          data: notificationSettings,
        });
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}

export async function updateNotificationSettings({
  data,
}: {
  data: UpdateNotificationSettingsRequestType;
  token: string;
}): Promise<ResponseType> {
  return new Promise((resolve, reject) => {
    try {
      notificationSettings = { ...notificationSettings, ...data };
      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Updated Notification Settings',
        });
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}

// ******** Notification Settings ***********

// ******** Settlement Account Settings **********

export async function getBankList({
  filters,
}: {
  filters?: QueryListOptionsType;
  token: string;
}): Promise<PaginatedBankItemResponseType> {
  return new Promise((resolve, reject) => {
    try {
      let data = bankList;

      if (filters?.search) {
        data = data.filter((item) =>
          Object.values(item).some((value) =>
            JSON.stringify(value)
              .toString()
              .toLowerCase()
              .includes(filters.search?.toLowerCase() || '')
          )
        );
      }

      // Total Records
      const totalRecords = data.length;

      // Total Pages
      const totalPages = filters?.limit ? Math.ceil(totalRecords / filters.limit) : 1;

      // Calculate the offset
      const page = filters?.page && filters?.page < 1 ? 1 : filters?.page || 1;
      const offset = filters?.limit && page ? (page - 1) * filters.limit : undefined;

      // Get the paginated result;
      const result = offset !== undefined && filters?.limit ? data.slice(offset, offset + filters.limit) : data;

      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Fetched Bank List.',
          data: {
            totalPages,
            totalRecords,
            result,
            currentPage: page,
            pageSize: filters?.limit || undefined,
          },
        });
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}

export async function retrieveBankAccountHolder({
  data,
}: {
  token: string;
  data: BankAccountHolderRequestDataType;
}): Promise<BankAccountHolderResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'Fetched account holder',
        data: { id: '1', accountName: 'Timothy Clinton', accountNumber: data.accountNumber, bankCode: data.bankCode },
      });
    }, 2000);
  });
}

export async function getSettlementAccounts({
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedSettlementAccountResponseType> {
  return new Promise((resolve, reject) => {
    try {
      let data = settlementAccounts;

      if (filters?.search) {
        data = data.filter((item) =>
          Object.values(item).some((value) =>
            JSON.stringify(value)
              .toString()
              .toLowerCase()
              .includes(filters.search?.toLowerCase() || '')
          )
        );
      }

      // Total Records
      const totalRecords = data.length;

      // Total Pages
      const totalPages = filters?.limit ? Math.ceil(totalRecords / filters.limit) : 1;

      // Calculate the offset
      const page = filters?.page && filters?.page < 1 ? 1 : filters?.page || 1;
      const offset = filters?.limit && page ? (page - 1) * filters.limit : undefined;

      // Get the paginated result;
      const result = offset !== undefined && filters?.limit ? data.slice(offset, offset + filters.limit) : data;

      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Fetched Settlement Accounts.',
          data: {
            totalPages,
            totalRecords,
            result,
            currentPage: page,
            pageSize: filters?.limit || undefined,
          },
        });
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}

export async function getSettlementAccountById({
  id,
}: {
  token: string;
  id: SettlementAccountType['id'];
}): Promise<SingleSettlementAccountResponseType> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const account = settlementAccounts.find((item) => item.id === id);
        if (!account) throw new AppError(404, 'Account not found');
        resolve({
          status: 'success' as const,
          message: 'Fetched',
          data: account,
        });
      }, 2000);
    } catch (err) {
      reject(handleAllErrors(err));
    }
  });
}

export async function createSettlementAccount({
  data,
}: {
  token: string;
  data: CreateSettlementAccountType;
}): Promise<CreateSettlementAccountResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: 'You have successfully added a new settlement account',
        data: { ...data, ...settlementAccounts[0] },
      });
    }, 2000);
  });
}

export async function updateSettlementAccount({
  data,
}: {
  token: string;
  id: SettlementAccountType['id'];
  data: CreateSettlementAccountType;
}): Promise<CreateSettlementAccountResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: 'You have successfully updated settlement account.',
        data: { ...data, ...settlementAccounts[0] },
      });
    }, 2000);
  });
}

export async function deleteSettlementAccount(_: {
  token: string;
  id: SettlementAccountType['id'];
}): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: 'You have successfully deleted a settlement account.',
      });
    }, 2000);
  });
}

// ******* Settlement Account Settings ***********

const settlementAccounts = [
  {
    id: 'settlement-acc-001',
    accountName: 'Quickfill Main Account',
    accountNumber: '0123456789',
    bankCode: '044',
  },
  {
    id: 'settlement-acc-002',
    accountName: 'Substation Revenue Account',
    accountNumber: '9876543210',
    bankCode: '057',
  },
  {
    id: 'settlement-acc-003',
    accountName: 'Quickfill Holdings Dept',
    accountNumber: '1122334455',
    bankCode: '011',
  },
];

const bankList = [
  {
    id: 'bank-001',
    name: 'Access Bank Plc',
    code: '044',
  },
  {
    id: 'bank-002',
    name: 'Zenith Bank Plc',
    code: '057',
  },
  {
    id: 'bank-003',
    name: 'Guaranty Trust Bank Plc',
    code: '058',
  },
  {
    id: 'bank-004',
    name: 'First Bank of Nigeria Plc',
    code: '011',
  },
  {
    id: 'bank-005',
    name: 'United Bank for Africa Plc',
    code: '033',
  },
  {
    id: 'bank-006',
    name: 'Ecobank Nigeria Plc',
    code: '050',
  },
  {
    id: 'bank-007',
    name: 'Fidelity Bank Plc',
    code: '070',
  },
  {
    id: 'bank-008',
    name: 'Union Bank of Nigeria Plc',
    code: '032',
  },
  {
    id: 'bank-009',
    name: 'Stanbic IBTC Bank Plc',
    code: '221',
  },
  {
    id: 'bank-010',
    name: 'Standard Chartered Bank Nigeria Ltd',
    code: '068',
  },
  {
    id: 'bank-011',
    name: 'Sterling Bank Plc',
    code: '232',
  },
  {
    id: 'bank-012',
    name: 'Wema Bank Plc',
    code: '035',
  },
  {
    id: 'bank-013',
    name: 'Keystone Bank Ltd',
    code: '082',
  },
  {
    id: 'bank-014',
    name: 'Unity Bank Plc',
    code: '215',
  },
  {
    id: 'bank-015',
    name: 'Heritage Bank Plc',
    code: '030',
  },
];

// ******** Settlement Account Settings **********
