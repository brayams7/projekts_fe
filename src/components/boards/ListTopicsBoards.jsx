import { useRef } from "react";
import { PATH_BG_COLOR } from "../../utils/contants/colorsHex";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackgroundColorSelect,
  setGradientColorSelect,
  setIdTopicSelect,
  setNameGradientColorSelect,
  setSvgSelect,
} from "../../redux/slices/boardSlice";

import SelectTopic from "../../assets/board/select-topic.svg"

export const ItemTopicBoard = ({
  width,
  height,
  id,
  backgroundImage,
  backgroundColor,
  isTypeGradient,
  svgBackgroundImage,
  nameBackgroundImage
}) => {
  const { idTopicSelect } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const item = useRef(null);

  const stylesItem = {
    width,
    height,
  }
  const stylesButton = {
    ...(backgroundImage !== null ? { backgroundImage } : {}),
    backgroundColor
  }
  const isActive = idTopicSelect === id

  const setTopicSelect = () => {
    if (isTypeGradient){
      dispatch(setGradientColorSelect(stylesButton.backgroundImage))
      dispatch(setNameGradientColorSelect(nameBackgroundImage))
      dispatch(setBackgroundColorSelect(stylesButton.backgroundColor))
      dispatch(setSvgSelect(svgBackgroundImage))
    }
    else{
      dispatch(setBackgroundColorSelect(stylesButton.backgroundColor))
      dispatch(setNameGradientColorSelect(""))
      dispatch(setGradientColorSelect(""))
      dispatch(setSvgSelect(""))
    }
    dispatch(setIdTopicSelect(id))
  }

  return (
    <li className="board-option-item" style={stylesItem}>
      <button
        type="button"
        className="board-option-button"
        onClick={() => setTopicSelect()}
        style={stylesButton}
        ref={item}
      >
        {
          isActive && (
            <span>
              <img src={SelectTopic} alt="topic select" />
            </span>
          )
        }
      </button>
    </li>
  );
};

export const ListTopicsBoards = ({ size, list = [], styles, children }) => {
  const listNameItems = () => {
    const z = size ? size : list.length;

    const itemsToSee = [];
    for (let i = 0; i < z; i++) {
      itemsToSee.push(list[i]);
      if (i === z - 1) break;
    }
    return itemsToSee;
  };
  return (
    <ul
      className="list-unstyled d-flex justify-content-center justify-content-sm-start align-items-center mx-auto gap-2"
      style={{ flexWrap: styles.flexWrap }}
    >
      {listNameItems().map((item, i) => (
        <ItemTopicBoard
          key={i}
          backgroundImage={
            item?.nameBackgroundImage
              ? `url(${PATH_BG_COLOR}${item.nameBackgroundImage})`
              : null
          }
          id={item.id}
          isTypeGradient ={item?.nameBackgroundImage ? true : false}
          backgroundColor={item?.backgroundColor ? item.backgroundColor : null}
          svgBackgroundImage={item?.svgBackgroundImage ? item.svgBackgroundImage : null}
          nameBackgroundImage={item.nameBackgroundImage}
          height={styles.height}
          width={styles.width}
        />
      ))}
      {children}
    </ul>
  );
};
