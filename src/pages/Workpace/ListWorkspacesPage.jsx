import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DropDownTypesWorkpaces from "../../components/typesWorkpace/dropDownTypesWorkspace/DropDownTypesWorkpaces";
import { HeaderWorkspaceLoader } from "../../components/utilsComponents/MySkeleton";
import Button from "../../components/utilsComponents/button/Button";
import AddWorkspace from "../../components/worspace/AddWorkspace/AddWorkspace";
import AddWorkspacePreview from "../../components/worspace/AddWorkspacePreview";
import Workspace from "../../components/worspace/Workspace";
import { useGetAllWorkspacesUserQuery } from "../../rtkQuery/apiSliceWorkspace";
import "./ListWorkspacePage.css";
import "./workspaceStyle.css";

const ListWorkspaces = () => {
	const { id } = useSelector((state) => state.auth.user);
	const [listWorkspaces, setlistWorkspaces] = useState([]);
	const [showAddWorkspace, setShowAddWorkspace] = useState(false);

	const { isLoading, data = [], currentData } = useGetAllWorkspacesUserQuery(id);

	const handleChange = (option) => {
		if (option.value === "TODOS") {
			setlistWorkspaces(data);
			return;
		}
		const workspaces = data.filter((item) => item.workspace_type_id === option.value);
		setlistWorkspaces(workspaces);
	};

	const handleShowNewWorkspaceModal = () => {
		setShowAddWorkspace(true);
	};

	useEffect(() => {
		if (data && Array.isArray(data) && data.length > 0) {
			setlistWorkspaces(data);
		}
	}, [data]);

	if (isLoading && !currentData) {
		return (
			<div className="d-flex flex-column contianerListWorkspaces fw-bold">
				<p className="mb-4">TUS ESPACIOS DE TRABAJO</p>
				<HeaderWorkspaceLoader />
			</div>
		);
	}

	return (
		<>
			<div className="d-flex flex-column contianerListWorkspaces fw-bold">
				<div className="d-flex flex-grap justify-content-between">
					<p className="mb-4">TUS ESPACIOS DE TRABAJO</p>
					<DropDownTypesWorkpaces handleChange={handleChange} />
				</div>
				<div className="d-flex justify-content-start mb-3">
					<Button onClick={handleShowNewWorkspaceModal}>
						<i className="bi bi-plus-lg"></i> Crear espacio de trabajo
					</Button>
				</div>
				{Array.isArray(listWorkspaces) &&
					listWorkspaces.length > 0 &&
					listWorkspaces.map((item) => (
						<Workspace
							key={item.id}
							color={item.color}
							updatedAt={item.updated_at}
							name={item.name}
							userId={item.user_id}
							id={item.id}
							members={item.members}
							initials={item.initials}
						/>
					))}
				{Array.isArray(listWorkspaces) && listWorkspaces.length === 0 && (
					<p className="text-center">No tienes espacios de trabajo</p>
				)}
				<AddWorkspacePreview onClick={handleShowNewWorkspaceModal} />
			</div>
			<AddWorkspace
				show={showAddWorkspace}
				setShow={setShowAddWorkspace}
			/>
		</>
	);
};

export default ListWorkspaces;

