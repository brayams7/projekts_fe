import { LIST_COLORS_STAGES } from "../../../utils/contants/colorsHex";
const ListColorsTags = ({
  colorStage,
  setColorStage,
  widthContainer=230,
  styleItem={
    width: 20,
    height: 20,
  },
}) => {
  // const [colorStage, setColorStage] = useState("");

  return (
    <ul
      className="list-unstyled d-flex justify-content-center align-items-start flex-wrap mb-2"
      style={{ width: widthContainer }}
    >
      {
        // eslint-disable-next-line no-unused-vars
        Object.entries(LIST_COLORS_STAGES).map(([_, color], key) => (
          <li
            key={key}
            role="button"
            className="p-1 rounded-circle h-auto d-flex justify-content-center align-items-center"
            style={{
              // width:28,
              // height:20,
              ...(colorStage === color ? { border: `2px solid ${color}` } : {}),
            }}
            onClick={() => setColorStage(color)}
          >
            <span
              className="rounded-circle d-inline-block"
              style={{
                backgroundColor: color,
                ...styleItem
              }}
            ></span>
          </li>
        ))
      }
      {/* <input
              type="color"
              name="color"
              className="form-control"
            /> */}
    </ul>
  );
};

export default ListColorsTags;
