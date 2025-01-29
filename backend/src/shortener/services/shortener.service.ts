import { Injectable } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl } from '../schemas/short.url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectModel(ShortUrl.name)
    private readonly notificationModel: Model<ShortUrl>,
  ) {}

  async create(data: ShortUrlDto): Promise<ShortUrl> {
    const shortUrl = data.url;
    return await new this.notificationModel({ ...data, shortUrl }).save();
  }
}
