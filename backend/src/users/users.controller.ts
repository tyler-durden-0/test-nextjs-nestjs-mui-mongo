import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Patch('/:id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id) {
    return await this.usersService.update(updateUserDto, id);
  }
}
