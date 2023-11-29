import { useEffect, useRef, useState } from "react";
// import { NewTagIcon } from "../../../utils/icons/iconsMenu";
import './detailFeature.css'
import TitleDetailFeature from "../titleFeature/TitleDetailFeature";
import Wysiwyg from "../../wysiwyg/Wysiwyg";
import ListsTasks from "../../tasks/listTaks/ListsTasks";
import HeaderDetailFeature from "./headerDetailFeature/HeaderDetailFeature";
import { useSelector } from "react-redux";
import { useUpdateFeatureMutation } from "../../../rtkQuery/apiSliceFeature";
// import { setLoading } from "../../../redux/slices/featureSlice";
import { toast } from "react-toastify";
import ViewsFeature from "./viewsFeature/ViewsFeature";
import TrakingFeture from "./trakingFeature/TrakingFeture";
import SystemFile from "../../tasks/systemFiles/SystemFile";
// import Wysiwyg from "../../wysiwyg/Wysiwyg";

const DetailFeature = ({feature, isFetching}) => {
  const [updateFeatureRequest] = useUpdateFeatureMutation()
  const [currentId, setCurrentId] = useState(null)
  // const dispatch = useDispatch()
  const loadingFeature = useSelector(state=>state.feature.loading)
  const editorStateRef = useRef();
  const debounceRef = useRef()

  const handleUpdateFeature = async (body, timer=1000) =>{
    try {

      // const description = localStorage.getItem("editorStage")
      if(debounceRef.current)
        clearTimeout(debounceRef.current)

      // const timer = titleFeature ? 400 : description ? 3000 : 1000
      debounceRef.current = setTimeout(()=>{
        updateFeatureRequest({featureId:feature.id,body}).unwrap()
      },timer)

      // console.log(body, description)

      // dispatch(setLoading(true))
      // const response = await updateFeatureRequest({featureId:feature.id,body}).unwrap()
      // if(response.code === 200){
      //   toast.success("Tablero creado!",{icon:"😃"})

      // }else{
      //   toast.error("Upss! ocurrió un error",{icon:"😕"})

      // }

    } catch (error) {

      toast.error("Upss! ocurrió un error",{icon:"😕"})

      console.log(error)
    }finally{

      // dispatch(setLoading(false))
    }
  }


  useEffect(()=>{

    if(feature){
      editorStateRef.current = feature.description
      setCurrentId(feature.id)
      // localStorage.setItem("idFeatureCurrent", feature.id)
      // setShowWisiwyg(!showWisiwyg)
      // console.log(feature.title)
    }

  },[feature])

  return (
    <div className={`p-3 pt-xl-0 ${(isFetching || loadingFeature) ? 'opacity-25 disabled-container':''}`}>

      <HeaderDetailFeature
        feature={feature}

      />

      <section className="d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2 font-size-12-14">

      <TrakingFeture
          feature={feature}
        />


        <ViewsFeature
          featureId={feature.id}
          usersAssigned={feature.list_of_users_assigned}
        />
      </section>

      {/* <section className="section-tags-feature d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2 font-size-12-14">
        <ul className="d-flex align-items-center gap-2 ist-unstyled">
          <li className="dropdown">
            <a
              href={`#newTagOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed feature-add-new-tag d-block text-center">
                <NewTagIcon fill="var(--gray-600)" height="20" width="20" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="newTagOption"
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
      </section> */}

      <TitleDetailFeature
        feature={feature}
        handleUpdateFeature={handleUpdateFeature}
      />

      {
        feature && (
          <section className="section-description-feature mb-2">
            <Wysiwyg
              editorState={feature.description}
              feature={feature}
              // setEditorState={setEditorState}
              currentId={currentId}
              handleUpdateFeature={handleUpdateFeature}
              featureId={feature.id}
            />
          </section>
        )
      }

      <section className="section-tasks mb-2">
        <ListsTasks
          feature={feature}
        />
      </section>

      <section>
        <SystemFile
          feature={feature}

        />
      </section>
    </div>
  );
};

export default DetailFeature;
