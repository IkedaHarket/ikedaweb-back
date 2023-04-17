import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Configuration } from './entities';
import { HttpErrorResponse } from 'src/common/class';

@ApiTags("Configurations")
@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Configuration was created or updated', type: Configuration  })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.', type: HttpErrorResponse })
  createOrUpdate(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationsService.update(createConfigurationDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return the configuration', type: Configuration  })
  findAll() {
    return this.configurationsService.find();
  }
  
}
