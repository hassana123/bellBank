import type { UploadFileType } from '~/components/controls';
import type { PaginatedResponseType, ResponseType } from './base';

// ******* Company Info Settings ********
export type CompanyInfoType = {
  id: number;
  company: { name: string } | null;
  email: string;
  phone: string;
  state: string;
  city: string;
  address: string;
  logo: string | null;
};
export type GetCompanyInfoResponseType = ResponseType<CompanyInfoType>;
export type UpdateCompanyInfoRequestDataType = {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  logo?: UploadFileType[];
  original?: CompanyInfoType;
};
export type UpdateCompanyInfoResponseType = ResponseType;
// ******* Company Info Settings ********

// ******* Notification Settings *********
export type GetNotificationSettingsResponseType = ResponseType<{
  business: boolean;
  substation: boolean;
  transaction: boolean;
}>;

export type UpdateNotificationSettingsRequestType = {
  business: boolean;
  substation: boolean;
  transaction: boolean;
};

// ******* Bank List *************
export type BankItemType = {
  id: string;
  name: string;
  code: string;
};
export type PaginatedBankItemResponseType = PaginatedResponseType<BankItemType>;

export type BankAccountHolderRequestDataType = {
  accountNumber: SettlementAccountType['accountNumber'];
  bankCode: SettlementAccountType['bankCode'];
};
export type BankAccountHolderResponseType = ResponseType<SettlementAccountType>;

// ******* Settlement Accounts **********
export type SettlementAccountType = {
  id: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
};
export type CreateSettlementAccountType = {
  accountName: string;
  accountNumber: string;
  bankCode: string;
};
export type CreateSettlementAccountResponseType = ResponseType<SettlementAccountType>;

export type SingleSettlementAccountResponseType = ResponseType<SettlementAccountType>;
export type PaginatedSettlementAccountResponseType = PaginatedResponseType<SettlementAccountType>;
