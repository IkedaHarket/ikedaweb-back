import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GetUser, Auth } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { CheckAuthStatusResponse, CreateUserResponse, LoginResponse } from './responses'
import { HttpErrorResponse } from 'src/common/class';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Register a user', type: CreateUserResponse})
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpErrorResponse})
  createUser(
    @Body() createUserDto: CreateUserDto 
    ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login a user', type: LoginResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized', type: HttpErrorResponse})
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get('check-status')
  @Auth()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Renew Token', type: CheckAuthStatusResponse})
  @ApiResponse({ status: 403, description: 'Forbidden', type: HttpErrorResponse})
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }


  // @Get('private')
  // @UseGuards( AuthGuard() )
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,
    
  //   @RawHeaders() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {


  //   return {
  //     ok: true,
  //     message: 'Hola Mundo Private',
  //     user,
  //     userEmail,
  //     rawHeaders,
  //     headers
  //   }
  // }


  // @SetMetadata('roles', ['admin','super-user'])

  // @Get('private2')
  // @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
  // @UseGuards( AuthGuard(), UserRoleGuard )
  // privateRoute2(
  //   @GetUser() user: User
  // ) {

  //   return {
  //     ok: true,
  //     user
  //   }
  // }


  // @Get('private3')
  // @Auth( ValidRoles.admin )
  // privateRoute3(
  //   @GetUser() user: User
  // ) {

  //   return {
  //     ok: true,
  //     user
  //   }
  // }



}
