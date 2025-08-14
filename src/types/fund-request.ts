import type { PaginatedResponseType, ResponseType } from './base';
import type { BusinessType } from './business';

export const FundRequestStatus = {
  Denied: 'denied',
  Pending: 'pending',
  Successful: 'successful',
};

export const FundRequestFileUploadType = {
  File: 'file',
  Image: 'image',
  PDF: 'pdf',
};

export type FundRequestType = {
  id: number;
  business: {
    id: BusinessType['id'];
    name: BusinessType['name'];
    email: BusinessType['email'];
    logo: BusinessType['logo'];
  } | null;
  amountRequested: number;
  amountApproved: number | null;
  uploads: { id: number; name: string; type?: string; url: string }[];
  regDate: Date;
  status: string;
};

export type PaginatedFundRequestResponseType = PaginatedResponseType<FundRequestType>;
export type SingleFundRequestResponseType = ResponseType<FundRequestType>;

export type FundRequestApprovalRequestType = {
  action: 'approve' | 'deny';
  amount: number;
  fundRequestId: FundRequestType['id'];
  reason: string;
};
