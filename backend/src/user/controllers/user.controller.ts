import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() dto: UserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
