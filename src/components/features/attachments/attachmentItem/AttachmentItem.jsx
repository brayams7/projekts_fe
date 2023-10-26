import { useState } from "react";
// import { API_BASE_STORAGE } from "../../../../services/settings";
import { DeleteIcon, DownloadIcon, VisibilityIcon } from "../../../../utils/icons/iconsMenu";

const AttachmentItem = ({
  url,
  id,
  name,
  createdAt,
  extension,
  isImage,
  iconPreview,
  handleDowloand,
  handleDelete,
  isLoadingDeleteAtt
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  return (
    <div
      className={`attachment-item-container rounded`}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div className="attachment-preview-container">
        <div className="preview--container">
          <img
            className={isImage ? "preview-img" : "preview-no-img"}
            alt="preview image"
            src={isImage ? url: iconPreview}
          />
        </div>
        <a
          href={url}
          className="attachment-open-toggle"
          target="_blank"
          rel="noreferrer"
        >
          {mouseIsOver && <VisibilityIcon fill="var(--white)" />}
        </a>
      </div>
      <div className="attachment-title-container font-size-10-12 d-flex flex-column px-2">
        <div className="d-flex justify-content-center">
          <span className="attachment-title" title={name}>
            {name}
          </span>
          <span>{extension}</span>
        </div>
        <div className="d-flex justify-content-center gap-3 align-content-center">
          <span>{createdAt}</span>
          <button onClick={() => handleDowloand(id, `${name}${extension}`)}>
            <DownloadIcon fill="var(--gray-600)" height="20" />
          </button>

          <button
            onClick={() => handleDelete(id)}
            disabled={isLoadingDeleteAtt}
          >
            <DeleteIcon fill="var(--gray-600)" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachmentItem;
