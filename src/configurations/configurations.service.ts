import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from './entities';
import { Repository } from 'typeorm';
import { SocialNetwork } from './class';

@Injectable()
export class ConfigurationsService {

  private readonly logger = new Logger("ConfigurationsService")

  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository : Repository<Configuration>
  ){}

  async update(createConfigurationDto: CreateConfigurationDto) {
    try {
      const configuration = this.configurationRepository.create(createConfigurationDto);
      await this.configurationRepository.save( configuration )
      return configuration;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const configuration = await this.configurationRepository.find();
    return {
      ...configuration[0],
      contact: JSON.parse(configuration[0].contact as string),
      socialNetwork: configuration[0].socialNetwork.map((s)=> JSON.parse(s as unknown as string)) 
    } as Configuration
  }

  remove(id: number) {
    return `This action removes a #${id} configuration`;
  }
  
  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
