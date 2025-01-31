import { useEffect, useState } from "react";
import UrlUtil from "../../util/url.util";
import { ShortenerService } from "../../services";
import { ShortUrl } from "../../entities";
import UserStorage from "../../util/user.storage";
import { Layout } from "../../components/layout/layout";
import { Box } from "../../components/ui";
import { ShortenedList } from "../../components/shortened-list/shortened.lits";
import { IoCopy } from "react-icons/io5";
import { TbLayersLinked } from "react-icons/tb";

import "./home.page.scss";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    ShortenerService.list().then((sUrls) => setShortUrls(sUrls));
  };

  const shorten = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!UrlUtil.isValid(url)) {
      alert("Type a valid URL.");
      return;
    }

    ShortenerService.short(url)
      .then((sUrl) => {
        setShortUrl({
          ...sUrl,
          short: `${import.meta.env.VITE_API_URL}/s/${sUrl.slug}`,
        });
        setShortUrls([...shortUrls, sUrl]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Layout>
      <Box>
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

        <div className="footer-box">
          {UserStorage.hasToken() ? (
            <ShortenedList shortUrls={shortUrls} reload={load} />
          ) : (
            <>Login</>
          )}
        </div>
      </Box>
    </Layout>
  );
};

export default HomePage;
