import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setUserDataCookie } from "../../helpers/authCookies";
import { setUser as setUserRedux } from "../../redux/slices/authSlice";
import { useUpdateProfileMutation } from "../../rtkQuery/apiSliceMyProfile";
import { COLORS } from "../../utils/contants/colorsHex";
import "./MyProfile.css";

/**
 * Página de Mi Perfil
 * @returns Página JSX de Mi Perfil
 */
const MyProfile = () => {
	const userRedux = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const [user, setUser] = useState({
		username: userRedux.username,
		name: userRedux.name,
		email: userRedux.email,
		picture_url: userRedux.picture_url,
		color: userRedux.color
	});
	const [color, setColor] = useState(userRedux.color ?? COLORS[0].value);
	const [imageSource, setImageSource] = useState(userRedux.picture_url);
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

	const handleSave = async () => {
		if (user.username === "" || user.name === "" || user.email === "") {
			setShowUserErrorToast(true);
			return;
		}

		setIsUploading(true);
		let formData = new FormData();
		formData.append("username", user.username);
		formData.append("name", user.name);
		formData.append("email", user.email);
		if (color) formData.append("color", color);
		if (imageFile) formData.append("picture_url", imageFile);

		let result = await updateProfile({ userId: userRedux.id, body: formData });
		if (result.data.code == 200) {
			dispatch(setUserRedux(result.data.response));
			setUserDataCookie(result.data.response);
			setShowSuccessToast(true);
		}
		setIsUploading(false);
	};

	const selectColorProfile = (color) => {
		setColor(color.value);
		setImageSource("");
		setImageFile(null);
	};

	const selectImageProfile = (event) => {
		const file = event.target.files[0];
		setImageFile(file);
		setColor(null);

		const reader = new FileReader();
		reader.onloadend = () => {
			setImageSource(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const addProfilePicture = () => {
		document.getElementById("image-input").click();
	};

	const deleteProfilePicture = () => {
		setImageSource("");
	};

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
							{imageSource ?
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
										onClick={deleteProfilePicture}>
										<i className="bi bi-x-lg"></i>
									</Badge>
								</div>
							:	<div id="text-avatar">
									<OverlayTrigger
										trigger="click"
										placement="bottom"
										overlay={
											<Popover>
												<Popover.Body className="d-flex flex-wrap justify-content-center">
													{COLORS.map((color) => (
														<Button
															key={color.name}
															variant="light"
															onClick={() => selectColorProfile(color)}>
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
										onChange={selectImageProfile}
										className="d-none"
									/>
									<Badge
										id="add-profile-picture"
										className="position-absolute translate-middle rounded-circle p-2 border border-light border-3"
										onClick={addProfilePicture}>
										<i className="bi bi-plus-lg"></i>
									</Badge>
								</div>
							}
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
							onClick={handleSave}>
							{!isUploading ?
								"Guardar"
							:	<>
									<Spinner
										animation="border"
										size="sm"
										className="me-2">
										<span className="visually-hidden">Guardando...</span>
									</Spinner>
									<span>Guardando...</span>
								</>
							}
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

