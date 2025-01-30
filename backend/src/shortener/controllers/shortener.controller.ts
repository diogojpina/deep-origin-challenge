import { Body, Controller, Post } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl } from '../schemas/short.url.schema';
import { ShortenerService } from '../services/shortener.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Shortener')
@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @ApiOperation({ summary: 'Create a short URL' })
  @Post('/short')
  async shorUrl(@Body() data: ShortUrlDto): Promise<ShortUrl> {
    return await this.shortenerService.create(data);
  }
}
