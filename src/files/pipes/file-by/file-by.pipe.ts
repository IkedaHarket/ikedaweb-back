import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { FileBy } from 'src/files/interfaces';

@Injectable()
export class FileByPipe implements PipeTransform {
  
  transform(value: FileBy, metadata: ArgumentMetadata) {
    
    if(!Object.values(FileBy).includes(value)){
      const validFilesBy: string = Object.values(FileBy).join(', ').toString()
      throw new BadRequestException(`FileBY must be [ ${ validFilesBy } ]`);
    }

    return value
  }
}
