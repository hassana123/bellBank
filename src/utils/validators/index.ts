export async function validateFiles(value: File[] = [], options?: ValidateFileOptions) {
  const { allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'], maxFileSizeMB = 5, required = true } = options || {};
  if (required && (!value || value.length < 1)) {
    // If the required rule handles this, you might not need it here
    // But it's good to be explicit if this validator is used stand-alone
    return Promise.reject(new Error('Please upload at least one file!'));
  }

  for (const file of value) {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return Promise.reject(
        new Error(`File type ${file.name} (${file.type}) is not allowed. Only JPG and PNG are allowed.`)
      );
    }

    // Check file size
    if (file.size / 1024 / 1024 > maxFileSizeMB) {
      return Promise.reject(new Error(`File ${file.name} must be smaller than ${maxFileSizeMB}MB.`));
    }
  }
  return Promise.resolve(); // Validation passed
}

type ValidateFileOptions = {
  allowedTypes?: string[];
  maxFileSizeMB?: number;
  required?: boolean;
};
