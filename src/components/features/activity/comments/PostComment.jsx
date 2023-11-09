import React, { useState } from "react";
import { usePostCommentMutation } from "../../../../rtkQuery/apiSliceFeature";
import { useSelector } from "react-redux";

export function PostComment({ featureId }) {

  const user = useSelector(state=>state.auth.user);

  const [postComment, { isLoading, isError, isSuccess }] =
    usePostCommentMutation();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postComment({ comment: text, feature_id: featureId, user_id: user.id });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Escribe tu comentario:</label>
      <input
        id="comment"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        Enviar
      </button>
      {isLoading && <p>Enviando comentario...</p>}
      {isError && <p>Ocurrió un error al enviar el comentario</p>}
      {isSuccess && <p>Comentario enviado con éxito</p>}
    </form>
  );
}

export default PostComment;
