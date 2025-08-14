import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as FundRequestService from '~/server/services/fund-request.service';
import type {
  FundRequestApprovalRequestType,
  FundRequestType,
  MutationOptionsType,
  PaginatedFundRequestResponseType,
  QueryListOptionsType,
  SingleFundRequestResponseType,
} from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';
import { handleAllErrors } from '~/utils/errors';

// ****** Queries ******

export function useGetFundRequestsQuery(options?: {
  initialData?: PaginatedFundRequestResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedFundRequestResponseType>({
    queryKey: [tags.FundRequest, { key: 'FUND_REQUEST_LIST', filters }],
    async queryFn() {
      return FundRequestService.getFundRequests({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetFundRequestByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleFundRequestResponseType;
  id?: FundRequestType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleFundRequestResponseType>({
    queryKey: [tags.FundRequest, { id }],
    enabled: !!id,
    async queryFn() {
      return FundRequestService.getFundRequestById({ token, id });
    },
    initialData,
  });

  return query;
}

// ******* Mutations *******
export function useApproveOrDenyFundRequestMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: FundRequestApprovalRequestType) {
      return FundRequestService.approveOrDenyFundRequest({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.FundRequest] });
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
