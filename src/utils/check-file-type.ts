import { FundRequestFileUploadType } from '~/types';

function getFileTypeFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const extension = pathname.split('.').pop()?.toLowerCase();

    if (!extension) return 'file';

    const mimeTypes: Record<string, string> = {
      // Images
      jpg: 'image', //'image/jpeg',
      jpeg: 'image', //'image/jpeg',
      png: 'image', //'image/png',
      gif: 'image', //'image/gif',
      webp: 'image', //'image/webp',
      bmp: 'image', //'image/bmp',
      svg: 'image', //'image/svg+xml',

      // Documents
      pdf: 'pdf', //  'application/pdf',
      doc: 'file', // 'application/msword',
      docx: 'file', // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    return mimeTypes[extension] || 'file';
  } catch (error) {
    return 'file';
  }
}

export default async function checkFileType(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const contentType = (response.headers.get('Content-Type') || '').toLowerCase();
    if (contentType.includes('image')) return FundRequestFileUploadType.Image;
    if (contentType.includes('pdf')) return FundRequestFileUploadType.PDF;
    return FundRequestFileUploadType.File;
  } catch (err) {
    console.error(err);
    return getFileTypeFromUrl(url);
  }
}
