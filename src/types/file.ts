import type { ResponseType } from './base';

export type UploadFileRequestDataType = FormData | { id: number; title: string; form: FormData }[];

export type FileUploadResponseType = ResponseType<{ url: string }>;
export type FilesUploadResponseType = ResponseType<{ id: number; title: string; url: string }[]>;

// ****** Externals ************
