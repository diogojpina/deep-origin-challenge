import { useState } from "react";
import UrlUtil from "../../util/url.util";

const HomePage = () => {
  const [url, setUrl] = useState("");

  const shorten = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!UrlUtil.isValid(url)) {
      alert("Type a valid URL.");
      return;
    }

    console.log(url);
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
    </div>
  );
};

export default HomePage;
