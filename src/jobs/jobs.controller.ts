import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from './entities';
import { HttpErrorResponse } from 'src/common/class';

@ApiTags("Work experience")
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Album was created', type: Job  })
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.', type: HttpErrorResponse })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Job was created', type: Job, isArray: true })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a job', type: Job})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.jobsService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Update a job', type: Job})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Delete a job'})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
