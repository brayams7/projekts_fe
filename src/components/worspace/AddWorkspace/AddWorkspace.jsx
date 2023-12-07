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
	const [name, setName] = useState("");
	const [initials, setInitials] = useState("");
	const [description, setDescription] = useState("");
	const [color, setColor] = useState("#000000");
	const [invalidName, setInvalidName] = useState(true);
	const [invalidDescription, setInvalidDescription] = useState(true);
	const [invalidColor, setInvalidColor] = useState(true);

	const handleHideModal = () => {
		properties.setShow(false);
		setPage(0);
		setName("");
		setInitials("");
		setDescription("");
		setColor("#000000");
	};

	const handlePreviousPage = () => {
		swiper.slidePrev();
	};

	const handleNextPageOrCreate = () => {
		switch (page) {
			case 0:
				if (invalidName) {
					return;
				} else {
					swiper.slideNext();
				}
				break;
			case 1:
				if (invalidDescription) {
					return;
				} else {
          swiper.slideNext();
        }
				break;
			case 2:
				if (invalidColor) {
					return;
				} else {
          swiper.slideNext();
        }
				break;
			case 3:
				handleCreateWorkspace();
				return;
			default:
				break;
		}
	};

	const handleCreateWorkspace = () => {
		console.log("Crear espacio de trabajo");
	};

	const handleChangeName = (value) => {
		if (value.length === 0) {
			setInvalidName(true);
			setName("");
			setInitials("");
			return;
		}

		setName(value);

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
		setInvalidName(false);
	};

	const handleChangeDescription = (value) => {
		if (value.length === 0) {
			setInvalidDescription(true);
			setDescription("");
			return;
		}

		setDescription(value);
		setInvalidDescription(false);
	};

	const handleChangeColor = (value) => {
		if (COLORS.includes(value)) {
			setInvalidColor(true);
			setColor("#000000");
			return;
		}

		setColor(value);
		setInvalidColor(false);
	};

	return (
		<Modal
			show={properties.show}
			onShow={() => setPage(0)}
			onHide={handleHideModal}
			centered
			backdrop="static"
			dialogClassName="my-modal">
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
									onChange={(event) => handleChangeName(event.target.value)}
									value={name}
									required
									isInvalid={invalidName}
									isValid={!invalidName}
								/>
								<Form.Control.Feedback>El nombre es válido</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">El nombre es requerido</Form.Control.Feedback>
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
									value={description}
									onChange={(event) => handleChangeDescription(event.target.value)}
									required
									isInvalid={invalidDescription}
									isValid={!invalidDescription}
								/>
								<Form.Control.Feedback>La descripción es válida</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									La descripción es requerida
								</Form.Control.Feedback>
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
									required
									isInvalid={invalidColor}
									isValid={!invalidColor}
								/>
							</Form.Group>
							<div>
								{COLORS.map((color, index) => {
									return (
										<ColorButton
											className="m-1"
											key={index}
											color={color.value}
											onClick={() => handleChangeColor(color.value)}
											tabIndex={-1}
										/>
									);
								})}
							</div>
						</SwiperSlide>
						<SwiperSlide className="swiperSlider">
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
									value={description}
									disabled
									style={{ resize: "none" }}
								/>
							</InputGroup>
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
				<Button
					className="swiperButton"
					onClick={handleNextPageOrCreate}>
					{page < 3 ? "Siguiente" : "Crear"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddWorkspace;

