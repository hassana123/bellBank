import type { UploadFileType } from '~/components/controls';
import type { FileUploadResponseType } from '~/types';
import { AppError } from '~/utils/errors';
import HttpInstance from '~/utils/http';

import { FILE_UPLOAD_URL } from '../config/routes';
import type { ApiFileUploadResponseType } from '../types';
import { NewSuccessDataResponse } from '../utils/response';

export async function uploadFile({
  file,
  token,
}: {
  file: UploadFileType;
  token?: string;
}): Promise<FileUploadResponseType> {
  if (!file.originFileObj) throw new AppError(500, 'Failed to retrieve file upload from temp');
  const httpInstance = token ? HttpInstance.login(token) : HttpInstance.current();
  const formData = new FormData();
  formData.append('file', file.originFileObj);

  const response = await httpInstance
    .post<ApiFileUploadResponseType>(FILE_UPLOAD_URL, formData, {
      headers: {
        'Content-Type': undefined,
      },
    })
    .then((response) => response.data);

  return NewSuccessDataResponse({ url: response.data.url }, 'File Uploaded');
}
