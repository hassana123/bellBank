import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as StaffService from '~/server/services/staff.service';
import type {
  CreateStaffResponseType,
  CreateStaffType,
  MutationOptionsType,
  PaginatedStaffResponseType,
  QueryListOptionsType,
  SingleStaffResponseType,
  StaffDashboardCardResponseType,
  StaffType,
  ToggleStaffStatusType,
  UpdateStaffResponseType,
  UpdateStaffType,
} from '~/types';
import { handleAllErrors } from '~/utils/errors';

import { useUserContext } from '../contexts';
import tags from '../tags';

// ****** Queries ******

export function useGetStaffDashboardCardsQuery(options?: { initialData?: StaffDashboardCardResponseType }) {
  const { initialData } = options || {};
  const { token } = useUserContext();

  const query = useQuery<StaffDashboardCardResponseType>({
    queryKey: [tags.Staff, { key: 'DASHBOARD_CARDS' }],
    async queryFn() {
      return StaffService.getStaffDashboardCards({ token });
    },
    initialData,
  });

  return query;
}

export function useGetAllStaffQuery(options?: {
  initialData?: PaginatedStaffResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedStaffResponseType>({
    queryKey: [tags.Staff, { key: 'STAFF_LIST', filters }],
    async queryFn() {
      return StaffService.getAllStaff({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetStaffByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleStaffResponseType;
  id?: StaffType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleStaffResponseType>({
    queryKey: [tags.Staff, { id }],
    enabled: !!id,
    async queryFn() {
      return StaffService.getStaffById({ token, id });
    },
    initialData,
  });

  return query;
}

// ****** Mutations *******

export function useCreateStaffMutation(options: MutationOptionsType<CreateStaffResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: CreateStaffType) {
      return StaffService.createStaff({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Staff] });
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

export function useEditStaffMutation(options: MutationOptionsType<UpdateStaffResponseType['data']>) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn({ id, data }: { data: UpdateStaffType; id: StaffType['id'] }) {
      return StaffService.updateStaff({ data, id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Staff] });
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

export function useDeleteStaffMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(id: StaffType['id']) {
      return StaffService.deleteStaff({ id, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Staff] });
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

export function useToggleStaffStatusMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: ToggleStaffStatusType) {
      return StaffService.toggleStaffStatus({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Business] });
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
