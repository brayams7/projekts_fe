import { useEffect, useState } from "react";
import "./activity.css";
import PostComment from "./comments/PostComment";
import { useGetFeatureCommentsQuery } from "../../../rtkQuery/apiSliceFeature";
import Comment from "./comments/Comment";

const Activity = ({ feature }) => {
  const [postComment, setPostComment] = useState();
  const [comments, setComments] = useState([]);
  const { isLoading, isError, data } = useGetFeatureCommentsQuery(feature.id);

  useEffect(() => {
    if (data) {
      // Ordenar comentarios por fecha y colocarlos en el estado
      const dataCopy = [...data];
      dataCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setComments(dataCopy);
    }
  }, [data]);

  const handleSubmit = () => {
    console.log(postComment);
  };

  return (
    <div className="activity-container postion-relative mt-3">
      <div className="d-flex flex-column align-items-center">
        {isLoading ? (
          <div>Cargando...</div>
        ) : (
          comments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <div className="rounded new-comment-container">
        <PostComment
          setCommentState={setPostComment}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Activity;
