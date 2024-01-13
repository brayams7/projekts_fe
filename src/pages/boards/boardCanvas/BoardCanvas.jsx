import { useEffect, useState } from "react";
import "./boardCanvas.css";
import { useDispatch, useSelector } from "react-redux";

import {useGetBoardsAndStagesQuery, useUpdateBoardMutation} from '../../../rtkQuery/apiSliceBoard'
import { useParams } from "react-router-dom";

import CubeLoading  from '../../../assets/loadings/CubeLoading75px.svg'
import HeaderBoard from "../../../components/boards/header/HeaderBoard";
import { toast } from "react-toastify";
import BoardTypeBoard from "../../../components/boards/views/BoardTypeBoard";
import { PrivateActionsRoutes } from "../../../routes";
import { setDetailBoard } from "../../../redux/slices/boardSlice";

const initStage = {"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}

// const TYPES = {
//   STAGE:"STAGE",
//   FEATURE:"FEATURE"
// }

const BoardCanvas = () => {
  const {board:stylesBoard, content:styleContent} = useSelector(state=>state.layout.stylesLayout)
  const dispatch = useDispatch()
  const {
    boardId
  } = useParams()

  const {
    isLoading,
    // isFetching,
    isError,
    data,
    currentData
  } = useGetBoardsAndStagesQuery(boardId)

  const [
    updateBoardRequest
  ] = useUpdateBoardMutation()

  const {typeViewSelect} = useSelector(state=>state.board.boardCanvas)
  const {detailBoard} = useSelector(state=>state.board)

  // const [detailBoard, setDetailBoard] = useState(null)
  const [listStages, setListStages] = useState([])
  const [listFeatures, setListFeatures] = useState([])

  const mapFeatures = (stages=[])=>{
    return stages.flatMap(stage=>stage.features).map(feature=>({...feature}))
  }

  useEffect(()=>{

    if(data !== undefined && Object.entries(data)?.length > 0){
      const {stages, ...detailBoad} =  data

      // setDetailBoard(detailBoad)
      setListStages(stages)
      setListFeatures(mapFeatures(stages))
      dispatch(setDetailBoard(detailBoad))

      localStorage.setItem("initStage", JSON.stringify(initStage))
    }
  },[data, dispatch])

  const handleUpdateBoard = async (name, description, color, bgImage)=>{
    if(detailBoard.name === name ||!name.trim()) return

    let svgBlob = ''
    const formData = new FormData()

    try {

      if(Object.entries(bgImage)?.length > 0 ){

        svgBlob = new Blob([bgImage.svgSelect], { type: 'image/svg+xml', name: bgImage.nameGradientColorSelect})
        formData.append("bg_image",svgBlob, bgImage.nameGradientColorSelect)

      }

      formData.append("bg_color",color)
      formData.append("name", name)
      formData.append("description", description || "")
      formData.append("have_default_stages", 1)
      formData.append("user_id",detailBoard.user_id)
      formData.append("workspace_id",detailBoard.workspace_id)

      const data = {
        boardId,
        body:formData
      }

      const response = await updateBoardRequest(data).unwrap()

      if(response.code !== 200){
        toast.error("Upss! ocurrió un error",{icon:"😕"})
      }

    } catch (error) {
      toast.error("Upss! ocurrió un error",{icon:"😕"})
      console.log(error)
    }
  }


  if(isLoading && !currentData){
    return(
      <div className="board-canvas-container">
        <div className="pt-2 board-canvas-loading d-flex flex-column text-center justify-content-center align-items-center">
          <img src={CubeLoading} alt="loadin cube"/>
          <span className="fs-5">Cargando...</span>
        </div>
      </div>
    )
  }

  if(isError){
    return(
      <div className="board-canvas-container">
      <div className="pt-2 board-canvas-loading d-flex flex-column text-center justify-content-center align-items-center">
        <span>Upss.. Ocrrió un error</span>
      </div>
      </div>
    )
  }

  return (
    <div
      className={
        // isFetching ? "board-canvas-container opacity-75":
        "board-canvas-container"
      }
    >
      <HeaderBoard
        handleUpdateBoard={handleUpdateBoard}
        stylesBoard={stylesBoard}
        name={detailBoard?.name}
        description={detailBoard?.description}
        color={detailBoard?.bg_color}
        bgImage={detailBoard?.bg_color}
        workspaceId={detailBoard?.workspace_id}
        userId={detailBoard?.user_id}
        typeViewSelect={typeViewSelect}
      />
      <div className="pt-2 board-canvas-body" style={styleContent}>

        {
          typeViewSelect === PrivateActionsRoutes.BOARDS.CARD &&
          <BoardTypeBoard
            boardId={boardId}
            listStages={listStages}
            listFeatures={listFeatures}
            setListStages={setListStages}
            setListFeatures={setListFeatures}
          />
        }

        {
          typeViewSelect === PrivateActionsRoutes.BOARDS.TABLE && (
            <h1>hola mundo</h1>
          )
        }

        {/* <Outlet/> */}
      </div>
    </div>
  );
};

export default BoardCanvas;
