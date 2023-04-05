import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags  } from '@nestjs/swagger';

import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Skill } from './entities';
import { SkillsService } from './skills.service';
import { CreateSkillDto,UpdateSkillDto } from './dto';
import { HttpErrorResponse } from 'src/common/class';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Skill was created', type: Skill  })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 400, description: 'Bad request' ,type: HttpErrorResponse})
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.', type: HttpErrorResponse })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'List of Skills', type: Skill, isArray:true })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':term')
  @ApiParam({name:"term", description: "By Id or Title"})
  @ApiResponse({ status: 200, description: 'Return a Skill', type: Skill})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  findOne(
    @Param('term') term: string
    ) {
    return this.skillsService.findOne(term);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return a Skill', type: Skill})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateSkillDto: UpdateSkillDto
    ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Delete a Skill'})
  @ApiResponse({ status: 400, description: 'Bad request', type: HttpErrorResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpErrorResponse})
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.skillsService.remove(id);
  }
}
