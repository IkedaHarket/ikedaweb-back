import * as fs from 'fs';
import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { HttpErrorResponse } from 'src/common/class';
import { WebPageResponse } from './responses';
import { FileByPipe } from './pipes/file-by/file-by.pipe';
import { FileBy } from './interfaces';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':fileBy/:fileName')
  @ApiParam({ name: 'fileBy', enum: FileBy })
  findWebPageImage(
    @Res() res: Response,
    @Param('fileName') fileName: string,
    @Param("fileBy",FileByPipe) fileBy: FileBy,
  ) {
    const path = this.filesService.getStaticWebPageImage(fileBy, fileName );
    res.sendFile( path );
  }

  @Get('fileBy')
  @Auth()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Web page was created', type: String, isArray: true  })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  getAllFileBy() {
    return this.filesService.getAllFileBy()
  }

  @Post(':fileBy')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'fileBy', enum: FileBy })
  @ApiResponse({ status: 201, description: 'Web page was created', type: WebPageResponse  })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @UseInterceptors( 
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 1000 }
      storage: diskStorage({
        destination: (req, file, callback)=>  callback(null,`./static/assets/${req.params.fileBy}`),
        filename: fileNamer
      })
    })
   )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadWebPageImage( 
    @UploadedFile() file: Express.Multer.File,
    @Param("fileBy",FileByPipe) fileBy: FileBy,
  ){
    if ( !file )  throw new BadRequestException('Make sure that the file is an image');
    const secureUrl = `${ this.configService.get('HOST_API') }/files/${fileBy}/${ file.filename }`;
    return new WebPageResponse(secureUrl);
  }

  @Delete(":fileBy/:fileName")
  @Auth(ValidRoles.admin)
  @ApiParam({ name: 'fileBy', enum: FileBy })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'File deleted successfully'  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpErrorResponse})
  deleteWebPageImage( 
    @Param("fileName") fileName:string,
    @Param("fileBy",FileByPipe) fileBy: FileBy,
    ){
      fs.unlink(this.filesService.getStaticWebPageImage(fileBy,fileName), ()=>{} )
  }

}
