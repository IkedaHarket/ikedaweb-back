import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { CreateAlbumResponse } from './responses';
import { HttpErrorResponse } from 'src/common/class';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities';

@ApiTags("Album")
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Album was created', type: CreateAlbumResponse  })
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.', type: HttpErrorResponse })
  create(
    @Body() createAlbumDto: CreateAlbumDto,
    @GetUser() user: User,
    ) {
    return this.albumService.create(createAlbumDto, user);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Paginated album list', type: CreateAlbumResponse , isArray: true })
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.albumService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get album', type: CreateAlbumResponse })
  @ApiResponse({ status: 404, description: 'Album not found' ,type: HttpErrorResponse})
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Album was updated', type: CreateAlbumResponse  })
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.', type: HttpErrorResponse })
  update(
    @Param('id',ParseUUIDPipe) id: string, 
    @Body() updateAlbumDto: UpdateAlbumDto,
    @GetUser() user: User,
    ) {
    return this.albumService.update(id, updateAlbumDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Album was deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.', type: HttpErrorResponse })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
