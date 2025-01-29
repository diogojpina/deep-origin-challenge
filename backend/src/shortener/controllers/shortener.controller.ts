import { Body, Controller, Post } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl } from '../schemas/short.url.schema';
import { ShortenerService } from '../services/shortener.service';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('/short')
  async shorUrl(@Body() data: ShortUrlDto): Promise<ShortUrl> {
    console.log('aqui', process.env);
    return await this.shortenerService.create(data);
  }
}
