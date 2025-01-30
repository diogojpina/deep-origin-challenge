import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl, ShortUrlDocument } from '../schemas/short.url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectModel(ShortUrl.name)
    private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  async create(data: ShortUrlDto, user?: User): Promise<ShortUrl> {
    if (!this.isValidUrl(data.url))
      throw new HttpException('Invalid URL', HttpStatus.BAD_REQUEST);

    for (let i = 1; i <= 10; i++) {
      const slug = this.generateSlug(6);
      if ((await this.getBySlug(slug)) !== null) continue;
      console.log({ ...data, slug, user: user });
      return await new this.shortUrlModel({
        ...data,
        slug,
        user: user?._id,
      }).save();
    }

    throw new HttpException(
      'It was not possible to short your URL. Try again!',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  async getBySlug(slug: string): Promise<ShortUrlDocument | null> {
    return await this.shortUrlModel.findOne({ slug });
  }

  async listByUser(userId: string): Promise<ShortUrlDocument[]> {
    return await this.shortUrlModel.find({ user: userId });
  }

  async registerAccess(shortUrl: ShortUrlDocument): Promise<void> {
    console.log('shortUrl._id', shortUrl._id);
    const accessCount = shortUrl.accessCount + 1;
    console.log('new-count', accessCount);
    await this.shortUrlModel.updateOne(
      { _id: shortUrl._id },
      { $set: { accessCount } },
    );
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  generateSlug(length: number): string {
    let slug = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * characters.length);
      slug += characters.charAt(idx);
    }
    return slug;
  }
}
