import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl } from '../schemas/short.url.schema';
import { ShortenerService } from '../services/shortener.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-access.decorator';
import { User } from 'src/user/schemas/user.schema';
import { PrivatePublic } from 'src/auth/decorator/private.public.decorator';
import { Private } from 'src/auth/decorator/private.decorator';

@ApiTags('Shortener')
@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @ApiOperation({ summary: 'Create a short URL' })
  @PrivatePublic()
  @Post('/short')
  async shorUrl(
    @Body() data: ShortUrlDto,
    @CurrentUser() currentUser: User,
  ): Promise<ShortUrl> {
    console.log('currentUser', currentUser);
    return await this.shortenerService.create(data, currentUser);
  }

  @ApiOperation({ summary: 'List short URLs from a authenticated user' })
  @Private()
  @Get('')
  async list(@CurrentUser() currentUser: User): Promise<ShortUrl[]> {
    console.log('curser', currentUser);
    return await this.shortenerService.listByUser('');
  }
}
