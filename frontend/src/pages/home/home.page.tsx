import { useEffect, useState } from "react";
import UrlUtil from "../../util/url.util";
import { ShortenerService } from "../../services";
import { ShortUrl } from "../../entities";
import { TbLayersLinked } from "react-icons/tb";
import { IoCopy, IoCreateOutline, IoOpenOutline } from "react-icons/io5";
import { Box } from "../../components/ui";
import { Layout } from "../../components/layout/layout";
import UserStorage from "../../util/user.storage";

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
      })
      .catch((error) => console.log("error", error));
  };

  const updateShortUrl = (id: string) => {
    const newSlug = prompt("Type a new slug");
    if (!newSlug) return;

    ShortenerService.updateSlug(id, newSlug).then((success) => {
      if (success) load();
      else alert("Slug not changed.");
    });
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

        {UserStorage.hasToken() && (
          <div className="shortened-list">
            <table border={1}>
              <tr>
                <th>Slug</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
              {shortUrls.map((sUrl) => (
                <tr>
                  <td>{sUrl.slug}</td>
                  <td>{sUrl.url}</td>
                  <td>
                    <button onClick={() => updateShortUrl(sUrl.id)}>
                      <IoCreateOutline />
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API_URL}/s/${sUrl.slug}`
                        )
                      }
                    >
                      <IoOpenOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </Box>
    </Layout>
  );
};

export default HomePage;
