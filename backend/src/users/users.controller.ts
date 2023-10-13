import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findUser(id);
  }

  @Patch('/:id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return await this.usersService.update(updateUserDto, id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
