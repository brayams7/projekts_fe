import { useState } from "react";

const Comment = ({ comment }) => {
  // Convertir fecha
  const date = new Date(comment.created_at);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateString = date.toLocaleDateString(navigator.language, options);

  // Manejar estado del botón de reacción
  const [isReactionButtonHovered, setIsReactionButtonHovered] = useState();
  const [isReactionButtonClicked, setIsReactionButtonClicked] = useState();

  const handleReactionButtonHover = () => {
    setIsReactionButtonHovered(!isReactionButtonHovered);
  };

  const handleReactionButtonClick = () => {
    setIsReactionButtonClicked(true);
  };

  const handleReactionButtonRelease = () => {
    setIsReactionButtonClicked(false);
  };

  // Retornar JSX
  return (
    <div className="card m-2 w-75">
      <div className="card-body">
        <div className="card-title d-flex align-items-center">
          <p className="mb-0">
            <i
              className="bi bi-person-circle me-2 fs-1"
              style={{
                color: "#6f42c1",
                opacity: 0.8,
              }}
            ></i>
          </p>
          <div>
            <p className="m-0 fw-semibold">{comment.user.name}</p>
            <p className="m-0 opacity-50" style={{ fontSize: "12px" }}>
              {dateString}
            </p>
          </div>
        </div>
        <p className="card-text">{comment.comment}</p>
      </div>
      <div className="card-footer text-end">
        <button
          type="button"
          className="btn btn-sm rounded-circle"
          onTouchStart={handleReactionButtonClick}
          onTouchEnd={handleReactionButtonRelease}
          onTouchCancel={handleReactionButtonRelease}
          onMouseEnter={handleReactionButtonHover}
          onMouseLeave={handleReactionButtonHover}
          onMouseDown={handleReactionButtonClick}
          onMouseUp={handleReactionButtonRelease}
          style={{
            backgroundColor: isReactionButtonClicked
              ? "#6f42c1"
              : !isReactionButtonHovered
              ? "#6f42c1"
              : "",
            color: isReactionButtonClicked
              ? "#ffffff"
              : isReactionButtonHovered
              ? "#6f42c1"
              : "#ffffff",
            border: "1px solid #6f42c1",
            opacity: 0.8,
          }}
        >
          <i
            className="bi bi-hand-thumbs-up-fill"
            style={{
              color: isReactionButtonClicked
                ? "#ffffff"
                : isReactionButtonHovered
                ? "#6f42c1"
                : "#ffffff",
            }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Comment;
