import { useDispatch } from "react-redux"
import { setSytlesBoard, setSytlesContent, setSytlesHeader, setSytlesSiderbar } from "../../redux/slices/layoutSlice"
import { DEFAULT_COLORS_LAYOUT } from "../../utils/contants/colorsHex"


export const useStylesLayout = ()=>{

  const dispatch = useDispatch()

  const validateObjectSyle = (style={})=> Object.entries(style)?.length > 0

  const setStylesLayout = ({
    header={},
    siderbar={},
    content={},
    board={}
  })=>{

    const vContent =  validateObjectSyle(content) ? content : DEFAULT_COLORS_LAYOUT.content
    const vBoard =  validateObjectSyle(board) ? board : DEFAULT_COLORS_LAYOUT.board
    const vHeader =  validateObjectSyle(header) ? header : DEFAULT_COLORS_LAYOUT.header
    const vSiderbar =  validateObjectSyle(siderbar) ? siderbar : DEFAULT_COLORS_LAYOUT.siderbar

    dispatch(setSytlesContent(vContent))
    dispatch(setSytlesHeader(vHeader))
    dispatch(setSytlesSiderbar(vSiderbar))
    dispatch(setSytlesBoard(vBoard))

  }

  return {
    setStylesLayout
  }

}
