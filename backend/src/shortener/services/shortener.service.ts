import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortUrlDto } from '../dtos/short.url.dto';
import { ShortUrl, ShortUrlDocument } from '../schemas/short.url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { ShortUrlUpdateSlugDto } from '../dtos/short.url.update.slug.dto';

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

  async updateSlug(dto: ShortUrlUpdateSlugDto, user?: User): Promise<boolean> {
    const shortUrl = await this.shortUrlModel.findOne({ _id: dto.id });
    if (!shortUrl) {
      throw new HttpException('Short URL not found', HttpStatus.BAD_REQUEST);
    }

    if (
      !shortUrl.user ||
      user?._id?.toString() !== shortUrl.user?._id.toString()
    ) {
      throw new HttpException(
        'Short URL is not related to the user',
        HttpStatus.FORBIDDEN,
      );
    }

    if (await this.getBySlug(dto.slug)) {
      throw new HttpException(
        'Slug is already in the database',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.shortUrlModel.updateOne(
      { _id: dto.id },
      { $set: { slug: dto.slug } },
    );

    return true;
  }

  async listByUser(userId: string): Promise<ShortUrlDocument[]> {
    return await this.shortUrlModel.find({ user: userId });
  }

  async registerAccess(shortUrl: ShortUrlDocument): Promise<void> {
    const accessCount = shortUrl.accessCount + 1;
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
