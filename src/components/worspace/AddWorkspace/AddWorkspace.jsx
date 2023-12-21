import { useState } from "react";
import { Button as ButtonReactBootstrap, InputGroup, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useListTypeWorkspaceQuery } from "/src/rtkQuery/apiSliceTypeWorkspace.js";
import { useCreateWorkspaceMutation } from "/src/rtkQuery/apiSliceWorkspace.js";
import { COLORS } from "/src/utils/contants/colorsHex.js";
import Button from "../../utilsComponents/button/Button";
import ColorButton from "../../utilsComponents/colorButton/ColorButton";
import "./AddWorkspace.css";
import { getInitials } from "/src/utilsFunctions/generalFuntions.js";

const AddWorkspace = (properties) =>
{
  const user = useSelector((state) => state.auth.user);
  const [createWorkspace] = useCreateWorkspaceMutation();
  const { data: workspaceTypes, isFetching: isFetchingWorkspaceTypes } = useListTypeWorkspaceQuery();

  const [swiper, setSwiper] = useState(null);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#000000");
  const [type, setType] = useState("");
  const [invalidName, setInvalidName] = useState("initial");
  const [invalidDescription, setInvalidDescription] = useState("initial");
  const [invalidColor, setInvalidColor] = useState("initial");
  const [invalidType, setInvalidType] = useState("initial");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleHideModal = () =>
  {
    setPage(0);
    setName("");
    setInitials("");
    setDescription("");
    setColor("#000000");
    setType("");
    setInvalidName("initial");
    setInvalidDescription("initial");
    setInvalidColor("initial");
    setInvalidType("initial");
    properties.setShow(false);
  };

  const handlePreviousPage = () =>
  {
    swiper.slidePrev();
  };

  const handleNextPage = () =>
  {
    switch (page)
    {
      case 0:
        if (invalidName === "initial")
        {
          setInvalidName("true");
        }
        else
        {
          if (invalidName === "false")
          {
            swiper.slideNext();
          }
        }
        break;
      case 1:
        if (invalidDescription === "initial")
        {
          setInvalidDescription("true");
        }
        else
        {
          if (invalidDescription === "false")
          {
            swiper.slideNext();
          }
        }
        break;
      case 2:
        if (invalidColor === "initial")
        {
          setInvalidColor("true");
        }
        else
        {
          if (invalidColor === "false")
          {
            swiper.slideNext();
          }
        }
        break;
      case 3:
        if (invalidType === "initial")
        {
          setInvalidType("true");
        }
        else
        {
          if (invalidType === "false")
          {
            swiper.slideNext();
          }
        }
        break;
      default:
        break;
    }
  };

  const handleCreateWorkspace = async () =>
  {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("initials", initials);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("workspace_type_id", type);
    formData.append("user_id", user.id);

    const result = await createWorkspace(formData);

    if (result?.data)
    {
      setShowSuccessToast(true);
      handleHideModal();
    }
    else
    {
      if (result?.error)
      {
        setShowErrorToast(true);
        console.error(result.error);
      }
    }
  };

  const handleChangeName = (value) =>
  {
    if (value.length === 0)
    {
      setInvalidName("true");
      setName("");
      setInitials("");
      return;
    }

    setName(value);
    setInitials(getInitials(value));
    setInvalidName("false");
  };

  const handleChangeDescription = (value) =>
  {
    if (value.length === 0)
    {
      setInvalidDescription("true");
      setDescription("");
      return;
    }

    setDescription(value);
    setInvalidDescription("false");
  };

  const handleChangeColor = (value) =>
  {
    if (COLORS.includes(value))
    {
      setInvalidColor("true");
      setColor("#000000");
      return;
    }

    setColor(value);
    setInvalidColor("false");
  };

  const handleChangeType = (value) =>
  {
    if (value.length === 0)
    {
      setInvalidType("true");
      setType("");
      return;
    }

    setType(value);
    setInvalidType("false");
  };

  if (isFetchingWorkspaceTypes)
  {
    return (
      <Modal
        show={properties.show}
        onHide={handleHideModal}
        centered
        backdrop="static"
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>Agregar Espacio de Trabajo</Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <Spinner
              id="spinner"
              animation="border"
              className="me-2"
            />
            Cargando...
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        show={properties.show}
        onShow={() => setPage(0)}
        onHide={handleHideModal}
        centered
        backdrop="static"
        dialogClassName="my-modal"
      >
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
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {/* Form */}

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
                    isInvalid={invalidName === "true" || invalidName === "repeated"}
                    isValid={invalidName === "false"}
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
                    isInvalid={invalidDescription === "true"}
                    isValid={invalidDescription === "false"}
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
                    isInvalid={invalidColor === "true"}
                    isValid={invalidColor === "false"}
                  />
                  <Form.Control.Feedback>El color es válido</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">El color es requerido</Form.Control.Feedback>
                </Form.Group>
                <div>
                  {COLORS.map((color, index) =>
                  {
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
                <Form.Group className="w-100 mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Tipo de espacio de trabajo"
                    tabIndex={-1}
                    onChange={(event) => handleChangeType(event.target.value)}
                    value={type}
                    required
                    isInvalid={invalidType === "true"}
                    isValid={invalidType === "false"}
                  >
                    <option value="">Tipo de espacio de trabajo</option>
                    {workspaceTypes.map((typeWorkspace, index) =>
                    {
                      if (index === 0) return;
                      return (
                        <option
                          key={typeWorkspace.id}
                          value={typeWorkspace.id}
                        >
                          {typeWorkspace.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <Form.Control.Feedback>El tipo es válido</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">El tipo es requerido</Form.Control.Feedback>
                </Form.Group>
              </SwiperSlide>

              {/* Preview */}
              <SwiperSlide id="swiperSliderPreview">
                <InputGroup className="mb-3">
                  <InputGroup.Text className="previewName">Nombre</InputGroup.Text>
                  <Form.Control
                    value={name}
                    disabled
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="previewName">Iniciales</InputGroup.Text>
                  <Form.Control
                    value={initials}
                    disabled
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="previewName">Color</InputGroup.Text>
                  <Form.Control
                    type="color"
                    value={color}
                    disabled
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="previewName">Descripción</InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    placeholder="Descripción del espacio de trabajo"
                    value={description}
                    disabled
                    style={{ resize: "none" }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="previewName">Tipo</InputGroup.Text>
                  <Form.Control
                    as="select"
                    value={type}
                    disabled
                  >
                    <option value="">Tipo de espacio de trabajo</option>
                    {workspaceTypes.map((typeWorkspace, index) =>
                    {
                      return (
                        <option
                          key={index}
                          value={typeWorkspace.id}
                        >
                          {typeWorkspace.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </InputGroup>
              </SwiperSlide>
            </Swiper>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {page >
            0 &&
            (
              <ButtonReactBootstrap
                variant="outline-secondary"
                onClick={handlePreviousPage}
              >
                Anterior
              </ButtonReactBootstrap>
            )}
          {page < 4 ? <Button onClick={handleNextPage}>Siguiente</Button> :
            <Button onClick={handleCreateWorkspace}>Crear</Button>}
        </Modal.Footer>
      </Modal>

      {/* Toasts */}
      <ToastContainer
        position="bottom-end"
        className="p-2"
      >
        <Toast
          show={showSuccessToast}
          delay={3000}
          autohide
          bg="success"
          onClose={() => setShowSuccessToast(false)}
        >
          <Toast.Body className="text-white">Se creó el Espacio de Trabajo correctamente.</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer
        position="bottom-end"
        className="p-2"
      >
        <Toast
          show={showErrorToast}
          delay={3000}
          autohide
          bg="danger"
          onClose={() => setShowErrorToast(false)}
        >
          <Toast.Body className="text-white">Ocurrió un error al crear el Espacio de Trabajo.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AddWorkspace;

