import { CloseIcon } from "../../../utils/icons/iconsMenu";
import LoadingIcon from '../../../assets/loadings/EllipsisLoading40px.svg'
import { useForm } from "react-hook-form";

import "./addNewFeature.css";
import { toast } from "react-toastify";
import { useCreateFeatureMutation } from "../../../rtkQuery/apiSliceFeature";
const AddNewCardFeature = ({ setShowAddCardFeature, boardId, stageId }) => {
  const {
    register,
    handleSubmit,
    // control,
    setValue,
    // setError,
    formState: { isValid },
  } = useForm()

  const [createFeature,{isLoading}] = useCreateFeatureMutation()

  const onSubmit = async (info) => {


    try {

      const body = {
        title:info.title,
        description:'',
        board_id:boardId,
        stage_id:stageId
      }

      const response = await createFeature(body).unwrap()
      if(response.code === 200){
        setValue("title","")
        toast.success("Tablero creado!",{icon:"😃"})
      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})

      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="add-card-feature mt-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="item-card-feature">
          <div className="add-card-feature-details">
            <textarea
              {...register("title", {
                required: true,
              })}
              className="add-card-feature-textarea p-2"
              autoFocus
              name="title"
              dir="auto"
              placeholder="Introduzca un título para esta tarjeta"
              style={{
                overflow: "hidden",
                overflowWrap: "break-word",
                resize: "none",
                minHeight: 54,
              }}
            ></textarea>
          </div>
        </div>
        <div className="add-card-feature-controls d-flex justify-content-end align-items-center mb-3 me-1">
          {
            isLoading && (
              <img className="me-auto" src={LoadingIcon} alt="loading" />
            )
          }
          <button type="submit" className="btn btn-primary me-2" disabled={(!isValid || isLoading)}>
            Añadir tarjeta
          </button>
          <a
            role="button"
            type="button"
            onClick={() => setShowAddCardFeature(false)}
          >
            <span>
              <CloseIcon fill="var(--blueDark)" />
            </span>
          </a>
        </div>
      </form>
    </div>
  );
};

export default AddNewCardFeature;
