import { IoCreateOutline, IoOpenOutline } from "react-icons/io5";
import { ShortUrl } from "../../entities";
import { ShortenerService } from "../../services";

import "./shortened.list.scss";

interface Props {
  shortUrls: ShortUrl[];
  reload: () => void;
}

export const ShortenedList = ({ shortUrls, reload }: Props) => {
  const updateShortUrl = (id: string) => {
    const newSlug = prompt("Type a new slug");
    if (!newSlug) return;

    ShortenerService.updateSlug(id, newSlug).then((success) => {
      if (success) reload();
      else alert("Slug not changed.");
    });
  };
  return (
    <div className="shortened-list">
      <table border={1}>
        <thead>
          <tr>
            <th>Slug</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shortUrls.map((sUrl) => (
            <tr key={sUrl.id}>
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
        </tbody>
      </table>
    </div>
  );
};
