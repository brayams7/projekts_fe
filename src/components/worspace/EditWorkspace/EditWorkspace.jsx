import { useState } from "react";
import {
  Button as ButtonReactBootstrap,
  Col,
  Container,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Toast,
  ToastContainer
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useListTypeWorkspaceQuery } from "/src/rtkQuery/apiSliceTypeWorkspace.js";
import { useUpdateWorkspaceMutation } from "/src/rtkQuery/apiSliceWorkspace.js";
import { COLORS } from "/src/utils/contants/colorsHex.js";
import Button from "../../utilsComponents/button/Button";
import ColorButton from "../../utilsComponents/colorButton/ColorButton";
import "./EditWorkspace.css";
import { getInitials } from "/src/utilsFunctions/generalFuntions.js";

const EditWorkspace = (properties) =>
{
  const user = useSelector((state) => state.auth.user);
  const [updateWorkspace] = useUpdateWorkspaceMutation();
  const { data: workspaceTypes, isFetching: isFetchingWorkspaceTypes } = useListTypeWorkspaceQuery();

  const [swiper, setSwiper] = useState(null);
  const [page, setPage] = useState(0);
  const [name, setName] = useState(properties.name);
  const [initials, setInitials] = useState(properties.initials);
  const [description, setDescription] = useState(properties.description);
  const [color, setColor] = useState(properties.color);
  const [type, setType] = useState("properties.type");
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
        if (!name)
        {
          setInvalidName("true");
        }
        else
        {
          if (invalidName === "false" || invalidName === "initial")
          {
            swiper.slideNext();
          }
        }
        break;
      case 1:
        if (!description)
        {
          setInvalidDescription("true");
        }
        else
        {
          if (invalidDescription === "false" || invalidDescription === "initial")
          {
            swiper.slideNext();
          }
        }
        break;
      case 2:
        if (!color)
        {
          setInvalidColor("true");
        }
        else
        {
          if (invalidColor === "false" || invalidColor === "initial")
          {
            swiper.slideNext();
          }
        }
        break;
      case 3:
        if (!type)
        {
          setInvalidType("true");
        }
        else
        {
          if (invalidType === "false" || invalidType === "initial")
          {
            swiper.slideNext();
          }
        }

        break;
      default:
        break;
    }
  };

  const handleUpdateWorkspace = async () =>
  {
    const result = await updateWorkspace({
      workspaceId: properties.id, body: {
        name: name,
        initials: initials,
        description: description,
        color: color,
        workspace_type_id: type,
        user_id: user.id
      }
    });

    if (result?.data)
    {
      setShowSuccessToast(true);
      handleHideModal();
    }
    else
    {
      setShowErrorToast(true);
      console.error(result.error);
    }
  };

  const handleChangeName = (value) =>
  {
    if (value === name) return;

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
    if (value === description) return;

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
    if (value === color) return;

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
    if (value === type) return;

    if (value.length === 0)
    {
      setInvalidType("true");
      setType("");
      return;
    }

    setType(value);
    setInvalidType("false");
  };

  const Preview = () =>
  {
    // noinspection JSValidateTypes
    return (
      <>
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
      </>
    );
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

  // noinspection JSValidateTypes
  return (
    <>
      <Modal
        show={properties.show}
        onShow={() =>
        {
          setPage(0);
          setName(properties.name);
          setInitials(properties.initials);
          setDescription(properties.description);
          setColor(properties.color);
          setType(properties.type);
          setInvalidName("initial");
          setInvalidDescription("initial");
          setInvalidColor("initial");
          setInvalidType("initial");
        }}
        onHide={handleHideModal}
        centered
        backdrop="static"
        dialogClassName="my-modal"
        size={page <= 3 ? "xl" : "lg"}
      >
        <Modal.Header closeButton>Agregar Espacio de Trabajo</Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {page <=
                3 &&
                (
                  <Col lg={6}>
                    <Preview />
                  </Col>
                )}
              <Col lg={page <= 3 ? 6 : 12}>
                <Swiper
                  id={"swiper"}
                  className={"d-flex flex-column align-items-center h-100"}
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
                        isInvalid={invalidName === "true"}
                        isValid={invalidName === "false"}
                      />
                      <Form.Control.Feedback>El nombre es válido</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        El nombre es requerido
                      </Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">
                        El color es requerido
                      </Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">
                        El tipo es requerido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </SwiperSlide>
                  <SwiperSlide>
                    <h4 className={"my-2"}>Resumen</h4>
                    <Preview />
                  </SwiperSlide>
                </Swiper>
              </Col>
            </Row>
          </Container>
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
          {page <= 3 ? <Button className={"swiperButton"} onClick={handleNextPage}>Siguiente</Button> : <Button
            className={"swiperButton"}
            onClick={handleUpdateWorkspace}
          >Editar</Button>}
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
          <Toast.Body className="text-white">Ocurrió un error al editar el Espacio de Trabajo.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default EditWorkspace;
