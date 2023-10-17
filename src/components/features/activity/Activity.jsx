import { useState } from 'react';
import './activity.css'
import Comment from './comments/Comment';
const Activity = () => {
  const [commentState, setCommentState] = useState()


  const handleSubmit = () =>{
    console.log(commentState)
  }

  return (
    <div className="activity-container postion-relative mt-3">
      <div className="timeline-comments">

      </div>
      <div className="rounded new-comment-container">
        <Comment
          setCommentState={setCommentState}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Activity;
