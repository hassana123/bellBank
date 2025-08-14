import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as AuthService from '~/server/services/auth.service';

import { useAuthContext, useUserContext } from '../contexts';
import tags from '../tags';
import { AppError, handleAllErrors } from '../../utils/errors';

import type {
  ChangePasswordRequestDataType,
  ConfirmResetPasswordRequestDataType,
  LoginRequestDataType,
  LoginResponseType,
  MutationOptionsType,
  ResetPasswordRequestDataType,
  ResetPasswordResponseType,
  VerifyResetPasswordRequestDataType,
  VerifyResetPasswordResponseType,
} from '../../types';

// ****** Queries ******

// get auth status
export function useGetAuthQuery({ initialData }: { initialData?: LoginResponseType }) {
  const query = useQuery<LoginResponseType>({
    queryKey: [tags.Auth],
    retry: false,
    async queryFn() {
      return AuthService.getAuth();
    },
    initialData,
  });

  return query;
}

// ****** Mutations ******

// login
export function useLoginMutation(options: MutationOptionsType<LoginResponseType['data']>) {
  const { csrfToken } = useAuthContext();

  const mutation = useMutation({
    async mutationFn(data: LoginRequestDataType) {
      if (!csrfToken) throw new AppError(500, 'CSRF Token is required.');
      return AuthService.login({ csrfToken, data });
    },
    onSuccess(response) {
      options.onSuccess(response);
    },
  });

  return mutation;
}

// logout
export function useLogoutMutation(options: MutationOptionsType) {
  const queryClient = useQueryClient();

  const { csrfToken, token } = useUserContext();

  const mutation = useMutation({
    async mutationFn() {
      return AuthService.logout({ csrfToken, token });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: [tags.Auth] });
      queryClient.clear();
      options.onSuccess(response);
    },
  });

  return mutation;
}

// reset password
export function useResetPasswordMutation(options: MutationOptionsType<ResetPasswordResponseType['data']>) {
  const mutation = useMutation({
    async mutationFn(data: ResetPasswordRequestDataType) {
      return AuthService.resetPassword({ data });
    },
    onSuccess(response) {
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

// verify password reset
export function useVerifyResetPasswordMutation(options: MutationOptionsType<VerifyResetPasswordResponseType['data']>) {
  const mutation = useMutation({
    async mutationFn(data: VerifyResetPasswordRequestDataType) {
      return AuthService.verifyPassword(data);
    },
    onSuccess(response) {
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

// confirm password reset
export function useConfirmResetPasswordMutation(options: MutationOptionsType) {
  const mutation = useMutation({
    async mutationFn(form: ConfirmResetPasswordRequestDataType) {
      return AuthService.confirmPasswordReset(form);
    },
    onSuccess(response) {
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

// change password
export function useChangePasswordMutation(options: MutationOptionsType) {
  const { token } = useUserContext();

  const mutation = useMutation({
    async mutationFn(data: ChangePasswordRequestDataType) {
      return AuthService.changePassword({ token, data });
    },
    onSuccess(response) {
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
