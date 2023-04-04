import { Module } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { WebPagesController } from './web-pages.controller';

@Module({
  controllers: [WebPagesController],
  providers: [WebPagesService]
})
export class WebPagesModule {}
