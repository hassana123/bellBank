import type {
  CreateStaffResponseType,
  CreateStaffType,
  PaginatedStaffResponseType,
  QueryListOptionsType,
  ResponseType,
  SingleStaffResponseType,
  StaffDashboardCardResponseType,
  StaffType,
  ToggleStaffStatusType,
  UpdateStaffResponseType,
  UpdateStaffType,
} from '~/types';
import HttpInstance from '~/utils/http';

import * as routes from '../config/routes';
import * as StaffSerializer from '../serializers/staff.serializer';
import * as FileService from '../services/file.service';
import type {
  ApiGetStaffDetailResponseType,
  ApiGetStaffPaginatedType,
  ApiResponseType,
  ApiStaffDashboardCardsType,
} from '../types';
import { createSearchUrl, getPaginationParamsFromResult } from '../utils/params';
import { NewSuccessDataResponse, NewSuccessResponse } from '../utils/response';

export async function getStaffDashboardCards({ token }: { token: string }): Promise<StaffDashboardCardResponseType> {
  const response = await HttpInstance.login(token)
    .get<ApiStaffDashboardCardsType>(routes.GET_STAFF_CARDS_URL)
    .then((response) => response.data);
  return NewSuccessDataResponse(StaffSerializer.serializeStaffDashboardCards(response.data), 'Fetched Cards');
}

export async function getAllStaff({
  token,
  filters,
}: {
  token: string;
  filters?: QueryListOptionsType;
}): Promise<PaginatedStaffResponseType> {
  const url = createSearchUrl(routes.GET_STAFF_URL, filters);
  const response = await HttpInstance.login(token)
    .get<ApiGetStaffPaginatedType>(url)
    .then((response) => response.data);
  const paginationParams = getPaginationParamsFromResult(response, filters);

  return NewSuccessDataResponse(
    {
      ...paginationParams,
      result: response.data.map((item) => StaffSerializer.serializeStaff(item)),
    },
    'Fetched Staff'
  );
}

export async function getStaffById({
  token,
  id,
}: {
  token: string;
  id: StaffType['id'];
}): Promise<SingleStaffResponseType> {
  const url = routes.GET_STAFF_DETAIL_URL(id);
  const response = await HttpInstance.login(token)
    .get<ApiGetStaffDetailResponseType>(url)
    .then((response) => response.data);

  return NewSuccessDataResponse(StaffSerializer.serializeStaff(response.data), 'Fetched Staff');
}

export async function createStaff({
  token,
  data,
}: {
  token: string;
  data: CreateStaffType;
}): Promise<CreateStaffResponseType> {
  const input = StaffSerializer.serializeCreateStaffInput(data);
  // Upload File
  if (((data.photo && data.photo.length) || 0) > 0) {
    const fileData = await FileService.uploadFile({ token, file: (data.photo || [])[0] }).then(
      (response) => response.data
    );
    input.photo = fileData.url;
  }

  await HttpInstance.login(token).post<ApiResponseType>(routes.CREATE_STAFF_URL, input);

  return NewSuccessResponse('You have successfully added a new staff');
}

export async function updateStaff({
  token,
  id,
  data,
}: {
  token: string;
  id: StaffType['id'];
  data: UpdateStaffType;
}): Promise<UpdateStaffResponseType> {
  const input = StaffSerializer.serializeUpdateStaffInput(data);
  // Upload File
  if (((data.photo && data.photo.length) || 0) > 0) {
    const fileData = await FileService.uploadFile({ token, file: (data.photo || [])[0] }).then(
      (response) => response.data
    );
    input.photo = fileData.url;
  }

  await HttpInstance.login(token).put<ApiResponseType>(routes.UPDATE_STAFF_URL(id), input);

  return NewSuccessResponse('You have successfully updated this staff record.');
}

export async function deleteStaff(_: { token: string; id: StaffType['id'] }): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: 'You have successfully deleted a staff',
      });
    }, 2000);
  });
}

export async function toggleStaffStatus({
  data,
}: {
  token: string;
  data: ToggleStaffStatusType;
}): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success' as const,
        message: data.action === 'suspend' ? 'Staff Suspended.' : 'Staff Activated.',
      });
    }, 2000);
  });
}
