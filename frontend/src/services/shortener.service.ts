import { ShortUrl } from "../entities";
import { ShortenerRepository } from "../repositories";
import UserStorage from "../util/user.storage";

export class ShortenerService {
  public static async short(url: string): Promise<ShortUrl> {
    const token = UserStorage.getToken() || "";
    return await ShortenerRepository.short(url, token);
  }

  public static async list(): Promise<ShortUrl[]> {
    const token = UserStorage.getToken();
    if (!token) return [];
    return await ShortenerRepository.list(token);
  }

  public static async updateSlug(id: string, slug: string): Promise<boolean> {
    const token = UserStorage.getToken();
    if (!token) return false;
    return await ShortenerRepository.updateSlug(id, slug, token);
  }
}
