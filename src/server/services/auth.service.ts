import { CSRF_TOKEN } from '~/config/app';
import type {
  ChangePasswordRequestDataType,
  ConfirmResetPasswordRequestDataType,
  LoginRequestDataType,
  LoginResponseType,
  ResetPasswordRequestDataType,
  ResetPasswordResponseType,
  ResponseType,
  VerifyResetPasswordRequestDataType,
  VerifyResetPasswordResponseType,
} from '~/types';
import { AppError } from '~/utils/errors';
import HttpInstance from '~/utils/http';
import * as routes from '../config/routes';
import * as AuthSerializer from '../serializers/auth.serializer';
import type {
  ApiConfirmPasswordResetResponseType,
  ApiForgotPasswordResponseType,
  ApiLoginResponseType,
  ApiVerifyPasswordOtpResponseType,
} from '../types';
import { saveCredentials } from '../utils/auth';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

export async function getAuth(): Promise<LoginResponseType> {
  const response = await HttpInstance.current().get<LoginResponseType>(routes.AUTHENTICATION_URL);
  const responseData = response.data;

  // Get the CSRF_TOKEN FROM THE HEADERS
  let csrfToken = responseData.data.csrfToken;
  if (!csrfToken && typeof response.headers.get === 'function' && response.headers.get(CSRF_TOKEN) !== undefined) {
    csrfToken = response.headers.get(CSRF_TOKEN)?.toString() || '';
  }
  if (!csrfToken) throw new AppError(400, 'CSRF TOKEN was not provided');

  const result = { ...responseData.data, csrfToken };

  return NewSuccessDataResponse(result, responseData.message);
}

export async function login({
  csrfToken,
  data,
}: {
  csrfToken: string;
  data: LoginRequestDataType;
}): Promise<LoginResponseType> {
  const response = await HttpInstance.csrf(csrfToken)
    .post<ApiLoginResponseType>(routes.LOGIN_URL, { userId: data.email, password: data.password })
    .then((response) => response.data);

  const credentials = AuthSerializer.serializeLogin(csrfToken, response);

  // Save credentials to the express server side cookies
  const result = await saveCredentials(csrfToken, { token: credentials.token, user: credentials.user });

  return result;
}

export async function logout({ csrfToken, token }: { csrfToken: string; token: string }): Promise<ResponseType> {
  const response = await HttpInstance.login(token, csrfToken)
    .post<ResponseType>('/api/auth/logout/', {})
    .then((response) => response.data);

  return NewSuccessResponse(response.message);
}

export async function resetPassword({
  data,
}: {
  data: ResetPasswordRequestDataType;
}): Promise<ResetPasswordResponseType> {
  const response = await HttpInstance.current()
    .post<ApiForgotPasswordResponseType>(routes.FORGOT_PASSWORD_URL, data)
    .then((response) => response.data);
  return NewSuccessDataResponse({ token: response.token }, 'Password Reset Email Sent.');
}

export async function verifyPassword({
  otp,
  token,
}: VerifyResetPasswordRequestDataType): Promise<VerifyResetPasswordResponseType> {
  const response = await HttpInstance.login(token)
    .post<ApiVerifyPasswordOtpResponseType>(routes.VERIFY_PASSWORD_RESET_URL, { otp })
    .then((response) => response.data);
  return NewSuccessDataResponse({ token: response.token }, 'Password Reset Verified.');
}

export async function confirmPasswordReset({
  token,
  password,
}: ConfirmResetPasswordRequestDataType): Promise<ResponseType> {
  await HttpInstance.login(token).post<ApiConfirmPasswordResetResponseType>(routes.RESET_PASSWORD_URL, { password });
  return NewSuccessResponse('Password Reset Confirmed.');
}

export async function changePassword({
  token,
  data,
}: {
  token: string;
  data: ChangePasswordRequestDataType;
}): Promise<ResponseType> {
  if (data.newPassword !== data.confirmPassword)
    throw new AppError(400, 'Password confirmation is invalid', { confirmPassword: 'Password does not match' });
  await HttpInstance.login(token).post(routes.CHANGE_PASSWORD_URL, {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  });
  return NewSuccessResponse('Password change was successful');
}
