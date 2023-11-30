import { createSlice } from "@reduxjs/toolkit";
import {
  LIST_MANE_BG_COLORS_ITEMS,
  LIST_MANE_GRADIENTS_COLORS_ITEMS,
  PATH_BG_COLOR,
} from "../../utils/contants/colorsHex";
import { typesViewBoards } from "../../Menu";

// const hexColor = LIST_MANE_GRADIENTS_COLORS_ITEMS.length > 0 ? LIST_MANE_GRADIENTS_COLORS_ITEMS[0].backgroundColor : ""



const nameGradientColor =
  LIST_MANE_GRADIENTS_COLORS_ITEMS.length > 0
    ? LIST_MANE_GRADIENTS_COLORS_ITEMS[0]
    : "";

const initialState = {
  listBoards: [],
  listNameBackgroundColors: LIST_MANE_BG_COLORS_ITEMS,
  listNameGradientsColors: LIST_MANE_GRADIENTS_COLORS_ITEMS,
  idTopicSelect: nameGradientColor.id,
  backgroundColorSelect: "",
  gradientColorSelect: `url(${PATH_BG_COLOR}${nameGradientColor.nameBackgroundImage})`,
  nameGradientColorSelect: nameGradientColor.nameBackgroundImage,
  svgSelect: nameGradientColor.svgBackgroundImage,
  boardCanvas: {
    typeViewSelect:typesViewBoards[0].id,
  },
  detailBoard: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBackgroundColorSelect: (state, action) => {
      state.backgroundColorSelect = action.payload;
    },
    setGradientColorSelect: (state, action) => {
      state.gradientColorSelect = action.payload;
    },
    setNameGradientColorSelect: (state, action) => {
      state.nameGradientColorSelect = action.payload;
    },
    setSvgSelect: (state, action) => {
      state.svgSelect = action.payload;
    },
    setIdTopicSelect: (state, action) => {
      state.idTopicSelect = action.payload;
    },

    //Board canvas
    setTypeViewSelect: (state, action) => {
      state.boardCanvas.typeViewSelect = action.payload;
    },

    setDetailBoard: (state, action) => {
      state.detailBoard = action.payload
    }
  },
});

export const {
  setBackgroundColorSelect,
  setGradientColorSelect,
  setSvgSelect,
  setNameGradientColorSelect,
  setIdTopicSelect,
  setTypeViewSelect,
  setDetailBoard
} = boardSlice.actions;

export default boardSlice.reducer;
