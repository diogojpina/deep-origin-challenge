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
}
