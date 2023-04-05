import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { UpdateWebPageDto } from './dto/update-web-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WebPage } from './entities';
import { isUUID } from 'class-validator';

@Injectable()
export class WebPagesService {

  private readonly logger = new Logger("WebPagesService");

  constructor(
    @InjectRepository(WebPage)
    private readonly webPageRepository: Repository<WebPage>,
    private readonly dataSource: DataSource,
  ){}

  async create(createWebPageDto: CreateWebPageDto) {
    try {
      const webPage = this.webPageRepository.create(createWebPageDto);
      await this.webPageRepository.save( webPage )
      return webPage;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.webPageRepository.find();
  }

  async findOne(term: string) {
    let webPage: WebPage;

    if ( isUUID(term) ) {
      webPage = await this.webPageRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.webPageRepository.createQueryBuilder('webPage'); 
      webPage = await queryBuilder
        .where('UPPER(title) =:title', {
          title: term.toUpperCase(),
        })
        .getOne();
    }


    if ( !webPage ) 
      throw new NotFoundException(`Web page with ${ term } not found`);

    return webPage;
  }

  async update(id: string, updateWebPageDto: UpdateWebPageDto) {
    const { ...toUpdate } = updateWebPageDto;

    const webPage = await this.webPageRepository.preload({ id, ...toUpdate });

    if ( !webPage ) throw new NotFoundException(`Web page with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      await queryRunner.manager.save( webPage );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return webPage;
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const webPage = await this.findOne( id );
    await this.webPageRepository.remove( webPage );
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
      
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
