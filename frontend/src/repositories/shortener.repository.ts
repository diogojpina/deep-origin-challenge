import { ShortUrl } from "../entities";
import ApiClient from "./clients/api.client";

const client = new ApiClient();

export class ShortenerRepository {
  public static async short(url: string, token: string): Promise<ShortUrl> {
    const data = { url };
    const headers = { Authorization: `Bearer ${token}` };
    const response = await client.DoRequest(
      "POST",
      `/shortener/short`,
      data,
      headers
    );

    return new ShortUrl(response);
  }

  public static async list(token: string): Promise<ShortUrl[]> {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await client.DoRequest("GET", `/shortener`, {}, headers);

    const shortUrls: ShortUrl[] = [];
    for (const sUrl of response) {
      shortUrls.push(new ShortUrl(sUrl));
    }

    return shortUrls;
  }

  public static async updateSlug(
    id: string,
    slug: string,
    token: string
  ): Promise<boolean> {
    const data = { id, slug };
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await client.DoRequest("PATCH", `/shortener/updateSlug`, data, headers);

      return true;
    } catch {
      return false;
    }
  }
}
