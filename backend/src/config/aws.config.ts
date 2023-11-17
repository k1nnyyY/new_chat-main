import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
    credentials: {
      accessKeyId: 'YCAJER9Rv488Iew0t7SO7my8d',
      secretAccessKey: 'YCMGWdvD8Yrx37g2VFsouoj3Kw3D637xGKOv9mc2',
    },
    endpoint: 'https://storage.yandexcloud.net/korpustage',
    region: 'ru-central1',
  });