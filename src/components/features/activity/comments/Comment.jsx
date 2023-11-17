import { useSelector } from "react-redux";
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

	return (
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
						<a
							key={index}
							href={attachment.url}
							target="_blank"
							rel="noopener noreferrer">
							<button
								type="button"
								className="btn btn-outline-secondary btn-sm me-2">
								<i className="bi bi-paperclip me-1"></i>
								{attachment.url.split("/").pop()}
							</button>
						</a>
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
	);
};

export default Comment;

