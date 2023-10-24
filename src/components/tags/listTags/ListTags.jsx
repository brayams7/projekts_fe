import LoadingIcon from "../../../assets/loadings/EllipsisLoading40px.svg";

import "./listTags.css";
import { useListTags } from "../../../hooks/tags/useListTags";
import { useState } from "react";
import CreateTag from "../createTag/CreateTag";

const TagItem = ({ tag, color }) => {
  return (
    <li
      style={{
        color,
        cursor: "pointer",
        borderBottom: `1px solid var(--gray)`,
      }}
      className="fw-medium w-100 mb-1 "
    >
      {tag}
    </li>
  )
};

const ListTags = () => {
  const { isLoading, listTags, inputText, handleChangeInput, existTag } = useListTags()
  const [colorStage, setColorStage] = useState("")

  if (isLoading) {
    return (
      <div className="d-flex align-items-start justify-content-center">
        <img src={LoadingIcon} alt="loading" />
      </div>
    );
  }
  return (
    <div className="list-tags ont-size-12-14">
      {Array.isArray(listTags) && (
        <input
          type="text"
          name="tag"
          id="tag"
          onChange={handleChangeInput}
          placeholder="Escribe el nombre del tag"
          className="form-control"
          value={inputText}
          style={{
            ...(colorStage ? {border:`1px solid ${colorStage}`} : {})
          }}
        />
      )}

      <hr />

      {listTags.length > 0 && (
        <ul className="d-flex flex-row align-items-center gap-2">
          {Array.isArray(listTags) &&
            listTags.map((item) => <TagItem key={item.id} tag={item.tag} color={item.color} />)}
        </ul>
      )}

      {inputText && !existTag && (
        <CreateTag
          name={inputText}
          colorStage={colorStage}
          setColorStage={setColorStage}
          listTags={listTags}
        />
      )}
    </div>
  );
};

export default ListTags;
