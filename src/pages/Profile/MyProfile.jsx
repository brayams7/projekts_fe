import { useState, useEffect } from "react";
import Avatar from "react-avatar";
import {
	Badge,
	Button,
	Col,
	Container,
	Form,
	InputGroup,
	OverlayTrigger,
	Popover,
	Row,
	Spinner,
	Toast,
	ToastContainer
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../rtkQuery/apiSliceMyProfile";
import "./MyProfile.css";

/**
 * Página de Mi Perfil
 * @returns Página JSX de Mi Perfil
 */
const MyProfile = () => {
	const colors = [
		{ name: "Gris", value: "#656f7d" },
		{ name: "Café", value: "#aa8d80" },
		{ name: "Violeta", value: "#b660e0" },
		{ name: "Rosa", value: "#ee5e99" },
		{ name: "Rojo", value: "#d33d44" },
		{ name: "Naranja", value: "#e16b16" },
		{ name: "Amarillo", value: "#f8ae00" },
		{ name: "Verde", value: "#008844" },
		{ name: "Menta", value: "#64c6a2" },
		{ name: "Aguamarina", value: "#0f9d9f" },
		{ name: "Celeste", value: "#1090e0" },
		{ name: "Azul", value: "#4466ff" },
		{ name: "Púrpura", value: "#5f55ee" }
	];

	const userId = useSelector((state) => state.auth.user.id);

	const [color, setColor] = useState(colors[0].value);
	const [user, setUser] = useState();
	const [imageSource, setImageSource] = useState();
	const [imageFile, setImageFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [showSuccessToast, setShowSuccessToast] = useState(false);
	const [showErrorToast, setShowErrorToast] = useState(false);
	const [showUserErrorToast, setShowUserErrorToast] = useState(false);

	const [updateProfile] = useUpdateProfileMutation();

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		});
	};

	useEffect(() => {
		updateProfile({ userId: userId }).then((result) => {
			if (result.data.code == 200) {
				setUser(result.data.response);
				setImageSource(result.data.response.picture_url);
			}
		});
	}, [updateProfile, userId]);

	if (!user) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<Spinner
					animation="border"
					className="me-2">
					<span className="visually-hidden">Cargando...</span>
				</Spinner>
				<span>Cargando...</span>
			</div>
		);
	}

	return (
		<>
			<Container>
				<Row>
					<Col
						md={4}
						className="d-flex justify-content-center align-items-start">
						<div className="d-flex justify-content-center position-relative mt-3">
							{imageSource ? (
								<div id="image-avatar">
									<Avatar
										size="175"
										src={imageSource}
										round={true}
									/>
									<Badge
										id="delete-profile-picture"
										className="position-absolute translate-middle rounded-circle p-2 border border-light border-3"
										bg="danger"
										onClick={() => {
											setImageSource("");
										}}>
										<i className="bi bi-x-lg"></i>
									</Badge>
								</div>
							) : (
								<div id="text-avatar">
									<OverlayTrigger
										trigger="click"
										placement="bottom"
										overlay={
											<Popover>
												<Popover.Body className="d-flex flex-wrap justify-content-center">
													{colors.map((color) => (
														<Button
															key={color.name}
															variant="light"
															onClick={() => {
																setColor(color.value);
																setImageSource("");
																setImageFile(null);
															}}>
															<i
																className="bi bi-circle-fill"
																style={{ color: color.value }}></i>
														</Button>
													))}
												</Popover.Body>
											</Popover>
										}>
										<Avatar
											name={user.name}
											color={color}
											size="175"
											textSizeRatio={2}
											round={true}
										/>
									</OverlayTrigger>
									<input
										id="image-input"
										type="file"
										onChange={(event) => {
											const file = event.target.files[0];
											setImageFile(file);

											const reader = new FileReader();
											reader.onloadend = () => {
												setImageSource(reader.result);
											};
											reader.readAsDataURL(file);
										}}
										className="d-none"
									/>
									<Badge
										id="add-profile-picture"
										className="position-absolute translate-middle rounded-circle p-2 border border-light border-3"
										onClick={() => {
											document.getElementById("image-input").click();
										}}>
										<i className="bi bi-plus-lg"></i>
									</Badge>
								</div>
							)}
						</div>
					</Col>
					<Col md={8}>
						<div className="mb-4">
							<Form.Label htmlFor="username-input">Nombre de Usuario</Form.Label>
							<InputGroup>
								<InputGroup.Text id="at-sign">@</InputGroup.Text>
								<Form.Control
									id="username-input"
									type="text"
									name="username"
									value={user.username}
									onChange={handleChange}
								/>
							</InputGroup>
						</div>
						<div className="mb-4">
							<Form.Label htmlFor="name-input">Nombre(s)</Form.Label>
							<InputGroup>
								<Form.Control
									id="name-input"
									type="text"
									name="name"
									value={user.name}
									onChange={handleChange}
								/>
							</InputGroup>
						</div>
						<div className="mb-4">
							<Form.Label
								htmlFor="email-input"
								className="form-label">
								Correo electrónico
							</Form.Label>
							<InputGroup>
								<Form.Control
									id="email-input"
									type="text"
									name="email"
									value={user.email}
									onChange={handleChange}
								/>
							</InputGroup>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="d-flex justify-content-end">
						<Button
							id="save-button"
							disabled={isUploading}
							onClick={async () => {
								if (user.username === "" || user.name === "" || user.email === "") {
									setShowUserErrorToast(true);
									return;
								}

								setIsUploading(true);
								let formData = new FormData();
								formData.append("username", user.username);
								formData.append("name", user.name);
								formData.append("email", user.email);
								formData.append("picture_url", imageFile);

								let result = await updateProfile({ userId: userId, body: formData });
								if (result.data.code == 200) {
									setShowSuccessToast(true);
								}
								setIsUploading(false);
							}}>
							{!isUploading ? (
								"Guardar"
							) : (
								<>
									<Spinner
										animation="border"
										size="sm"
										className="me-2">
										<span className="visually-hidden">Guardando...</span>
									</Spinner>
									<span>Guardando...</span>
								</>
							)}
						</Button>
					</Col>
				</Row>
			</Container>

			{/* Toasts */}

			<ToastContainer
				position="bottom-end"
				className="p-2">
				<Toast
					show={showSuccessToast}
					delay={3000}
					autohide
					bg="success"
					onClose={() => setShowSuccessToast(false)}>
					<Toast.Body className="text-white">Se guardaron los cambios correctamente.</Toast.Body>
				</Toast>
			</ToastContainer>

			<ToastContainer
				position="bottom-end"
				className="p-2">
				<Toast
					show={showErrorToast}
					delay={3000}
					autohide
					bg="danger"
					onClose={() => setShowErrorToast(false)}>
					<Toast.Body className="text-white">Ocurrió un error al guardar cambios.</Toast.Body>
				</Toast>
			</ToastContainer>

			<ToastContainer
				position="bottom-end"
				className="p-2">
				<Toast
					show={showUserErrorToast}
					delay={3000}
					autohide
					bg="warning"
					onClose={() => setShowUserErrorToast(false)}>
					<Toast.Body>Debe ingresar datos para guardar cambios.</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default MyProfile;

