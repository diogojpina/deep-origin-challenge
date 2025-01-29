import { ShortUrl } from "../entities";
import { ShortenerRepository } from "../repositories";

export class ShortenerService {
  public static async short(url: string): Promise<ShortUrl> {
    const token = "";
    return await ShortenerRepository.short(url, token);
  }
}
