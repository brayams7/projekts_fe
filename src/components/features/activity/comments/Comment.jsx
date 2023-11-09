import React from "react";
import "./Comment.css";

/**
 * Función que convierte una fecha en formato ISO a una fecha en formato local
 * @param {string} dateString Fecha en formato ISO
 * @returns Fecha en formato local
 */
const convertDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  if (isNaN(date)) {
    return "Fecha inválida";
  } else {
    return date.toLocaleDateString(
      navigator.language || navigator.userLanguage || "es-ES",
      options
    );
  }
};

const Comment = ({ comment }) => {
  const dateString = convertDate(comment.created_at);

  return (
    <div className="card m-2 w-75">
      <div className="card-body">
        <div className="card-title d-flex align-items-center">
          <p className="mb-0">
            <i className="bi bi-person-circle me-2 fs-1 person-icon"></i>
          </p>
          <div>
            <p className="m-0 fw-semibold">{comment.user.name}</p>
            <p className="m-0 opacity-50 date-text">{dateString}</p>
          </div>
        </div>
        <p className="card-text">{comment.comment}</p>
      </div>
      <div className="card-footer text-end">
        <button
          type="button"
          className="btn btn-sm rounded-circle reaction-button"
        >
          <i className="bi bi-hand-thumbs-up-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default Comment;
