import { useListTags } from "../../../hooks/tags/useListTags";
import LoadingIcon from "../../../assets/loadings/EllipsisLoading40px.svg";
import { useState } from "react";
import CreateTag from "../../tags/createTag/CreateTag";
import ListTags from "../../tags/listTags/ListTags";

import {
  NewTagIcon
} from "../../../utils/icons/iconsMenu";

const DropDowTag = ({ handleClickTag, Icon }) => {

  const { isLoading, listTags, inputText, handleChangeInput, existTag} = useListTags()
  const [colorStage, setColorStage] = useState("")

  if (isLoading) {
    return (
      <div className="d-flex align-items-start justify-content-center">
        <img src={LoadingIcon} alt="loading" />
      </div>
    )
  }

  return (
    <div className="dropdown d-flex align-items-center">
      <a
        href={`#addTagOption`}
        type="button"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        {
          Icon ? (
            Icon
          ): (
            <span className="custom-icon-border-dashed feature-add-new-tag d-flex align-items-center text-center">
              <NewTagIcon fill="var(--gray-600)" height="25" width="25" />
            </span>
          )
        }

      </a>
      <ul
        className="dropdown-menu border-0 shadow px-3 py-2"
        style={{ minHeight: 100, width: 250 }}
        id="addTagOption"
      >
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
                ...(colorStage ? { border: `1px solid ${colorStage}` } : {}),
              }}
            />
          )}

          <hr />

          {listTags.length > 0 && (
            <ListTags listTags={listTags} handleClickTag={handleClickTag} />
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
      </ul>
    </div>
  );
};

export default DropDowTag;
