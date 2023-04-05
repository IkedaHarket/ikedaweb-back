import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { Configuration } from './entities';

@Injectable()
export class ConfigurationsService {

  private readonly logger = new Logger("ConfigurationsService")

  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository : Repository<Configuration>,
    private readonly dataSource: DataSource
  ){}

  async update(createConfigurationDto: CreateConfigurationDto) {
    const oldConfiguration = await this.find();

    const { ...toUpdate } = createConfigurationDto;
    try {
      if(Object.keys(oldConfiguration).length === 0){
        const configuration = this.configurationRepository.create(createConfigurationDto);
        await this.configurationRepository.save( configuration )
        return configuration;
      }

      const configuration = await this.configurationRepository.preload({ id: oldConfiguration.id, ...toUpdate });

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save( configuration );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return configuration;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async find():Promise<Configuration> {
    const configuration = await this.configurationRepository.find();
    if(configuration.length === 0) return {} as Configuration
    return {
      ...configuration[0],
      contact: JSON.parse(configuration[0].contact as string),
      socialNetwork: configuration[0].socialNetwork.map((s)=> JSON.parse(s as unknown as string)),
      webPage: JSON.parse(configuration[0].webPage as unknown as string)
    } as Configuration
  }
  
  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
