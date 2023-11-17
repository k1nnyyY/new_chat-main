import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlinkSync } from 'fs';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }))
    async uploadFile(@UploadedFile() file) {
      const destination = 'test/1'; // Определите место назначения ваших файлов
      const result = await this.fileService.uploadFile(file, destination);
      try {
        unlinkSync(file.path);
        return result;
      } catch (error) {
        console.error('Ошибка при удалении файла', error);
      }    
    }}
