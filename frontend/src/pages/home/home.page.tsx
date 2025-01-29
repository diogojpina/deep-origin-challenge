import { useState } from "react";
import UrlUtil from "../../util/url.util";
import { ShortenerService } from "../../services";
import { ShortUrl } from "../../entities";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);

  const shorten = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!UrlUtil.isValid(url)) {
      alert("Type a valid URL.");
      return;
    }

    ShortenerService.short(url)
      .then((sUrl) => setShortUrl(sUrl))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <h1>Url Shortener</h1>
      <h2>Enter the URL to shorten</h2>
      <form onSubmit={shorten}>
        <div>
          <label>URL</label>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <>
          {import.meta.env.VITE_API_URL}/{shortUrl.token}
        </>
      )}
    </div>
  );
};

export default HomePage;
