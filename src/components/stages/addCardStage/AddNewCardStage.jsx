import { useState } from "react";
import './addCardStage.css'
import { AddIcon, CloseIcon } from "../../../utils/icons/iconsMenu";
import LoadingIcon from '../../../assets/loadings/EllipsisLoading40px.svg'
import { useForm } from "react-hook-form";
import { useCreateStageAndAssingToBoardMutation } from "../../../rtkQuery/apiSliceStage";
import { toast } from "react-toastify";
import { LIST_COLORS_STAGES } from "../../../utils/contants/colorsHex";

const IS_DEFAULT = 0
const IS_FINAL = 0

const AddNewCardStage = ({listStages=[], boardId}) => {

  const [colorStage, setColorStage] = useState("")

  const {
    register,
    handleSubmit,
    // control,
    setValue,
    // setError,
    formState: { isValid}
  } = useForm()

  const [createNewStage, {isLoading}] = useCreateStageAndAssingToBoardMutation()

  const [isIdle, setIsIdle] = useState(true)

  const onSubmit = async (data) => {
    const body = {
      name:data.name,
      description:'',
      color:colorStage,
      is_default:IS_DEFAULT,
      is_final:IS_FINAL
    }
    try {
      const data = {
        boardId,
        body
      }
      const response = await createNewStage(data).unwrap()
      if(response.code === 200){
        setValue("name","")
        setColorStage("")
        toast.success("Tablero creado!",{icon:"😃"})
      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})

      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={
      isIdle ? "add-card-stage mod-add is-idle":
      "add-card-stage mod-add"
    }>
      <form onSubmit={handleSubmit(onSubmit)}>
        <a
          role="button"
          onClick={()=>setIsIdle(false)}
        >
          <span className={
            isIdle ?"d-block px-3 py-2 text-start content-idle"
            : "px-3 py-2 text-start d-none"
          }>
            <span>
              <AddIcon fill="var(--blueDark)"/>
            </span>
              Añadir lista
          </span>
        </a>

        <div className={isIdle ? "d-none content-form-add-stage": "d-block content-form-add-stage"}>
          <input
            {...register("name", {
              required: true,

            })}
            autoFocus
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Introduzca el título"
            style={{
              ...(colorStage ? {border:`1px solid ${colorStage}`} : {})
            }}
            // value={nameTextStage}
            // onChange={(e)=>setNameTextStage(e.target.value)}
          />

          <ul className="list-unstyled d-flex justify-content-center align-items-start flex-wrap mb-2" style={{width:230}}>
            {
              // eslint-disable-next-line no-unused-vars
              Object.entries(LIST_COLORS_STAGES).map(([_,color], key)=>(
                <li
                  key={key}
                  role="button"
                  className="p-1 rounded-circle h-auto d-flex justify-content-center align-items-center"
                  style={{
                    // width:28,
                    // height:20,
                    ...(colorStage === color) ? {border:`2px solid ${color}`} : {}
                  }}
                  onClick={()=>setColorStage(color)}
                >
                  <span
                    className="rounded-circle d-inline-block"
                    style={{
                      backgroundColor:color,
                      width:20,
                      height:20,
                    }}

                  >

                  </span>
                </li>
              ))
            }
            {/* <input
              type="color"
              name="color"
              className="form-control"
            /> */}
          </ul>

          <div className="d-flex flex-wrap justify-content-start align-items-center">
            <button type="submit" className="btn btn-primary me-2" disabled={(!isValid || !colorStage || isLoading)}>
              {
                listStages.length > 0 ? "Añadir lista":
                "Añadir nueva lista"
              }
            </button>
            <a
              role="button"
              type="button"
              onClick={()=>{
                setIsIdle(true)
                setColorStage("")
              }}
            >
              <span>
                <CloseIcon fill="var(--blueDark)"/>
              </span>
            </a>

            {
              isLoading && (
                <img className="ms-auto" src={LoadingIcon} alt="loading" />
              )
            }
          </div>
        </div>

      </form>
    </div>

  );
};

export default AddNewCardStage;
