import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { typesCards } from "../../../Menu";
import StageCard from "../../stages/StageCard";
import FeatureCard from "../../features/featureCard/FeatureCard";
import AddNewCardStage from "../../stages/addCardStage/AddNewCardStage";
import { useUpdateOrderStageMutation } from "../../../rtkQuery/apiSliceStage";

const BoardTypeBoard = ({
  boardId,
  listStages,
  setListStages,
  setListFeatures,
  listFeatures,
}) => {
  const [updateOrderStage] = useUpdateOrderStageMutation()

  const [activeBoardStage, setActiveBoardStage] = useState(null)
  const [activeFeature, setActiveFeature] = useState(null)

  const listStagesId = useMemo(()=> listStages.map(e=>e.id),[listStages])

  const handleDragStart = (event)=>{

    if(event.active.data.current.type === typesCards.STAGE){

      setActiveBoardStage(event.active.data.current.stage)
      return
    }

    if(event.active.data.current.type === typesCards.FEATURE){
      setActiveFeature(event.active.data.current.feature)
      return
    }
  }

  const handleDragEnd = (event) =>{
    setActiveBoardStage(null)
    setActiveFeature(null)
    const {active, over} = event
    if(!over) return //no estamos arrastrando en un elemento valido

    const activeStageId = active.id
    const overStageId = over.id

    if(activeStageId === overStageId) return



    const isActiveStage = active.data.current?.type === typesCards.STAGE

    if(!isActiveStage) return

    const body = {
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
      setListFeatures(
        listFeatures=>{
          // const mapFeatures = listFeatures.map(feature=>({...feature}))

          const activeIndex = listFeatures.findIndex(feature=>feature.id === activeId)
          const overIndex = listFeatures.findIndex(feature=>feature.id === overId)

          listFeatures[activeIndex].stage_id = listFeatures[overIndex].stage_id

          return arrayMove(listFeatures,activeIndex,overIndex)
        }
      )
    }

    //arrastrando una tarea a otra columna
    const isOverStage = over.data.current?.type === typesCards.STAGE

    if(isActiveFeature && isOverStage){
      setListFeatures(
        listFeatures=>{
          // const mapFeatures = listFeatures.map(feature=>({...feature}))

          const activeIndex = listFeatures.findIndex(feature=>feature.id === activeId)

          listFeatures[activeIndex].stage_id = overId

          return arrayMove(listFeatures,activeIndex,activeIndex)
        }
      )
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
      <DndContext
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

        {createPortal(
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
                setListFeatures={setListFeatures}
              />
            )}
            {activeFeature && (
              <FeatureCard
                id={activeFeature.id}
                feature={activeFeature}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default BoardTypeBoard;
