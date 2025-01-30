import { AuthRepository } from "../repositories";
import UserStorage from "../util/user.storage";

export class AuthService {
  public static async login(
    username: string,
    password: string
  ): Promise<string> {
    const token = await AuthRepository.login(username, password);
    UserStorage.setToken(token);
    return token;
  }
}
