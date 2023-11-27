import { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import "./MyProfile.css";
import { Container, Row, Col, Button, Form, InputGroup, Badge, OverlayTrigger, Popover, Image } from "react-bootstrap";

/**
 * Página de Mi Perfil
 * @returns Página JSX de Mi Perfil
 */
const MyProfile = () => {
	const colors = [
		{ name: "purple", value: "#6f42c1" },
		{ name: "blue", value: "#0d6efd" },
		{ name: "red", value: "#dc3545" },
		{ name: "yellow", value: "#ffc107" },
		{ name: "green", value: "#198754" }
	];

	const authenticatedUser = useSelector((state) => state.auth.user);
	const [color, setColor] = useState(colors[0].value);
	const [imageSource, setImageSource] = useState("");
	const [user, setUser] = useState({
		username: authenticatedUser.username,
		name: authenticatedUser.name,
		email: authenticatedUser.email
	});

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		});
	};

	return (
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
											<Popover.Body>
												{colors.map((color) => (
													<Button
														key={color.name}
														variant="light"
														onClick={() => {
															setColor(color.value);
															setImageSource("");
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
										/* maxInitials={2} */
									/>
								</OverlayTrigger>
								<input
									id="image-input"
									type="file"
									onChange={(event) => {
										const file = event.target.files[0];
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
					<Button id="save-button">Guardar</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default MyProfile;

