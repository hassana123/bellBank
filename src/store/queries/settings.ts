import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as SettingsService from '~/server/services/settings.service';
import type {
  BankAccountHolderRequestDataType,
  BankAccountHolderResponseType,
  CreateSettlementAccountResponseType,
  CreateSettlementAccountType,
  GetCompanyInfoResponseType,
  GetNotificationSettingsResponseType,
  MutationOptionsType,
  PaginatedBankItemResponseType,
  PaginatedSettlementAccountResponseType,
  QueryListOptionsType,
  SettlementAccountType,
  SingleSettlementAccountResponseType,
  UpdateCompanyInfoRequestDataType,
  UpdateCompanyInfoResponseType,
  UpdateNotificationSettingsRequestType,
} from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';
import { AppError, handleAllErrors } from '~/utils/errors';

// ****** Queries ******

export function useGetCompanyInfoQuery(options?: { initialData?: GetCompanyInfoResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<GetCompanyInfoResponseType>({
    queryKey: [tags.Settings, { key: 'COMPANY_INFO' }],
    async queryFn() {
      return SettingsService.getCompanyInfo({ token });
    },
    initialData,
  });

  return query;
}

export function useGetNotificationsSettingsQuery(options?: { initialData?: GetNotificationSettingsResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<GetNotificationSettingsResponseType>({
    queryKey: [tags.Settings, { key: 'NOTIFICATION' }],
    async queryFn() {
      return SettingsService.getNotificationSettings({ token });
    },
    initialData,
  });

  return query;
}

export function useGetSettlementAccountsQuery(options?: {
  initialData?: PaginatedSettlementAccountResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedSettlementAccountResponseType>({
    queryKey: [tags.SettlementAccount, { key: 'SETTLEMENT_ACCOUNT_LIST', filters }],
    async queryFn() {
      return SettingsService.getSettlementAccounts({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetSettlementAccountByIdQuery({
  initialData,
  id = '',
}: {
  initialData?: SingleSettlementAccountResponseType;
  id?: SettlementAccountType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleSettlementAccountResponseType>({
    queryKey: [tags.SettlementAccount, { id }],
    enabled: !!id,
    async queryFn() {
      return SettingsService.getSettlementAccountById({ token, id });
    },
    initialData,
  });

  return query;
}

export function useGetBankListQuery(options?: { filters?: QueryListOptionsType }) {
  const { filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedBankItemResponseType>({
    queryKey: [tags.Settings, { key: 'BANK_LIST', filters }],
    async queryFn() {
      return SettingsService.getBankList({ filters, token });
    },
  });

  return query;
}

export function useRetrieveBankAccountHolderQuery(options?: {
  data?: BankAccountHolderRequestDataType;
  enabled?: boolean;
}) {
  const { data, enabled = true } = options || {};
  const { token } = useUserContext();

  const query = useQuery<BankAccountHolderResponseType>({
    queryKey: [tags.Settings, { key: 'BANK_LIST', data }],
    enabled,
    async queryFn() {
      if (!data) throw new AppError(500, 'Account info not provided');
      return SettingsService.retrieveBankAccountHolder({ data, token });
    },
  });

  return query;
}

// ******* Mutations *******
//
// update company profile
export function useUpdateCompanyInfoMutation(options: MutationOptionsType<UpdateCompanyInfoResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: UpdateCompanyInfoRequestDataType) {
      return SettingsService.updateCompanyInfo({ token, data });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Settings] });
      options.onSuccess(response);
    },
    onError: options?.onError
      ? (err) => {
          if (options.onError) {
            const error = handleAllErrors(err);
            options.onError(error);
          }
        }
      : undefined,
  });

  return mutation;
}

export function useUpdateNotificationSettingsMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: UpdateNotificationSettingsRequestType) {
      return SettingsService.updateNotificationSettings({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Settings] });
      options.onSuccess(response);
    },
    onError: options?.onError
      ? (err) => {
          if (options.onError) {
            const error = handleAllErrors(err);
            options.onError(error);
          }
        }
      : undefined,
  });

  return mutation;
}

export function useCreateSettlementAccountMutation(
  options: MutationOptionsType<CreateSettlementAccountResponseType['data']>
) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: CreateSettlementAccountType) {
      return SettingsService.createSettlementAccount({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.SettlementAccount] });
      options.onSuccess(response);
    },
    onError: options?.onError
      ? (err) => {
          if (options.onError) {
            const error = handleAllErrors(err);
            options.onError(error);
          }
        }
      : undefined,
  });

  return mutation;
}

export function useEditSettlementAccountMutation(
  options: MutationOptionsType<CreateSettlementAccountResponseType['data']>
) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn({ id, data }: { data: CreateSettlementAccountType; id: SettlementAccountType['id'] }) {
      return SettingsService.updateSettlementAccount({ data, id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.SettlementAccount] });
      options.onSuccess(response);
    },
    onError: options?.onError
      ? (err) => {
          if (options.onError) {
            const error = handleAllErrors(err);
            options.onError(error);
          }
        }
      : undefined,
  });

  return mutation;
}

export function useDeleteSettlementAccountMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(id: SettlementAccountType['id']) {
      return SettingsService.deleteSettlementAccount({ id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.SettlementAccount] });
      options.onSuccess(response);
    },
    onError: options?.onError
      ? (err) => {
          if (options.onError) {
            const error = handleAllErrors(err);
            options.onError(error);
          }
        }
      : undefined,
  });

  return mutation;
}
