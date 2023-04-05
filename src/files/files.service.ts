import { existsSync } from 'fs';
import { join } from 'path';

import { Injectable, BadRequestException } from '@nestjs/common';
import { FileBy } from './interfaces';

@Injectable()
export class FilesService {
  
    getStaticWebPageImage( fileBy: FileBy,imageName: string ) {

        const path = join( __dirname, `../../static/assets/${fileBy}`, imageName );

        if ( !existsSync(path) ) 
            throw new BadRequestException(`No web page found with image ${ imageName }`);

        return path;
    }

    getAllFileBy(){
        return Object.values(FileBy)
    }

}
