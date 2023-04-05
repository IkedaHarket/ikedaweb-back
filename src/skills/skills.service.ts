import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateSkillDto,UpdateSkillDto } from './dto';
import { Skill } from './entities';

@Injectable()
export class SkillsService {

  private readonly logger = new Logger('SkillsService');

  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository : Repository<Skill>,
    private readonly dataSource: DataSource,
  ){}

  async create(createSkillDto: CreateSkillDto) {
    try {
      const skill = this.skillRepository.create(createSkillDto);
      await this.skillRepository.save( skill )
      return skill;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(term: string) {
    let skill: Skill;

    if ( isUUID(term) ) {
      skill = await this.skillRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.skillRepository.createQueryBuilder('skill'); 
      skill = await queryBuilder
        .where('UPPER(title) =:title', {
          title: term.toUpperCase(),
        })
        .getOne();
    }


    if ( !skill ) 
      throw new NotFoundException(`Skill with ${ term } not found`);

    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const { ...toUpdate } = updateSkillDto;


    const skill = await this.skillRepository.preload({ id, ...toUpdate });

    if ( !skill ) throw new NotFoundException(`Skill with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      // await this.skillRepository.save( skill );
      
      await queryRunner.manager.save( skill );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return skill;
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const skill = await this.findOne( id );
    await this.skillRepository.remove( skill );
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
