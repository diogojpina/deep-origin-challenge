import { decodeJwt } from "jose";
import { User } from "../entities";

const storageKey = "@user";
class UserStorage {
  static hasToken = (): boolean => {
    const token = localStorage.getItem(storageKey);
    return !!token;
  };

  static getToken = (): string | null => {
    const token = localStorage.getItem(storageKey);
    return token;
  };

  static get = (): User | null => {
    const token = UserStorage.getToken();
    if (!token) return null;

    const data: any = decodeJwt(token);
    return data ? new User(data.user) : null;
  };

  static setToken = (usertoken: string | null) => {
    if (usertoken) localStorage.setItem(storageKey, usertoken);
  };

  static logout = () => {
    localStorage.removeItem(storageKey);
  };
}

export default UserStorage;
