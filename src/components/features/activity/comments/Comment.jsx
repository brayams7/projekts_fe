import { useState } from "react";
import { useSelector } from "react-redux";
import SimpleModal from "../../../utilsComponents/modal/SimpleModal";
import { useModal } from "../../../../hooks/modal/useSimpleModal";
import fileDownload from "js-file-download";
import "./Comment.css";

/**
 * Función que convierte una fecha en formato ISO a una fecha en formato local
 * @param {string} dateString Fecha en formato ISO
 * @returns Fecha en formato local
 */
const convertDate = (dateString) => {
	const date = new Date(dateString);
	const options = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric"
	};

	if (isNaN(date)) {
		return "Fecha inválida";
	} else {
		return date.toLocaleDateString(navigator.language || navigator.userLanguage || "es-ES", options);
	}
};

/**
 * Componente que muestra un comentario
 * @param {Object} param0 Propiedades del componente
 * @returns JSX del componente
 */
const Comment = ({ comment }) => {
	const user = useSelector((state) => state.auth.user);
	const dateString = convertDate(comment.created_at);
	const { isOpen, onOpen, onClose } = useModal();
	const [attachment, setAttachment] = useState();

	const handleAttachment = (attachment) => {
		setAttachment(attachment);
		onOpen();
	};

	const handleDownloadAttachment = () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyUrl + attachment.url)
      .then((response) => response.blob())
      .then((blob) => {
        fileDownload(blob, attachment.url.split("/").pop());
      })
      .catch((error) => {
        console.log(error);
        let link = document.createElement("a");
        link.href = attachment.url;
        link.download = attachment.url.split("/").pop();
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
	};

	return (
		<>
			<div className="card m-2 w-75">
				<div className="card-body">
					<div className="d-flex">
						<div className="card-title d-flex align-items-center">
							<p className="mb-0">
								<i className="bi bi-person-circle me-2 fs-1 person-icon"></i>
							</p>
							<div>
								<p className="m-0 fw-semibold">{`${
									user.id == comment.user.id ? "Tú" : comment.user.name
								}`}</p>
								<p className="m-0 opacity-50 date-text">{dateString}</p>
							</div>
						</div>
					</div>
					<p className="card-text">{comment.comment}</p>
				</div>
				<div className="card-footer text-end d-flex justify-content-end">
					{comment.attachments.length ? (
						comment.attachments.map((attachment, index) => (
							<button
								id="attachment-button"
								key={index}
								type="button"
								className="btn btn-outline-secondary btn-sm me-2 text-truncate"
								onClick={() => handleAttachment(attachment)}>
								<i className="bi bi-paperclip me-1"></i>
								{attachment.url.split("/").pop()}
							</button>
						))
					) : (
						<></>
					)}
					<button
						type="button"
						className="btn btn-sm rounded-circle reaction-button">
						<i className="bi bi-hand-thumbs-up-fill"></i>
					</button>
				</div>
			</div>
			<SimpleModal
				isOpen={isOpen}
				onClose={onClose}
				title={attachment?.url.split("/").pop()}>
				{["png", "jpg", "jpeg", "gif"].includes(attachment?.url.split(".").pop()) ? (
					<div className="container">
						<div className="row">
							<img
								src={attachment.url}
								className="img-fluid"
								alt={attachment.url.split("/").pop()}
							/>
						</div>
					</div>
				) : (
					<p className="text-center">No hay vista previa para este archivo</p>
				)}
				<div className="row d-grid pt-2 pe-2 justify-content-end">
					<button
						id="download-attachment-button"
						type="button"
						className="btn"
						onClick={() => handleDownloadAttachment()}>
						<i className="bi bi-download me-2"></i>
						Descargar
					</button>
				</div>
			</SimpleModal>
		</>
	);
};

export default Comment;

