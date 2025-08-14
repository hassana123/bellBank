import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as CardService from '~/server/services/card.service';
import type {
  CardQueryListOptionsType,
  CardRequestApprovalRequestType,
  CardRequestType,
  CardType,
  MutationOptionsType,
  PaginatedCardRequestResponseType,
  PaginatedCardResponseType,
  QueryListOptionsType,
  SingleCardRequestResponseType,
  SingleCardResponseType,
} from '~/types';

import { useUserContext } from '../contexts';
import tags from '../tags';
import { handleAllErrors } from '~/utils/errors';

// ****** Queries ******

export function useGetCardsQuery(options?: {
  initialData?: PaginatedCardResponseType;
  filters?: CardQueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedCardResponseType>({
    queryKey: [tags.Card, { key: 'CARD_LIST', filters }],
    async queryFn() {
      return CardService.getCards({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetCardByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleCardResponseType;
  id?: CardType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleCardResponseType>({
    queryKey: [tags.Card, { id }],
    enabled: !!id,
    async queryFn() {
      return CardService.getCardById({ token, id });
    },
    initialData,
  });

  return query;
}

export function useGetCardRequestsQuery(options?: {
  initialData?: PaginatedCardRequestResponseType;
  filters?: QueryListOptionsType;
}) {
  const { initialData, filters } = options || {};
  const { token } = useUserContext();

  const query = useQuery<PaginatedCardRequestResponseType>({
    queryKey: [tags.CardRequest, { key: 'CARD_REQUEST_LIST', filters }],
    async queryFn() {
      return CardService.getCardRequests({ filters, token });
    },
    initialData,
  });

  return query;
}

export function useGetCardRequestByIdQuery({
  initialData,
  id = 0,
}: {
  initialData?: SingleCardRequestResponseType;
  id?: CardRequestType['id'];
}) {
  const { token } = useUserContext();

  const query = useQuery<SingleCardRequestResponseType>({
    queryKey: [tags.CardRequest, { id }],
    enabled: !!id,
    async queryFn() {
      return CardService.getCardRequestById({ token, id });
    },
    initialData,
  });

  return query;
}

// ******* Mutations *******
export function useApproveOrDenyCardRequestMutation(options: MutationOptionsType) {
  const { token } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    async mutationFn(data: CardRequestApprovalRequestType) {
      return CardService.approveOrDenyCardRequest({ data, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.CardRequest] });
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
