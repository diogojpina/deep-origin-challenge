import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username });
  }

  async create(dto: UserDto): Promise<User> {
    dto.password = await bcrypt.hash(dto.password, 10);
    try {
      return await new this.userModel({
        ...dto,
      }).save();
    } catch (error) {
      console.log('error', error);
      throw new HttpException('Duplicated username', HttpStatus.BAD_REQUEST);
    }
  }
}
