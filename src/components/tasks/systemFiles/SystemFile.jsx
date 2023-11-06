import { useRef, useState } from "react";
import { useDeleteAttachmentOfFeatureMutation, useListAttachmentsOfFeatureQuery, useUploadAttachmentOfFeatureMutation } from "../../../rtkQuery/apiSliceFeature";
import ListAttachments from "../../features/attachments/listAttachments/ListAttachments";
import { AttachmentLoader } from "../../utilsComponents/MySkeleton";
import "./systemFile.css";
import { AttachIcon } from "../../../utils/icons/iconsMenu";
import LoadingIcon from '../../../assets/loadings/EllipsisLoading40px.svg'
import { toast } from "react-toastify";
import { axiosToken } from "../../../services/settings";

const SystemFile = ({ feature }) => {
  const { isLoading, isError, data, currentData } =
    useListAttachmentsOfFeatureQuery(feature?.id)

  const [uploadAttachmentRequest, {isLoading:isLoadingUploadFile}] = useUploadAttachmentOfFeatureMutation()

  const [deleteAttachmentRequest, {isLoading:isLoadingDeleteAtt}] = useDeleteAttachmentOfFeatureMutation()


  const [newAttachment, setNewAttachment] = useState(null);
  const inputFileRef = useRef()

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAttachment(file);
    }
  }

  const handleSubmit = async ()=>{
    try {

      const form = new FormData()
      const nameFile =  newAttachment.name
      form.append("file", newAttachment, nameFile)

      const response = await uploadAttachmentRequest({
        body:form,
        featureId:feature.id
      }).unwrap()

      if(response.code === 200){
        toast.success("Tablero creado!",{icon:"😃"})
        inputFileRef.current = null
        setNewAttachment(null)
      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})
      }
    } catch (error) {
      console.log(error)
      toast.error("Upss! ocurrió un error",{icon:"😕"})
    }
  }

  const handleDowloand = async (attachmentId, name)=>{
    try {
      const response = await axiosToken.get(`/downloadAttachment/${attachmentId}`,{
        responseType:'blob'
      })
      const url = URL.createObjectURL(new Blob([response]))
      const $link = document.createElement('a')
      $link.href =  url

      $link.setAttribute("download",name)
      document.body.appendChild($link)
      $link.click()
      document.body.removeChild($link)

    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (attachmentId)=>{
    try {

      const response = await deleteAttachmentRequest({
        attachmentId,
        featureId:feature.id
      }).unwrap()

      if(response.code === 200){
        toast.success("Tablero creado!",{icon:"😃"})
      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})
      }
    } catch (error) {
      console.log(error)
      toast.error("Upss! ocurrió un error",{icon:"😕"})
    }
  }

  if (isLoading && !currentData) {
    return (
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        <AttachmentLoader />
        <AttachmentLoader />
        <AttachmentLoader />
      </div>
    );
  }

  if (isError) {
    <p>Ups... Ocurrió un error</p>;
  }

  return (
    <div className="mb-2 sytem-file-container">
      <h4>Adjuntos</h4>
      <div className="mb-3 d-flex gap-3 align-items-center">
        <div>
          <label
            className="custom-icon-border-dashed"
            htmlFor="fileTask"
            role="button"
          >
            <AttachIcon fill="var(--gray-600)" height="24" width="24"/>
          </label>

          <input
            ref={inputFileRef}
            type="file"
            hidden
            className="form-control"
            id="fileTask"
            onChange={handleChange}
          />
        </div>
        <div className="attachment-details font-size-12-14 d-flex flex-grow-1">
          {newAttachment && (
            <div className="details d-flex gap-2 align-items-center">
              <span className="title-break-all" title={newAttachment.name}>
                {newAttachment.name}
              </span>
              <span className="fw-bold">
                {`${Math.floor(newAttachment.size / 1000)}`}
              </span>

              <span className="fw-bold">KB</span>

              <button
                className="fw-bold mx-3 gray-color-600"
                onClick={()=>{
                  setNewAttachment(null)
                  inputFileRef.current = null
                }}
              >X</button>


            </div>
          )}
              <button
              style={{minWidth:110}}
                className="font-size-12-14 px-2 rounded button-upload px-2 py-2 ms-auto custom-button-disabled"
                disabled={(!newAttachment|| isLoadingUploadFile)}
                onClick={handleSubmit}
              >
                Subir archivo
              </button>

              {
                isLoading && (
                  <img className="me-auto" src={LoadingIcon} alt="loading" />
                )
              }
        </div>
      </div>

      {data && <ListAttachments
        ListAttachments={data}
        handleDowloand={handleDowloand}
        handleDelete={handleDelete}
        isLoadingDeleteAtt={isLoadingDeleteAtt}
      />}
    </div>
  );
};

export default SystemFile;
