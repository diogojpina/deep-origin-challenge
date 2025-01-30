import { useState } from "react";
import UrlUtil from "../../util/url.util";
import { ShortenerService } from "../../services";
import { ShortUrl } from "../../entities";

import "./home.page.scss";
import { TbLayersLinked } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";

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
      .then((sUrl) =>
        setShortUrl({
          ...sUrl,
          short: `${import.meta.env.VITE_API_URL}/${sUrl.token}`,
        })
      )
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container-url-shortner">
      <div className="box">
        <div className="title">
          <h1>URL Shortener</h1>
          <TbLayersLinked />
        </div>
        <span className="subtitle">Enter the URL to shorten</span>

        <form onSubmit={shorten}>
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <div className="button">
            <button type="submit">Shorten</button>
          </div>
        </form>

        {shortUrl && (
          <div className="results">
            <span className="success-message">
              {" "}
              Success! Here's your short URL:
            </span>
            <div className="shortened-url">
              <a href={shortUrl.short} target="_blank">
                {shortUrl.short}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl.short)}
              >
                <IoCopy /> Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
