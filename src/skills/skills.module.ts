import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports:[
    TypeOrmModule.forFeature( [ Skill ] ),
    AuthModule
  ],
  exports: [
    TypeOrmModule
  ]
})
export class SkillsModule {}
