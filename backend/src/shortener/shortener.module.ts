import { Module } from '@nestjs/common';
import { ShortenerController } from './controllers/shortener.controller';
import { ShortenerService } from './services/shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
