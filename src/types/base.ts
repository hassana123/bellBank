import type { FormRule as AntdFormRule } from 'antd';

export type ResponseType<DataType = undefined> = DataType extends void
  ? {
      message: string;
      status: 'error' | 'success';
      data?: DataType;
    }
  : {
      message: string;
      status: 'error' | 'success';
      data: DataType;
    };

export type ResponseErrorType<DataType = undefined> = {
  message: string;
  status: 'error' | 'success' | number;
  data?: DataType;
};

export type PaginatedResponseType<T> = ResponseType<{
  totalPages: number;
  currentPage: number;
  totalRecords: number; // total records
  pageSize?: number;
  result: T[];
}>;

export type QueryListOptionsType = {
  limit?: number | null;
  page?: number | null;
  search?: string | null;
  from?: string | null;
  to?: string | null;
  status?: string | null;
};

export type MutationOptionsType<T = void, U = void> = {
  onSuccess: T extends void ? (data: Omit<ResponseType, 'data'>) => void : (data: ResponseType<T>) => void;
  onError?: U extends void ? (err: ResponseErrorType) => void : (err: ResponseErrorType<U>) => void;
};

export type GetValidatorErrorType<T> = {
  [K in keyof T]?: T[K] extends Date | number ? string : T[K] extends object ? GetValidatorErrorType<T[K]> : string;
};

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type ModalBaseRefType = {
  open: () => void;
  close: () => void;
};

export type ReactPaginationState = React.Dispatch<React.SetStateAction<PaginationState>>;

export type FormRule = AntdFormRule;
