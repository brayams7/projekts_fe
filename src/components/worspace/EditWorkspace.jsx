import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateWorkspaceMutation } from "../../rtkQuery/apiSliceWorkspace";
import { toast } from "react-toastify";

const EditWorkspace = ({
  workspaceId,
  name,
  description,
  setIsShowEditForm,
  isShowEditForm,
  // userId,
  color,
  initials,
  // workspaceTypeId
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    // setError,
    formState: { isValid },
  } = useForm();

  const [trigger] = useUpdateWorkspaceMutation();

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const onSubmit = async (data) => {
    setIsLoadingForm(true)
    const body = {
      ...data,
      initials,
      color
    }
    try {
      const data = await trigger({body,workspaceId}).unwrap()
      if (data.code === 200){
        toast.success("Se ha actualizado!", { icon: "😃" })
        setIsShowEditForm(!isShowEditForm)
      }
      else toast.error("Upss! ocurrió un error", { icon: "😕" })

    } catch (error) {
      console.log(error);
      toast.error("Upss! ocurrió un error", { icon: "😕" });
    } finally {
      setIsLoadingForm(false);
    }
  };

  useEffect(() => {
    setValue("name", name);
    setValue("description", description);
  }, [workspaceId, setValue, name, description]);

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
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
              id: "name",
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
            // htmlFor="name"
            className="form-label font-weight-600 font-size-12-14"
          >
            Descripción:
          </label>
          <textarea
            {...register("description", {
              required: false,
            })}
            placeholder="Descripción"
            className="form-control custom-text-area-form"
            name="description"
            id="description"
          ></textarea>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-2">
          <button
            className="btn_login"
            type="submit"
            disabled={isLoadingForm || !isValid}
          >
            {!isLoadingForm ? "Guardar" : "Cargando..."}
          </button>

          <button
            className="btn btn-secondary"
            type="reset"
            onClick={() => setIsShowEditForm(!isShowEditForm)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkspace;
