import "./AddWorkspacePreview.css";

const AddWorkspacePreview = (properties) => {
	return (
		<div className="d-flex flex-column mb-4">
			<div className="row mb-4">
				<div
					id="addWorkspaceTitle"
					className="col-12 col-md-4 mb-2 mb-sm-0"
					onClick={properties.onClick}>
					<span
						id="addWorkspaceIcon"
						className="d-inline-block text-center me-3">
						<i className="bi bi-plus"></i>
					</span>
					<span>Crear Espacio de Trabajo</span>
				</div>
			</div>
			<ul className="list-unstyled d-flex flex-wrap justify-content-start gap-2 list-boards-home">
				<li className="board-container-item">
					<div
						id="addWorkspaceBoard"
						className="board-item-add d-flex align-items-center justify-content-center text-center"
						onClick={properties.onClick}>
						<i className="bi bi-plus-lg"></i>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default AddWorkspacePreview;

