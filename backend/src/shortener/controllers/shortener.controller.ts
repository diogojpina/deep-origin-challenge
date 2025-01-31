import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl } from '../schemas/short.url.schema';
import { ShortenerService } from '../services/shortener.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-access.decorator';
import { User } from 'src/user/schemas/user.schema';
import { PrivatePublic } from 'src/auth/decorator/private.public.decorator';
import { Private } from 'src/auth/decorator/private.decorator';
import { ShortUrlUpdateSlugDto } from '../dtos/short.url.update.slug.dto';

@ApiTags('Shortener')
@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @ApiOperation({ summary: 'Create a short URL' })
  @PrivatePublic()
  @Post('/short')
  async shorUrl(
    @Body() dto: ShortUrlDto,
    @CurrentUser() currentUser: User,
  ): Promise<ShortUrl> {
    console.log('currentUser', currentUser);
    return await this.shortenerService.create(dto, currentUser);
  }

  @ApiOperation({ summary: 'List short URLs from a authenticated user' })
  @Private()
  @Get('')
  async list(@CurrentUser() currentUser: User): Promise<ShortUrl[]> {
    return await this.shortenerService.listByUser(currentUser._id);
  }

  @ApiOperation({ summary: 'Update short URL slug' })
  @Private()
  @Patch('updateSlug')
  async updateSlug(
    @Body() dto: ShortUrlUpdateSlugDto,
    @CurrentUser() currentUser: User,
  ): Promise<boolean> {
    return await this.shortenerService.updateSlug(dto, currentUser);
  }
}
