import { Module } from '@nestjs/common';
import { ShortenerController } from './controllers/shortener.controller';
import { ShortenerService } from './services/shortener.service';
import { ShortUrl, ShortUrlSchema } from './schemas/short.url.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [ShortenerController],
  providers: [ShortenerService],
  exports: [ShortenerService],
})
export class ShortenerModule {}
