import "./stageCard.css";
import { AddIcon, MoreIcon } from "../../utils/icons/iconsMenu";
import { useMemo, useRef, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FeatureCard from "../features/featureCard/FeatureCard";
import { typesCards } from "../../Menu";
import { useUpdateStageByIdMutation } from "../../rtkQuery/apiSliceStage";
import { toast } from "react-toastify";
import AddNewCardFeature from "../features/addNewCard/AddNewCardFeature";



const StageCard = ({
  id,
  name,
  order,
  color,
  description,
  isDefault,
  isFinal,
  boardId,
  // TYPES,
  listFeatures=[]
}) => {
  const refTextAreaTitleStage = useRef(null)

  const [isEditTitleStage, setIsEditTitleStage] = useState(false)
  const [isShowAddCardFeature, setShowAddCardFeature] = useState(false)

  const [titleStage, setTitleStage] = useState(name)
  const listFeaturesId = useMemo(()=>listFeatures.map(feature =>feature.id),[listFeatures])

  const [updateStageById] = useUpdateStageByIdMutation()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data:{
      type:typesCards.STAGE,
      stage:{
        name,
        id,
        order,
        isDefault,
        isFinal,
        description
      }
    },
    disabled:isEditTitleStage
  })

  const styles = {
    transition,
    transform:CSS.Transform.toString(transform),
  }

  const handleUpdateStage = async () => {
    if(name === titleStage) return
    const body = {
      name:titleStage,
      description,
      color: color ? color : '',
      is_default:isDefault,
      is_final:isFinal
    }
    try {
      const data = {
        stageId:id,
        body
      }
      const response = await updateStageById(data).unwrap()
      if(response.code === 200){
        toast.success("Tablero creado!",{icon:"😃"})

      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})

      }
    } catch (error) {
      console.log(error)
    }
  }


  if(isDragging){
    return (
      <div
        ref={setNodeRef}
        style={styles}
        className="card-stage-container"
      >
        <div
          className="stage-card"
          style={{height:"auto", opacity:.6}}
        >

        </div>
      </div>
    )
  }


  return (
    <div
      ref={setNodeRef}
      style={styles}
      className="card-stage-container"
    >
      <div
        className="stage-card"
        style={{borderTopColor:color}}
        {...listeners}
        {...attributes}
      >
        <div
          className="stage-card-container-header d-flex justify-content-between mx-3 mt-2"

        >

            <div
              className="d-flex align-items-center flex-grow-1"
              role="button"
              onClick={()=>setIsEditTitleStage(true)}
            >
              {
                !isEditTitleStage && <span>{titleStage}</span>
              }
              {
                isEditTitleStage && (
                  <input
                    type="text"
                    ref={refTextAreaTitleStage}
                    className={
                      isEditTitleStage
                        ? "stage-card-header-name mod-header-name is-editing"
                        : "stage-card-header-name mod-header-name"
                    }
                    aria-label="Nombre de la fase"
                    spellCheck={false}
                    dir="auto"
                    autoFocus
                    onKeyDown={(e)=>{
                      if(e.key !== "Enter") return
                      setIsEditTitleStage(false)
                      handleUpdateStage()
                    }}
                    onBlur={()=>{
                      console.log(titleStage)
                      setIsEditTitleStage(false)
                      handleUpdateStage()
                    }}
                    // maxLength={512}
                    style={{
                      // overflow: "hidden",
                      overflowWrap: "break-word",
                      height: 28,
                    }}
                    onChange={(e) => setTitleStage(e.target.value)}
                    value={titleStage}
                  />
                )
              }
            </div>
            {/* <h2 className="stage-card-header-name-assist">{titleStage}</h2> */}


          <div className="dropdown">
            <a
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span>
                <MoreIcon fill="var(--blueDark)" />
              </span>
            </a>
            <ul className="dropdown-menu p-2 custom-dropdown-card">
              <div className="font-size-14-16 font-weight-600 text-center">
                Enumerar acciones
              </div>
              <li>
                <a type="button" role="button" className="dropdown-item">
                  Añadir tarjeta
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="stage-card-list-features gap-3">
          <SortableContext
            items={listFeaturesId}
          >
            {
              listFeatures.map(feature=>(
                <FeatureCard
                  key={feature.id}
                  id={feature.id}
                  feature={feature}
                />
              ))
            }
          </SortableContext>
          {isShowAddCardFeature && (
            <AddNewCardFeature
              setShowAddCardFeature={setShowAddCardFeature}
              boardId={boardId}
              stageId={id}
            />
          )}
        </div>
        <div
          className={
            isShowAddCardFeature
              ? "stage-card-composer-container d-none"
              : "stage-card-composer-container d-block mt-3"
          }
        >
          <a
            className="stage-open-card-composer"
            type="button"
            role="button"
            onClick={() => {

              setShowAddCardFeature(true)
            }}
          >
            <span>
              <AddIcon fill="var(--blueDark)" />
            </span>
            <span style={{ color: "var(--blueDark)" }}>Agrega una tarjeta</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StageCard;
