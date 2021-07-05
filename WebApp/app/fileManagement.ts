import isMongoId from 'validator/lib/isMongoId';

export const MAX_FILE_SIZE = (1024 ** 2) * 10;
export const SUPPORTED_IMAGE_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];

export const fileSizeValidation = (file: File | string, maxSize: number): boolean => {
  try {
    if (file === undefined) { return true; }
    if (typeof file === "string") {
      return isMongoId(file);
    } else {
      return (file.size <= maxSize);
    }
  } catch (error) {
    return true;
  }
};

export const fileTypeValidation = (file: File | string, types: Array<string>): boolean => {
  try {
    if (file === undefined) { return true; }
    if (typeof file === "string") {
      return isMongoId(file);
    } else {
      return (types.includes(file.type));;
    }
  } catch (error) {
    return true;
  }
}
