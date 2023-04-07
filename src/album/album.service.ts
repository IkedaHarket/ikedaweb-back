import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album, AlbumImage } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities';

@Injectable()
export class AlbumService {

  private readonly logger = new Logger("AlbumService")

  constructor(
    @InjectRepository(Album)
    private readonly albumRepository : Repository<Album>,
    @InjectRepository(AlbumImage)
    private readonly albumImageRepository : Repository<AlbumImage>,
    private readonly dataSource: DataSource,
  ){}

  async create(createAlbumDto: CreateAlbumDto, user: User) {
    try {
      const { images = [], ...albumDetails } = createAlbumDto;

      const album = this.albumRepository.create({
        ...albumDetails,
        images: images.map( image => this.albumImageRepository.create({ url: image }) ),
        user
      });
      
      await this.albumRepository.save( album );

      return album;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const albums = await this.albumRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })

    return albums
  }

  async findOne(id: string) {

    const album = await this.albumRepository.findOneBy({ id });

    if(!album) throw new NotFoundException(`Album with ${ id } not found`);

    return album
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto, user: User) {
    const { images, ...toUpdate } = updateAlbumDto;

    const album = await this.albumRepository.preload({ id, ...toUpdate });

    if ( !album ) throw new NotFoundException(`Album with id: ${ id } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if( images ) {
        await queryRunner.manager.delete( AlbumImage, { album: { id } })
        album.images = images.map( 
          image => this.albumImageRepository.create({ url: image }) 
        )
      }
      
      album.user = user
      await queryRunner.manager.save( album );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne( id );
    await this.albumRepository.remove( product );
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
      
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
