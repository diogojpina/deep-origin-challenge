import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create an user' })
  @Post()
  async create(@Body() dto: UserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
