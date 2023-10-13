import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/users.interface';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().select({__v: 0}).exec();
  };

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        age: createUserDto.age,
        email: createUserDto.email,
        country: createUserDto.country,
      });
      return await createdUser.save();
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    try {
      const user = await this.findUser(id);
      user.firstName = updateUserDto.firstName;
      user.email = updateUserDto.email;
      user.country = updateUserDto.country;
      return await user.save();
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
  }

  async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
      return user || null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.userModel.deleteOne({ "_id": id });
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.BAD_REQUEST);
    }
  }
}
