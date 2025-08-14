import type { UploadFileType } from '~/components/controls/upload';
import type { GetValidatorErrorType, PaginatedResponseType, ResponseType } from './base';
import type { SubstationType } from './substation';

export const StaffStatus = {
  Active: 'active',
  Inactive: 'inactive',
};

export const StaffRole = {
  Attendant: 'attendant',
  Guard: 'gate-man',
  Secretary: 'secretary',
};

export type StaffDashboardCardResponseType = ResponseType<{
  totalStaff?: number;
  activeStaff?: number;
  inactiveStaff?: number;
  newStaff?: number;
}>;

export type StaffType = {
  id: number;
  name: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string; // 'm
  substation: { id: SubstationType['id']; name: string } | null;
  status: string;
  photo: string | null;
  role: string;
  createdAt: Date;
};

export type CreateStaffType = {
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  gender: string; // 'male' | 'female';
  role: string;
  photo?: UploadFileType[];
  substationId?: SubstationType['id'] | null;
};
export type CreateStaffErrorType = GetValidatorErrorType<CreateStaffType>;
export type CreateStaffResponseType = ResponseType;

export type UpdateStaffType = Omit<CreateStaffType, 'email' | 'phone' | 'password'> & {
  original?: StaffType;
  email?: string;
  phone?: string;
};
export type UpdateStaffErrorType = GetValidatorErrorType<UpdateStaffType>;
export type UpdateStaffResponseType = ResponseType;

export type ToggleStaffStatusType = { action: 'suspend' | 'activate'; staffId: StaffType['id'] };

export type SingleStaffResponseType = ResponseType<StaffType>;
export type PaginatedStaffResponseType = PaginatedResponseType<StaffType>;
