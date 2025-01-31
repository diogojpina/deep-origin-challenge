import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/sign.in.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log-in into' })
  @Public()
  @Post('login')
  async signIn(@Body() data: SignInDto): Promise<any> {
    const token = await this.authService.login(data.username, data.password);
    return { token };
  }
}
