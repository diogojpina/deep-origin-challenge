export class ShortUrl {
  public id: string;
  public url: string;
  public slug: string;
  public short: string;

  constructor(data: any) {
    this.id = data._id;
    this.url = data.url;
    this.slug = data.slug;
    this.short = data.short || "";
  }
}
