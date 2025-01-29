import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ShortenerService } from './shortener/services/shortener.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Get(':token')
  async accessUrl(@Param('token') token: string, @Res() res: Response) {
    const shortUrl = await this.shortenerService.getByToken(token);
    if (!shortUrl)
      throw new HttpException('URL not found', HttpStatus.BAD_REQUEST);

    res.redirect(shortUrl.url);
  }
}
