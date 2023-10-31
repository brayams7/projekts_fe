import { TagItem } from "../../tags/listTags/ListTags";

const DeleteTagByTask = ({handleDeleteTag, id})=>{
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        handleDeleteTag(id)
      }}
      className="button-delete-tag"
    >
      x
    </button>
  )
}

const ColumnTagsUser = ({tags=[]}) => {

  const handleClickTag = (tag) =>{
    console.log(tag)
  }

  const handleDeleteTag = (id) =>{
    console.log(id)
  }


  return (
    <ul className="d-flex flex-row align-items-center justify-content-start gap-2">
      {Array.isArray(tags) &&
        tags.map((item) => (
          <TagItem
            key={item.id}
            tag={item.tag}
            color={item.color}
            handleClickTag={handleClickTag}
            id={item.id}
            DeleteComponent={
              <DeleteTagByTask
                handleDeleteTag={handleDeleteTag}
                id={item.id}
              />
            }
          />
        ))}
    </ul>
  );
};

export default ColumnTagsUser;
