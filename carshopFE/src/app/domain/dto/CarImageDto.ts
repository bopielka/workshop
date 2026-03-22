import { ImageContentType } from '@/app/domain/types/ImageContentType';

export interface CarImageDto {
  id: string;
  filename: string;
  contentType: ImageContentType;
  size: number;
  isMain: boolean;
}
