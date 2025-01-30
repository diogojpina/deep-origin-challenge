import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { SignInDto } from '../dtos/sign,in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async signIn(@Body() data: SignInDto): Promise<any> {
    const token = await this.authService.login(data.username, data.password);
    return { token };
  }
}
