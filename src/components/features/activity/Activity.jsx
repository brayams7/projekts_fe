import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostComment from "./comments/PostComment";
import { useGetCommentsQuery } from "../../../rtkQuery/apiSliceFeature";
import Comment from "./comments/Comment";
import "./activity.css";

/**
 * Componente que muestra la actividad de un módulo
 * @param {*} feature Módulo
 * @returns JSX del componente
 */
const Activity = ({ feature }) => {
	const user = useSelector((state) => state.auth.user);
	const [comments, setComments] = useState([]);
	const { isLoading, data } = useGetCommentsQuery(feature.id);

	useEffect(() => {
		if (data?.response) {
			setComments(data.response);
		}
	}, [data]);

	return (
		<div className="container vh-100 d-flex flex-column">
			<div
				id="comments"
				className="d-flex flex-column overflow-y-scroll border mt-3 mx-1">
				{isLoading ? (
					<div className="d-flex h-100 justify-content-center align-items-center">
						<p className="fs-5 fw-semibold">Cargando...</p>
					</div>
				) : comments.length ? (
					comments.map((comment) => (
						<div
							key={comment.id}
							className={`d-flex ${
								comment.user.id == user.id ? "justify-content-end" : "justify-content-start"
							}`}>
							<Comment comment={comment} />
						</div>
					))
				) : (
					<div className="d-flex h-100 justify-content-center align-items-center">
						<p className="fs-5 fw-semibold">Aún no hay comentarios</p>
					</div>
				)}
			</div>
			<div
				id="post-comment"
				className="row justify-content-center m-1">
				<PostComment featureId={feature.id} />
			</div>
		</div>
	);
};

export default Activity;

