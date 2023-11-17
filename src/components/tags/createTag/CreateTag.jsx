import ListColorsTags from "../colors/ListColorsTags";
import { useCreateTagMutation } from "../../../rtkQuery/apiSliceTags";
import { toast } from "react-toastify";

const CreateTag = ({ name = "",colorStage,setColorStage, listTags=[] }) => {
  const [createTagRequest, { isLoading }] = useCreateTagMutation();


  const validateDtata = () => colorStage && name

  const valideIsExistTag = () => listTags.some((item) => item.tag === name)

  const handleSubmit = async () => {
    if (!validateDtata()) return
    if (valideIsExistTag()) return toast.error("Ya existe un tag con ese nombre",{icon:"😕"})

    try {
      const body = {
        tag: name,
        color: colorStage,
      }

      const response = await createTagRequest(body).unwrap()
      if(response.code === 200){
        setColorStage("")
      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <p>No se encontraron tags, pero puedes agregar el ingresado</p> */}
      <div className="mb-2">
        <ListColorsTags
          colorStage={colorStage}
          setColorStage={setColorStage}
          widthContainer={"100%"}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !validateDtata()}
        className="bgPurple-color px-2 py-1 rounded white-color font_size_10_12 custom-button-disabled"
      >
        Añadir tag
      </button>
    </div>
  );
};

export default CreateTag;
