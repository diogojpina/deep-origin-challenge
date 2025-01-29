import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShortUrlDocument = HydratedDocument<ShortUrl>;

@Schema()
export class ShortUrl {
  @Prop({ required: true, index: true })
  url: string;

  @Prop({ required: true, unique: true, index: true })
  token: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
