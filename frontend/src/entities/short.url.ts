export class ShortUrl {
  public id: string;
  public url: string;
  public token: string;

  constructor(data: any) {
    this.id = data._id;
    this.url = data.url;
    this.token = data.token;
  }
}
