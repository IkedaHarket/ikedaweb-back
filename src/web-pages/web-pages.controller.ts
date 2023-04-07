import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { UpdateWebPageDto } from './dto/update-web-page.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { WebPage } from './entities';
import { HttpErrorResponse } from 'src/common/class';

@ApiTags("WebPages")
@Controller('web-pages')
export class WebPagesController {
  
  constructor(private readonly webPagesService: WebPagesService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Web page was created', type: WebPage  })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpErrorResponse })
  create(@Body() createWebPageDto: CreateWebPageDto) {
    return this.webPagesService.create(createWebPageDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Web page was created', type: WebPage, isArray: true })
  findAll() {
    return this.webPagesService.findAll();
  }

  @Get(':term')
  @ApiParam({name:"term", description: "By Id or Title"})
  @ApiResponse({ status: 200, description: 'Return a Web Page', type: WebPage})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  findOne(@Param('term') term: string) {
    return this.webPagesService.findOne(term);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Update a Web Page', type: WebPage})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateWebPageDto: UpdateWebPageDto) {
    return this.webPagesService.update(id, updateWebPageDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Delete a Web Page'})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  remove(
    @Param('id', ParseUUIDPipe) id: string
    ) {
    return this.webPagesService.remove(id);
  }
}
