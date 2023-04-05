import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album, AlbumImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports:[
    TypeOrmModule.forFeature([ Album, AlbumImage ]),
    AuthModule
  ],
  exports:[
    TypeOrmModule
  ]
})
export class AlbumModule {}
