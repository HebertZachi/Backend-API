import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/user-dto';
import { Serialize } from 'src/interceptors/passwordSerialize';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(UpdateUserDto)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(parseInt(id));
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(parseInt(id));
  }
}
