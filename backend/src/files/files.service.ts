import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInfo } from './dto';
import { Upload } from '@aws-sdk/lib-storage';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FileOwner } from './entities';
import { FILES_DEST } from '../constants';
import * as fs from 'fs';
export const makeFilename = (name: string) => `${Date.now()}-${name}`;
export const makeKey = (destination: string, filename: string) =>
  `${destination}/${filename}`;

@Injectable()
export class FilesService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: 'YCAJER9Rv488Iew0t7SO7my8d',
        secretAccessKey: 'YCMGWdvD8Yrx37g2VFsouoj3Kw3D637xGKOv9mc2',
      },
      endpoint: 'https://storage.yandexcloud.net/',
      region: 'ru-central1',
    });
  }

  getFileDestination(owner: FileOwner): string {
    const {
      eventId,
      messageSender,
      audioSender,
      relativeId,
      userId,
      eventCommentId,
      videoSender,
    } = owner;
    if (eventId) return `${FILES_DEST.EVENTS_DIR}/${eventId}`;
    if (messageSender) return `${FILES_DEST.MESSAGES_IMG_DIR}/${messageSender}`;
    if (relativeId) return `${FILES_DEST.RELATIVES_DIR}/${relativeId}`;
    if (audioSender) return `${FILES_DEST.MESSAGES_AUDIO_DIR}/${audioSender}`;
    if (videoSender) return `${FILES_DEST.MESSAGES_VIDEO_DIR}/${videoSender}`;
    if (eventCommentId) return `${FILES_DEST.EVENT_COMMENTS_DIR}/${eventCommentId}`;
    if (userId) return `${FILES_DEST.USERS_DIR}/${userId}`;
  }

  async uploadFile(file, destination: string): Promise<FileInfo> {
    const { filename: _filename, path } = file;
    const filename = makeFilename(_filename);
    const key = makeKey(destination, filename);
    const bucket = 'korpustage';
    try {
      const readStream = fs.createReadStream(path); // Создайте поток чтения здесь
      const upload = new Upload({
        client: this.s3,
        params: {
          Key: key,
          Body: readStream,
          Bucket: bucket,
        },
      });
      await upload.done();
      return { filename, originalFilename: _filename, path: `${bucket}/${key}` };
    } catch (error) {
      console.error(error);
    }
  }

  _excludeBucketFromPath(path: string, bucket: string): string {
    return path.replace(new RegExp(`${bucket}/`), '');
  }

  async removeFileFromStorage(path: string): Promise<void> {
    const bucket = this.configService.get<string>('S3_BUCKET');
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: this._excludeBucketFromPath(path, bucket),
      }),
    );
  }
}
