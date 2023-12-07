import { useState } from "react";
import { Button as ButtonReactBootstrap, InputGroup, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { COLORS } from "../../../utils/contants/colorsHex";
import Button from "../../utilsComponents/button/Button";
import ColorButton from "../../utilsComponents/colorButton/ColorButton";
import "./AddWorkspace.css";

const AddWorkspace = (properties) => {
	const [swiper, setSwiper] = useState();
	const [page, setPage] = useState(0);
	const [name, setName] = useState();
	const [initials, setInitials] = useState();
	const [color, setColor] = useState();

	const handleHideNewWorkspaceModal = () => {
		properties.setShow(false);
		setPage(0);
		setName("");
		setInitials("");
		setColor("");
	};

	const handlePreviousPage = () => {
		swiper.slidePrev();
	};

	const handleNextPage = () => {
		swiper.slideNext();
	};

	const handleChangeNewWorkspaceName = (event) => {
		let value = event.target.value;
		setName(value);

		if (value.length === 0) {
			setInitials("");
			return;
		}

		let names = value.trim().split(" ");
		let initials;

		if (names.length === 1 && names[0].length === 1) {
			initials = (names[0].substring(0, 1) + names[0].substring(0, 1)).toUpperCase();
		}

		if (names.length === 1 && names[0].length > 1) {
			initials = names[0].substring(0, 2).toUpperCase();
		}

		if (names.length > 1) {
			initials = (names[0].substring(0, 1) + names[names.length - 1].substring(0, 1)).toUpperCase();
		}

		setInitials(initials);
	};

	return (
		<Modal
			show={properties.show}
			onShow={() => setPage(0)}
			onHide={handleHideNewWorkspaceModal}
			centered
			backdrop="static"
			dialogClassName="my-modal"
			size="lg">
			<Modal.Header closeButton>Agregar Espacio de Trabajo</Modal.Header>
			<Modal.Body>
				<div id="modalBody">
					<Swiper
						id="swiper"
						className="d-flex flex-column justify-content-center align-items-center h-100"
						pagination={{
							type: "progressbar"
						}}
						modules={[Pagination, Navigation]}
						allowTouchMove={false}
						onSlideChange={(swiper) => setPage(swiper.activeIndex)}
						onSwiper={(swiper) => setSwiper(swiper)}>
						<SwiperSlide className="swiperSlider">
							<Form.Group className="w-100 mb-3">
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Espacio de Trabajo"
									tabIndex={-1}
									onChange={(event) => handleChangeNewWorkspaceName(event)}
									value={name}
								/>
							</Form.Group>
							<Form.Group className="w-100 mb-3">
								<Form.Label>Iniciales</Form.Label>
								<Form.Control
									type="text"
									placeholder=""
									disabled
									value={initials}
								/>
							</Form.Group>
						</SwiperSlide>
						<SwiperSlide className="swiperSlider">
							<Form.Group className="w-100">
								<Form.Label>Descripción</Form.Label>
								<Form.Control
									id="descriptionTextArea"
									as="textarea"
									placeholder="Descripción del espacio de trabajo"
									tabIndex={-1}
								/>
							</Form.Group>
						</SwiperSlide>
						<SwiperSlide className="swiperSlider">
							<Form.Group className="mb-4">
								<Form.Label>Color</Form.Label>
								<Form.Control
									id="colorPreview"
									type="color"
									disabled
									value={color}
								/>
							</Form.Group>
							<div>
								{COLORS.map((color, index) => {
									return (
										<ColorButton
											className="m-1"
											key={index}
											color={color.value}
											onClick={() => setColor(color.value)}
                      tabIndex={-1}
										/>
									);
								})}
							</div>
						</SwiperSlide>
						<SwiperSlide className="swiperSlider">
							<div>
								<h4>Resumen</h4>
								<InputGroup className="mb-3">
									<InputGroup.Text>Nombre</InputGroup.Text>
									<Form.Control
										value={name}
										disabled
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Text>Iniciales</InputGroup.Text>
									<Form.Control
										value={initials}
										disabled
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Text>Color</InputGroup.Text>
									<Form.Control
										type="color"
										value={color}
										disabled
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Text>Descripción</InputGroup.Text>
									<Form.Control
										as="textarea"
										placeholder="Descripción del espacio de trabajo"
										disabled
										style={{ resize: "none" }}
									/>
								</InputGroup>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</Modal.Body>
			<Modal.Footer>
				{page > 0 && (
					<ButtonReactBootstrap
						variant="outline-secondary"
						onClick={handlePreviousPage}>
						Anterior
					</ButtonReactBootstrap>
				)}
				{page !== 3 ?
					<Button
						className="swiperButton"
						onClick={handleNextPage}>
						Siguiente
					</Button>
				:	<Button className="swiperButton">Crear</Button>}
			</Modal.Footer>
		</Modal>
	);
};

export default AddWorkspace;

