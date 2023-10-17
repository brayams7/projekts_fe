import { toast } from "react-toastify";
import { useChangeOrderFeatureMutation } from "../../../../../rtkQuery/apiSliceFeature";
import { DoneIcon } from "../../../../../utils/icons/iconsMenu";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../redux/slices/featureSlice";

const ItemStageFeature = ({ name, color, id, isCurrent, handleChangeStage }) => {
  return (
    <li
      className="d-flex align-items-center gap-2 item-stage-feature rounded"
      role="button"
      onClick={()=>handleChangeStage(id)}
    >
      <span
        className="d-inline-block rounded"
        style={{ height: 14, width: 14, backgroundColor: color }}
      ></span>

      <span className={`font-size-14-16 ${isCurrent && "fw-bold"}`}>
        {name}
      </span>

      {isCurrent &&
      <span
        className="ms-auto"
      >
        <DoneIcon
          fill={color}
        />
      </span>}
    </li>
  );
};

const ListStagesFeature =  ({ stages = [], idCurrentStage, boardId,featureId }) => {

  const [changeOrderFeature] = useChangeOrderFeatureMutation()
  const dispatch = useDispatch()


  const handleChangeStage = async (newStageId)=>{
    try {

      const body = {
        stage_id:idCurrentStage,
        new_stage_id:newStageId,
        newOrder:1,
        board_id:boardId
      }

      dispatch(setLoading(true))
      const response = await changeOrderFeature({body, featureId}).unwrap()
      if(response.code === 200){
        toast.success("Tablero creado!",{icon:"😃"})

      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})

      }

    } catch (error) {

      toast.error("Upss! ocurrió un error",{icon:"😕"})

      console.log(error)
    }finally{

      dispatch(setLoading(false))
    }
  }


  return (
    <>
      <ul className="d-flex flex-column list-unstyled gap-2">
        {stages.map((stage) => (
          <ItemStageFeature
            key={stage.id}
            name={stage.name}
            id={stage.id}
            color={stage.color}
            isCurrent={idCurrentStage === stage.id}
            handleChangeStage={handleChangeStage}
          />
        ))}
      </ul>
    </>
  );
};

export default ListStagesFeature;
