import { ShortUrl } from "../entities";
import { ShortenerRepository } from "../repositories";
import UserStorage from "../util/user.storage";

export class ShortenerService {
  public static async short(url: string): Promise<ShortUrl> {
    const token = UserStorage.getToken() || "";
    return await ShortenerRepository.short(url, token);
  }
}
