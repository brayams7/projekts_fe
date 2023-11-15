import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast } from "bootstrap";
import { usePostCommentMutation } from "../../../../rtkQuery/apiSliceFeature";
import { $getRoot } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorCommentConfig } from "../../../../config/lexicalEditorConfig";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import OnChangePlugin from "../../../wysiwyg/plugins/OnChangePlugin";

/**
 * Componente que permite publicar un comentarios
 * @param {*} param0 ID del módulo
 * @returns JSX del componente
 */
const Comment = ({ featureId }) => {
	const [comment, setComment] = useState();
	const user = useSelector((state) => state.auth.user);
	const [postComment] = usePostCommentMutation();
	const [editor, setEditor] = useState();
	const userErrorToastRef = useRef();
	const errorToastRef = useRef();
	const successToastRef = useRef();
	const loadingToastRef = useRef();
	const submitCommentButton = useRef();
	const [errorToast, setErrorToast] = useState();
	const [userErrorToast, setUserErrorToast] = useState();
	const [successToast, setSuccessToast] = useState();
	const [loadingToast, setLoadingToast] = useState();

	const handleChangeContent = (editorState, editor) => {
		setEditor(editor);
		submitCommentButton.current.disabled = false;

		editorState.read(() => {
			const stringifiedEditorState = JSON.stringify(editorState.toJSON());
			const c = editor.parseEditorState(stringifiedEditorState);
			const editorStateTextString = c.read(() => $getRoot().getTextContent());

			setComment({
				comment: editorStateTextString,
				feature_id: featureId,
				user_id: user.id
			});
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		editor.setEditable(false);
		submitCommentButton.current.disabled = true;

		if (comment?.comment) {
			loadingToast.show();
			const result = await postComment(comment);

			if (result?.data.code == 200) {
				editor.update(() => {
					$getRoot().clear();
				});
				successToast.show();
			} else {
				console.log(result.error);
				errorToast.show();
			}
		} else {
			userErrorToast.show();
		}

		editor.setEditable(true);
		submitCommentButton.current.disabled = false;
	};

	useEffect(() => {
		setErrorToast(new Toast(errorToastRef.current));
		setUserErrorToast(new Toast(userErrorToastRef.current));
		setSuccessToast(new Toast(successToastRef.current));
		setLoadingToast(new Toast(loadingToastRef.current));
		submitCommentButton.current.disabled = true;
	}, []);

	return (
		<>
			{/* Editor */}
			<LexicalComposer initialConfig={editorCommentConfig}>
				<div className="editor-container-comment border">
					<RichTextPlugin
						contentEditable={
							<div className="content-editable-comment-wrapper">
								<ContentEditable className="content-editable-comment" />
							</div>
						}
						placeholder={<div className="editor-placeholder ms-3">Escribe un comentario...</div>}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<OnChangePlugin onChange={handleChangeContent} />
					<HistoryPlugin />
					<AutoFocusPlugin />
				</div>

				<div className="d-flex justify-content-end editor-topbar-comment p-3">
					<button
						id="submit-comment"
						ref={submitCommentButton}
						className="bgPurple-color px-2 py-1 white-color rounded"
						onClick={handleSubmit}>
						Comentar
					</button>
				</div>
			</LexicalComposer>

			{/* Toasts */}
			<div className="toast-container position-fixed bottom-0 end-0 p-3">
				<div
					id="toast-loading"
					ref={loadingToastRef}
					className="toast align-items-center text-bg-secondary border-0"
					role="alert"
					aria-live="assertive"
					aria-atomic="true">
					<div className="d-flex">
						<div className="toast-body">Se está subiendo el comentario...</div>
						<button
							type="button"
							className="btn-close btn-close-white me-2 m-auto"
							data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
				</div>
				<div
					id="toast-success"
					ref={successToastRef}
					className="toast align-items-center text-bg-success border-0"
					role="alert"
					aria-live="assertive"
					aria-atomic="true">
					<div className="d-flex">
						<div className="toast-body">El comentario se ha subido satisfactoriamente</div>
						<button
							type="button"
							className="btn-close btn-close-white me-2 m-auto"
							data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
				</div>
				<div
					id="toast-user-error"
					ref={userErrorToastRef}
					className="toast align-items-center text-bg-danger border-0"
					role="alert"
					aria-live="assertive"
					aria-atomic="true">
					<div className="d-flex">
						<div className="toast-body">Debes escribir un texto subir un comentario.</div>
						<button
							type="button"
							className="btn-close btn-close-white me-2 m-auto"
							data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
				</div>
				<div
					id="toast-error"
					ref={errorToastRef}
					className="toast align-items-center text-bg-danger border-0"
					role="alert"
					aria-live="assertive"
					aria-atomic="true">
					<div className="d-flex">
						<div className="toast-body">Ocurrió un error al subir el comentario</div>
						<button
							type="button"
							className="btn-close btn-close-white me-2 m-auto"
							data-bs-dismiss="toast"
							aria-label="Close"></button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Comment;

