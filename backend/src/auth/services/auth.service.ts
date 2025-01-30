import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return await this.createToken(user);
  }

  async createToken(user: UserDocument): Promise<string> {
    const payload = {
      user: {
        id: user._id,
        _id: user._id,
        username: user.username,
      },
    };

    return await this.jwtService.signAsync(payload);
  }
}
