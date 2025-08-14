import type { ApiResponseType } from './base';

export type ApiFileUploadResponseType = ApiResponseType<{
  url: string;
  message: string;
  key: string;
}>;
