import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl, ShortUrlDocument } from '../schemas/short.url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectModel(ShortUrl.name)
    private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  async create(data: ShortUrlDto): Promise<ShortUrl> {
    if (!this.isValidUrl(data.url))
      throw new HttpException('Invalid URL', HttpStatus.BAD_REQUEST);

    for (let i = 1; i <= 10; i++) {
      const token = this.generateToken(6);
      if ((await this.getByToken(token)) !== null) continue;
      return await new this.shortUrlModel({ ...data, token }).save();
    }

    throw new HttpException(
      'It was not possible to short your URL. Try again!',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  async getByToken(token: string): Promise<ShortUrlDocument | null> {
    return await this.shortUrlModel.findOne({ token });
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  generateToken(length: number): string {
    let token = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * characters.length);
      token += characters.charAt(idx);
    }
    return token;
  }
}
