import { Body, Controller, Post } from '@nestjs/common';
import { ShortUrlDto } from '../entities/short.url.dto';

@Controller('shortener')
export class ShortenerController {
  @Post('/short')
  shorUrl(@Body() data: ShortUrlDto): ShortUrlDto {
    return data;
  }
}
