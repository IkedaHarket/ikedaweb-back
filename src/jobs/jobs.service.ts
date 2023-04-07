import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class JobsService {

  private readonly logger = new Logger("JobsService")

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository : Repository<Job>,
    private readonly dataSource: DataSource,
  ){}

  async create(createJobDto: CreateJobDto) {
    try {
      const job = this.jobRepository.create(createJobDto);
      await this.jobRepository.save( job )
      return job;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.jobRepository.find();
  }

  async findOne(id: string) {
    const job = await this.jobRepository.findOneBy({ id });

    if(!job) throw new NotFoundException(`Job with ${ id } not found`);

    return job
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const { ...toUpdate } = updateJobDto;

    const job = await this.jobRepository.preload({ id, ...toUpdate });

    if ( !job ) throw new NotFoundException(`Job with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      await queryRunner.manager.save( job );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return job;
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const job = await this.findOne( id );
    await this.jobRepository.remove( job );
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
