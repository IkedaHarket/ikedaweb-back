import { Module } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { WebPagesController } from './web-pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WebPage } from './entities';

@Module({
  controllers: [WebPagesController],
  providers: [WebPagesService],
  imports: [
    TypeOrmModule.forFeature( [ WebPage ] ),
    AuthModule
  ],
  exports:[TypeOrmModule]
})
export class WebPagesModule {}
