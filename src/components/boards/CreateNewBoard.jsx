import React, { useCallback, useEffect, useState } from "react";
import PreviewImage from "../../assets/board/example-board.svg";
import {
  LIST_MANE_BG_COLORS_ITEMS,
  LIST_MANE_GRADIENTS_COLORS_ITEMS,
} from "../../utils/contants/colorsHex";
import MoreIcon from "../../assets/board/more-icon.svg";
// import MoreTopicsOptions from "../../components/boards/MoreTopics";
import { ListTopicsBoards } from "./ListTopicsBoards";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { stylesReactSelect } from "../../utilsFunctions/forms";
import { useSelector } from "react-redux";
import { useGetAllWorkspacesUserQuery } from "../../rtkQuery/apiSliceWorkspace";
import { useCreateNewBoardMutation } from "../../rtkQuery/apiSliceBoard";
import { toast } from "react-toastify";

const styles = {
  flexWrap: "no-wrap",
  height: 40,
  width: 63,
};

const CreateNewBoard = ({ idWorkspace}) => {
  // const [backgroundColor, setBackgroundColor] = useState('')
  // const [backgroundImage, setBackgroundImage] = useState('')
  const { id } = useSelector(state=>state.auth.user)
  const {backgroundColorSelect, gradientColorSelect, svgSelect, nameGradientColorSelect} = useSelector(state=>state.board)
  const {isError,data=[]} = useGetAllWorkspacesUserQuery(id)
  const [createNewBoard] = useCreateNewBoardMutation()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    // setError,
    formState: { isValid}
  } = useForm();

  const [isAllTopics, setIsAllTopics] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [workspaceSelect, setWorkspaceSelect] = useState("");
  const sizeGradients = isAllTopics
    ? LIST_MANE_GRADIENTS_COLORS_ITEMS.length
    : 6;
  const sizeColors = isAllTopics ? LIST_MANE_BG_COLORS_ITEMS.length : 5;

  const onSubmit = async (data) => {
    let svgBlob = ''
    let backgroundColor = ''
    const formData = new FormData()
    try {

      if(svgSelect){
        svgBlob = new Blob([svgSelect], { type: 'image/svg+xml', name: nameGradientColorSelect})
        formData.append("bg_image",svgBlob, nameGradientColorSelect)
      }

      if(backgroundColorSelect){
        backgroundColor = backgroundColorSelect
      }


      setIsLoadingForm(true)


      const haveDefaultStages = Number(data.have_default_stages)
      formData.append("user_id",id)
      formData.append("workspace_id",workspaceSelect.value)
      formData.append("bg_color",backgroundColor)
      formData.append("name", data.name)
      formData.append("have_default_stages", haveDefaultStages)

      const response = await createNewBoard(formData).unwrap()
      if(response.code === 200){
        setValue("name","")
        setValue("have_default_stages",false)
        handleSetDefaultWorkspaceInSelect()
        toast.success("Tablero creado!",{icon:"😃"})
      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})
      }

    } catch (error) {
      console.log("Error",error)
      toast.error("Upss! ocurrió un error",{icon:"😕"})
      // setErrorForm("Ocurrió un error, intente mas tarde")
    }finally{
      setIsLoadingForm(false)
    }
  }

  const handleSetDefaultWorkspaceInSelect = useCallback(()=>{
    if(idWorkspace && data.length > 0){
      const workspaceDefault = data.find(item => item.value === idWorkspace)
      if(workspaceDefault){
        setValue("workspace", workspaceDefault)
        setWorkspaceSelect(workspaceDefault)
      }
    }
  },[data, idWorkspace, setValue])

  useEffect(()=>{
    handleSetDefaultWorkspaceInSelect()

  },[idWorkspace, data, setValue, handleSetDefaultWorkspaceInSelect])

  return (
    <React.Fragment>
      {/* <MoreTopicsOptions
        isModalMoreTopics={isModalMoreTopics}
        openModal={openModal}
        closeModal={closeModal}
      /> */}

      <div
        className="modal fade"
        id="modalBoard"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          {/* <ModalMoreTopics/> */}
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <span className="w-100 text-center">Crear tablero</span>
                <button
                  id="modalClose"
                  type="button"
                  onClick={() => {
                    setIsAllTopics(false)
                    setValue("name","")
                    setValue("have_default_stages",false)
                    handleSetDefaultWorkspaceInSelect()
                  }}
                  className="btn-close eliminarModal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="container-fluid">
                <div className="d-flex justify-content-center p-2">
                  <div
                    className="board-preview"
                    style={{
                      backgroundColor: backgroundColorSelect,
                      backgroundImage: gradientColorSelect,
                    }}
                  >
                    <img src={PreviewImage} alt="preview board" />
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3 mx-auto" style={{ width: "95%" }}>
                    <p className="fw-normal font-size-12-14 mb-2">Fondo</p>
                    <div className="mb-3">
                      <ListTopicsBoards
                        // height={40}
                        // width={64}
                        size={sizeGradients}
                        list={LIST_MANE_GRADIENTS_COLORS_ITEMS}
                        styles={
                          isAllTopics
                            ? {
                                ...styles,
                                flexWrap: "wrap",
                                height: 55,
                                width: 95,
                              }
                            : styles
                        }
                      />
                    </div>
                    {isAllTopics && <hr />}
                    <div className="mb-3">
                      <ListTopicsBoards
                        // height={40}
                        // width={64}
                        size={sizeColors}
                        list={LIST_MANE_BG_COLORS_ITEMS}
                        styles={
                          isAllTopics
                            ? {
                                ...styles,
                                flexWrap: "wrap",
                                height: 55,
                                width: 95,
                              }
                            : styles
                        }
                      >
                        {!isAllTopics && (
                          <li
                            className="board-option-more"
                            style={{ width: 64, height: 40 }}
                          >
                            <button
                              type="button"
                              onClick={() => setIsAllTopics(true)}
                              // data-bs-toggle="modal"
                              // data-bs-target="#modalMoreTopics"
                              className="text-center"
                            >
                              <img src={MoreIcon} alt="more icon" />
                            </button>
                          </li>
                        )}
                      </ListTopicsBoards>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      // htmlFor="name"
                      className="form-label font-weight-600 font-size-12-14"
                    >
                      Nombre del tablero:
                    </label>
                    <input
                      {...register("name", {
                        required: true,
                      })}
                      type="text"
                      className="form-control custom-form"
                      // style={{minHeight:38}}
                      id="name"
                      placeholder="Nombre del tablero"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      // htmlFor="workspace"
                      className="form-label font-weight-600  font-size-12-14"
                    >
                      Espacio de trabajo:
                    </label>
                    <Controller
                      name="workspace"
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(e) =>
                            field.onChange(() => {
                              setWorkspaceSelect(e);
                              setValue("workspace", e);
                            })
                          }
                          required={true}
                          styles={stylesReactSelect}
                          options={!isError ? data : []}
                          noOptionsMessage={() => "Crea un espacio de trabajo"}
                          placeholder="Selecciona un espacio de trabajo"
                          isSearchable={true}
                          menuPlacement="auto"
                          rules={{ required: true }}
                        />
                      )}
                      control={control}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="form-check p-relative form-switch d-flex align-items-center gap-3">
                      <input
                        {
                          ...register("have_default_stages", {
                            required: false,
                          })
                        }

                        className="form-check-input custom-switch"
                        type="checkbox"
                        role="switch"
                        name="have_default_stages"
                        id="have_default_stages"
                      />
                          <label
                            className="form-check-label font-weight-600 font-size-12-14"
                            htmlFor="have_default_stages"
                          >
                            ¿Deseas agregar los estados por defecto?
                          </label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn_login mb-2"
                      type="submit"
                      disabled={isLoadingForm || !isValid}
                    >
                      {!isLoadingForm ? "Crear" : "Cargando..."}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateNewBoard;
