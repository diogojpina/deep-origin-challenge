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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App controller')
export class AppController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @ApiOperation({ summary: 'Redirect a short URL to a original URL' })
  @ApiQuery({ name: 'slug', description: 'URL slug' })
  @Get('/s/:slug')
  async accessUrl(@Param('slug') slug: string, @Res() res: Response) {
    const shortUrl = await this.shortenerService.getBySlug(slug);
    if (!shortUrl)
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);

    void this.shortenerService.registerAccess(shortUrl);

    res.redirect(shortUrl.url);
  }
}
