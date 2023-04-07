import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports:[
    TypeOrmModule.forFeature([ Job ]),
    AuthModule
  ],
  exports: [ TypeOrmModule ]
})
export class JobsModule {}
