import { Injectable } from '@nestjs/common';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { UpdateWebPageDto } from './dto/update-web-page.dto';

@Injectable()
export class WebPagesService {
  create(createWebPageDto: CreateWebPageDto) {
    return 'This action adds a new webPage';
  }

  findAll() {
    return `This action returns all webPages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webPage`;
  }

  update(id: number, updateWebPageDto: UpdateWebPageDto) {
    return `This action updates a #${id} webPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} webPage`;
  }
}
