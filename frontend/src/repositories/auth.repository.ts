import ApiClient from "./clients/api.client";

const client = new ApiClient();

export class AuthRepository {
  public static async login(
    username: string,
    password: string
  ): Promise<string> {
    const data = { username, password };
    const response = await client.DoRequest("POST", `/auth/login`, data);

    return response.token;
  }
}
