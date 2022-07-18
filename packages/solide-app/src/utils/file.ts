import { FileType } from '../types';

export const formatFileName = (file: FileType) => {
  return `${file.fileName}${file.extension ? `.${file.extension}` : ''}`;
};

export const formatFilePath = (file: FileType) => {
  return `${file.path}/${formatFileName(file)}`;
};
