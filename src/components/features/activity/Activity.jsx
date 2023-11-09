import { useEffect, useState } from "react";
import "./activity.css";
import PostComment from "./comments/PostComment";
import { useGetCommentsQuery } from "../../../rtkQuery/apiSliceFeature";
import Comment from "./comments/Comment";

const Activity = ({ feature }) => {
  const [comments, setComments] = useState([]);
  const { isLoading, data } = useGetCommentsQuery(feature.id);

  useEffect(() => {
    if (data?.response) {
      setComments(data.response);
    }
  }, [data]);

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
        <PostComment featureId={feature.id} />
      </div>
    </div>
  );
};

export default Activity;
