import { useEffect, useState } from "react";
import { DoneIcon, MoreIcon} from "../../../../utils/icons/iconsMenu";
import './headerDetailFeature.css'
import ListStagesFeature from "./listStagesFeature/ListStagesFeature";
import ListUsersAssignedFeature from "./listUsersAssigned/ListUsersAssignedFeature";
import { useDispatch } from "react-redux";
import { useChangeOrderFeatureMutation } from "../../../../rtkQuery/apiSliceFeature";
import { setLoading } from "../../../../redux/slices/featureSlice";
import { toast } from "react-toastify";

const HeaderDetailFeature = ({feature}) => {

  const [currentStage, setCurrentStage] = useState(null)
  const [stageFinal, setStageFinal] = useState(null)

  const [changeOrderFeature] = useChangeOrderFeatureMutation()
  const dispatch = useDispatch()

  const handleChangeStage = async ()=>{
    try {
      const body = {
        stage_id:feature.stage_id,
        new_stage_id:stageFinal.id,
        newOrder:1,
        board_id:feature.board_id
      }

      dispatch(setLoading(true))
      const response = await changeOrderFeature({body, featureId:feature.id}).unwrap()
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

  useEffect(()=>{

    const stage = feature.stages.find(stage=> stage.id === feature.stage_id) ?? null
    const stageFinal = feature.stages.find(stage=> Boolean(stage.is_final) === true) ?? null

    // const mapListUsersAddedToTheWorkspace = feature.
    setCurrentStage(stage)
    setStageFinal(stageFinal)

  },[feature.stage_id, feature.stages, feature.is_default])


  return (
    <section className="d-flex justify-content-start align-items-center gap-2 mb-2">
        <ul className="d-flex align-items-center gap-2 list-unstyled header-detail-feature-container">
          <li className="dropdown me-2">
            {
                currentStage && (
                  <a
                    href={`#stagesOption`}
                    className="dropwown-stage rounded"
                    style={{backgroundColor:currentStage.color}}
                    type="button"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="outside"
                  >
                    {currentStage.name}
                  </a>
                )
            }
            <ul
              className="dropdown-menu border-0 shadow px-3 py-2 dropdown-stages-feature-card"
              id={"stagesOption"}
            >
              <ListStagesFeature
                stages={feature?.stages || []}
                idCurrentStage={feature.stage_id}
                boardId={feature.board_id}
                featureId={feature.id}
              />

            </ul>
          </li>

          {
            stageFinal && (
              <li
                className="border rounded p-2 stage-final"
                role="button"
                onClick={()=>handleChangeStage()}
              >
                <span>
                  <DoneIcon
                    fill={stageFinal.color}
                  />
                </span>
              </li>
            )
          }


        </ul>
          <ListUsersAssignedFeature
            usersAssigned={feature.list_of_users_assigned}
            usersAddedToTheWorkspace={feature.list_of_users_added_to_the_workspace}
            featureId={feature.id}
            boardId={feature.board_id}
          />
        <span
          className="d-block mx-2"
          style={{ height: 20, borderLeft: "1px solid var(--gray-600)" }}
        ></span>
        <ul className="d-flex align-items-center gap-2 list-unstyled ms-auto">
          <li className="dropdown">
            <a
              href={`#addMemberOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span>
                <MoreIcon fill="var(--lightDark)" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="addMemberOption"
            >
              <div className="font-size-14-16 font-weight-600 text-center">
                Enumerar acciones
              </div>
              <li>
                <a type="button" role="button" className="dropdown-item">
                  Backlog
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
  );
};

export default HeaderDetailFeature;
