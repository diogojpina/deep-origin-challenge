import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ShortUrlDocument = HydratedDocument<ShortUrl>;

@Schema()
export class ShortUrl {
  @Prop({ required: true, index: true })
  @ApiProperty({ description: 'Original URL' })
  url: string;

  @Prop({ required: true, unique: true, index: true })
  @ApiProperty({ description: 'Short URL slug' })
  slug: string;

  @Prop({ default: 0 })
  @ApiProperty({ description: 'Access count' })
  accessCount: number;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
