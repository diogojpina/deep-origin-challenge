import { Module } from '@nestjs/common';
import { ShortenerController } from './controllers/shortener.controller';
import { ShortenerService } from './services/shortener.service';
import { ShortUrl, ShortUrlSchema } from './schemas/short.url.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
    UserModule,
  ],
  controllers: [ShortenerController],
  providers: [ShortenerService],
  exports: [ShortenerService],
})
export class ShortenerModule {}
