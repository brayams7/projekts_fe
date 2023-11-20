import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostComment from "./comments/PostComment";
import { useGetCommentsQuery, useLazyGetCommentsByCursorQuery } from "../../../rtkQuery/apiSliceFeature";
import Comment from "./comments/Comment";
import "./activity.css";
import InfiniteScroll from "react-infinite-scroll-component";

/**
 * Componente que muestra la actividad de un módulo
 * @param {*} feature Módulo
 * @returns JSX del componente
 */
const Activity = ({ feature }) => {
	const [comments, setComments] = useState([]);
	const [nextCursor, setNextCursor] = useState();
	const user = useSelector((state) => state.auth.user);
	const { isLoading, data } = useGetCommentsQuery({ featureId: feature.id });
	const [getCommentsByCursor] = useLazyGetCommentsByCursorQuery();

	useEffect(() => {
		if (data?.response?.data) {
			setComments(data.response.data);
			setNextCursor(data.response.next_cursor);
		}
	}, [data]);

	const fetchMoreData = () => {
		if (nextCursor) {
			getCommentsByCursor({ featureId: feature.id, cursor: nextCursor }).then((response) => {
				setComments([...comments, ...response.data.response.data]);
				setNextCursor(response.data.response.next_cursor);
			});
		}
	};

	return (
		<div className="container vh-100 d-flex flex-column">
			<div
				id="comments"
				className="d-flex flex-column-reverse overflow-y-scroll border mt-3 mx-1">
				{isLoading ? (
					<div className="d-flex h-100 justify-content-center align-items-center">
						<div
							id="spinner"
							className="spinner-border"
							role="status">
							<span className="visually-hidden">Cargando...</span>
						</div>
						<p className="fs-5 fw-semibold ms-2 mb-0">Cargando...</p>
					</div>
				) : comments.length ? (
					<InfiniteScroll
						className="d-flex flex-column-reverse"
						dataLength={comments.length}
						next={fetchMoreData}
						hasMore={nextCursor}
						inverse={true}
						scrollableTarget="comments"
						loader={
							<div className="d-flex justify-content-center align-items-center mt-3 mb-1">
								<div
									id="spinner"
									className="spinner-border spinner-border-sm"
									role="status">
									<span className="visually-hidden">Cargando...</span>
								</div>
								<p className="fs-6 ms-2 mb-0">Cargando...</p>
							</div>
						}
            endMessage={
              <p className="fs-6 text-center mt-3 mb-1">Ya no hay más comentarios</p>
            }>
						{comments.map((comment) => (
							<div
								key={comment.id}
								className={`d-flex ${
									comment.user.id == user.id ? "justify-content-end" : "justify-content-start"
								}`}>
								<Comment comment={comment} />
							</div>
						))}
					</InfiniteScroll>
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

