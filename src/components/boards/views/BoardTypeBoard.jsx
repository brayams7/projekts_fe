import { DndContext, DragOverlay, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
// import { createPortal } from "react-dom";
import { typesCards } from "../../../Menu";
import StageCard from "../../stages/StageCard";
import FeatureCard from "../../features/featureCard/FeatureCard";
import AddNewCardStage from "../../stages/addCardStage/AddNewCardStage";
import { useUpdateOrderStageMutation } from "../../../rtkQuery/apiSliceStage";
import { useChangeOrderFeatureMutation } from "../../../rtkQuery/apiSliceFeature";
import ModalFeature from "../../features/modalFeature/ModalFeature";


// const typeMoveCardFeature = {
//   VERTICAL:"vertical",
//   HORIZONTAL:"horizontal"
// }

const BoardTypeBoard = ({
  boardId,
  listStages,
  setListStages,
  setListFeatures,
  listFeatures,
}) => {
  const [updateOrderStage] = useUpdateOrderStageMutation()
  const [changeOrderFeature] = useChangeOrderFeatureMutation()

  const [activeBoardStage, setActiveBoardStage] = useState(null)
  const [activeFeature, setActiveFeature] = useState(null)
  const [lastOverFeature, setLastOverFeature] = useState(null)
  const [idOverStage, setIdOverStage] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)

  const listStagesId = useMemo(()=> listStages.map(e=>e.id),[listStages])

  const handleDragStart = (event)=>{

    if(event.active.data.current.type === typesCards.STAGE){

      setActiveBoardStage(event.active.data.current.stage)
      return
    }

    if(event.active.data.current.type === typesCards.FEATURE){
      setActiveFeature(event.active.data.current.feature)
      setIdOverStage(event.active.data.current.feature.stage_id)
      return
    }
  }

  const handleDragEnd = (event) =>{

    const {active, over} = event
    if(!over) return //no estamos arrastrando en un elemento valido

    const activeStageId = active.id
    const overStageId = over.id


    const isActiveStage = active.data.current?.type === typesCards.STAGE
    let body = {}

    try{
      if(isActiveStage){
        const overStage = over.data.current
        if(activeStageId === overStageId || overStage?.stage.isFinal) return

        body = {
          modified_order:{
            stageId:active.data.current.stage.id,
            newOrder:over.data.current.stage.order
          }
        }

        updateOrderStage({boardId, body})

        setListStages(stages=>{

          const activeStageIndex = stages.findIndex(item=>item.id === activeStageId)
          const overStageIndex = stages.findIndex(item=>item.id === overStageId)
          return arrayMove(stages, activeStageIndex, overStageIndex)
        })
      }else{
        const activeFeature = active.data.current
        const featureId = active.id
        let stageId = null
        let newStageId = null
        let order = activeFeature.sortable.index + 1


        if(activeFeature.feature.stage_id === idOverStage){

          if(activeFeature.id === lastOverFeature.id) return
          stageId = activeFeature.feature.stage_id
          newStageId = activeFeature.feature.stage_id

        }else{
          stageId = idOverStage
          newStageId = activeFeature.feature.stage_id
        }

        body = {
          stage_id:stageId,
          new_stage_id:newStageId,
          newOrder:order,
          board_id:boardId
        }

        changeOrderFeature({featureId, body})

      }
    }catch(e){
      console.log(e)
    }finally{
      setActiveBoardStage(null)
      setActiveFeature(null)
      setIdOverStage(null)
    }
  }

  const handleDragOver = (event)=>{
    const {active, over} = event

    if(!over) return //no estamos arrastrando en un elemento valido

    const activeId = active.id
    const overId = over.id

    if(activeId === overId) return

    const isActiveFeature = active.data.current?.type === typesCards.FEATURE
    const isOverFeature = over.data.current?.type === typesCards.FEATURE

    if(!isActiveFeature) return

    //arrastrando una tarea sobre otra tarea
    if(isActiveFeature && isOverFeature){

      let feature = null
      // let type = null
      setListFeatures(listFeatures=>{


        const activeIndex = listFeatures.findIndex(feature=>feature.id === activeId)

        const overIndex = listFeatures.findIndex(feature=>feature.id === overId)

        feature = {...listFeatures[overIndex]}
        // type = typeMoveCardFeature.VERTICAL

        if(listFeatures[activeIndex].stage_id !== listFeatures[overIndex].stage_id){

          // feature = {...listFeatures[overIndex]}
          feature.stage_id = listFeatures[activeIndex].stage_id
          // type = typeMoveCardFeature.HORIZONTAL

          listFeatures[activeIndex].stage_id = listFeatures[overIndex].stage_id
          return arrayMove(listFeatures,activeIndex,overIndex-1)
        }


        return arrayMove(listFeatures,activeIndex,overIndex)
      })
      setLastOverFeature(feature)
    }
    //arrastrando una tarea a otra columna
    const isOverStage = over.data.current?.type === typesCards.STAGE

    if(isActiveFeature && isOverStage){
      let feature = null
      // let type = null

      setListFeatures(
        listFeatures=>{
          // const mapFeatures = listFeatures.map(feature=>({...feature}))

          const activeIndex = listFeatures.findIndex(feature=>feature.id === activeId)

          // type = typeMoveCardFeature.HORIZONTAL

          listFeatures[activeIndex].stage_id = overId
          feature = {...listFeatures[activeIndex]}
          feature.order = 1

          return arrayMove(listFeatures,activeIndex,activeIndex)
        }
      )
      setLastOverFeature(feature)
    }
  }


  const sensors = useSensors(
    useSensor(
      PointerSensor,
      {
        activationConstraint:{
          distance:5 //5px de distancia para considerarse que esta haciendo draggable
        }
      }
    ),
    useSensor(
      TouchSensor,
      {
        activationConstraint:{
          distance:5
        }
      }
    )
  )

  return (
    <div className="board-canvas-list d-flex align-items-start px-4">
      <ModalFeature
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        <div className="d-flex gap-4">
          <SortableContext items={listStagesId}>
            {listStages.map((item) => (
              <StageCard
                key={item.id}
                id={item.id}
                name={item.name}
                order={item.order}
                color={item.color}
                isDefault={item.is_default}
                isFinal={item.is_final}
                description={item.description}
                boardId={boardId}
                setSelectedFeature={setSelectedFeature}
                // TYPES={TYPES}
                listFeatures={listFeatures.filter(
                  (feature) => feature.stage_id === item.id
                )}
                setListFeatures={setListFeatures}
              />
            ))}
          </SortableContext>
          <div className="card-stage-container">
            <AddNewCardStage
              listStages={listStages}
              boardId={boardId}
              // setListStages={setListStages}
            />
          </div>
        </div>

        <DragOverlay>
          {activeBoardStage && (
            <StageCard
              id={activeBoardStage.id}
              name={activeBoardStage.name}
              isDefault={activeBoardStage.isDefault}
              order={activeBoardStage.order}
              isFinal={activeBoardStage.isFinal}
              description={activeBoardStage.description}
              boardId={boardId}
              listFeatures={listFeatures.filter(
                (feature) => feature.stage_id === activeBoardStage.id
              )}
              setSelectedFeature={setSelectedFeature}
              setListFeatures={setListFeatures}
            />
          )}
          {activeFeature && (
            <FeatureCard
              id={activeFeature.id}
              feature={activeFeature}
              setSelectedFeature={setSelectedFeature}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BoardTypeBoard;
