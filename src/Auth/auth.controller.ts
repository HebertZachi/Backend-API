import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/user-dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/decorators/public-route';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('/signup')
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body);
  }

  @Public()
  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    return await this.authService.authentication(body);
  }
}
