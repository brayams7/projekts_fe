
import "./listTags.css";

export const TagItem = ({ tag, color, handleClickTag=null, id, DeleteComponent=null }) => {

  const handleTagClick = () => {
    if (handleClickTag && typeof handleClickTag === "function") {
      handleClickTag({
        id,
        tag,
        color,
      });
    }
  };

  return (
    <li
      style={{
        color:"white",
        backgroundColor: color,
        cursor: "pointer",
        borderBottom: `1px solid var(--gray)`,
        // maxWidth: 100,
        padding:0
      }}
      onClick={handleTagClick}
      className="fw-medium rounded-pill rounded-start-0 font-size-10-12 item-tag"
    >
      <span className="title-break-all d-inline-block ps-1" style={{verticalAlign:"middle"}}>
        {tag}
      </span>

      <span className="ms-2 fw-bold d-inline-block pe-1 " style={{verticalAlign:"middle"}}>
        {
          DeleteComponent && DeleteComponent
        }
      </span>
    </li>
  )
};

const ListTags = ({listTags, handleClickTag}) => {

  return (
    <ul className="d-flex flex-column justify-content-start gap-2">
      {Array.isArray(listTags) &&
        listTags.map((item) => (
          <TagItem
            key={item.id}
            tag={item.tag}
            color={item.color}
            handleClickTag={handleClickTag}
            id={item.id}
          />
        ))}
    </ul>
  );
};

export default ListTags;
