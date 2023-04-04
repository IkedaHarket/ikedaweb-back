import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { UpdateWebPageDto } from './dto/update-web-page.dto';

@Controller('web-pages')
export class WebPagesController {
  constructor(private readonly webPagesService: WebPagesService) {}

  @Post()
  create(@Body() createWebPageDto: CreateWebPageDto) {
    return this.webPagesService.create(createWebPageDto);
  }

  @Get()
  findAll() {
    return this.webPagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webPagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebPageDto: UpdateWebPageDto) {
    return this.webPagesService.update(+id, updateWebPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webPagesService.remove(+id);
  }
}
