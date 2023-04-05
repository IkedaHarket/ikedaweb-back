import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  imports: [
    TypeOrmModule.forFeature([Configuration]),
    AuthModule
  ],
  exports:[
    TypeOrmModule
  ]
})
export class ConfigurationsModule {}
