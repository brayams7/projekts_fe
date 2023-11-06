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

  // Retornar JSX
  return (
    <div className="card m-2 w-75">
      <div className="card-body">
        <div className="card-title">
          <p className="fw-semibold mb-0">
            <img src="" alt="" />
            {comment.user.name}
          </p>
          <p className="text-body-tertiary mb-0">{dateString}</p>
        </div>
        <p className="card-text">{comment.comment}</p>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default Comment;
