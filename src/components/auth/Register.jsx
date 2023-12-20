import Avatar from "react-avatar";
import { Badge, Button as ButtonReactBootstrap, Card, Form, FormLabel, InputGroup } from "react-bootstrap";
import { COLORS } from "../../utils/contants/colorsHex.js";
import Button from "../utilsComponents/button/Button.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./Register.css";
import Feedback from "react-bootstrap/Feedback";
import { getInitials, validateEmail } from "../../utilsFunctions/generalFuntions.js";

const Register = () =>
{
  // Modal
  const [page, setPage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  // Datos del usuario
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureSource, setPictureSource] = useState("");
  const [pictureColor, setPictureColor] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Validaciones
  const [isValidEmail, setIsValidEmail] = useState("initial");
  const [isValidName, setIsValidName] = useState("initial");
  const [isValidUsername, setIsValidUsername] = useState("initial");
  const [isValidPassword, setIsValidPassword] = useState("initial");
  const [isValidPicture, setIsValidPicture] = useState("initial");
  const [isValidVerificationCode, setIsValidVerificationCode] = useState("initial");

  function handleNextPage()
  {
    switch (page)
    {
      case 0:
        if (isValidEmail === "initial")
        {
          setIsValidEmail("invalid");
        }
        else
        {
          if (isValidEmail === "valid") swiper.slideNext();
        }
        break;
      case 1:
        if (isValidName === "initial") setIsValidName("invalid");
        if (isValidUsername === "initial") setIsValidUsername("invalid");
        if (isValidEmail === "initial") setIsValidEmail("invalid");
        if (isValidPassword === "initial") setIsValidPassword("invalid");

        if (isValidName ===
            "valid" &&
            isValidUsername ===
            "valid" &&
            isValidEmail ===
            "valid" &&
            isValidPassword ===
            "valid")
        {
          swiper.slideNext();
        }
        break;
      case 2:
        if (isValidPicture === "initial")
        {
          setIsValidPicture("invalid");
        }
        else
        {
          if (isValidPicture === "valid") swiper.slideNext();
        }
        break;
      case 3:
        if (isValidVerificationCode === "initial")
        {
          setIsValidVerificationCode("invalid");
        }
        else
        {
          if (isValidVerificationCode === "valid") swiper.slideNext();
        }
        break;
      case 4:

        break;
      default:
        break;
    }
  }

  function handleOnChangeEmail(value)
  {
    setEmail(value);
    if (validateEmail(value))
    {
      setIsValidEmail("valid");
    }
    else
    {
      setIsValidEmail("invalid");
    }
  }

  function handleOnChangeName(value)
  {
    setName(value);
    if (value.length > 0)
    {
      setIsValidName("valid");
      setInitials(getInitials(value));
    }
    else
    {
      setIsValidName("invalid");
      setInitials("");
    }
  }

  function handleOnChangeUsername(value)
  {
    setUsername(value);
    if (value.length > 0)
    {
      setIsValidUsername("valid");
    }
    else
    {
      setIsValidUsername("invalid");
    }
  }

  function handleOnChangePassword(value)
  {
    setPassword(value);
    if (value.length > 0)
    {
      setIsValidPassword("valid");
    }
    else
    {
      setIsValidPassword("invalid");
    }
  }

  const handleOnChangeColor = (color) =>
  {
    setPictureColor(color.value);
    setPictureSource("");
    setPicture(null);
    setIsValidPicture("valid");
  };

  const handleOnChangePicture = (event) =>
  {
    const file = event.target.files[0];
    setPicture(file);

    const reader = new FileReader();
    reader.onloadend = () =>
    {
      setPictureSource(reader.result.toString());
    };
    reader.readAsDataURL(file);
    setIsValidPicture("valid");
  };

  const handleOnChangeVerificationCode = (value) =>
  {
    if (value.length > 0)
    {
      setIsValidVerificationCode("valid");
    }
    else
    {
      setIsValidVerificationCode("invalid");
    }
  };

  const addProfilePicture = () =>
  {
    document.getElementById("image-input").click();
  };

  const deleteProfilePicture = () =>
  {
    setPictureSource("");
    if (!pictureColor) setIsValidPicture("invalid");
  };

  // noinspection JSValidateTypes
  return (
    <Card id={"registerCard"}>
      <Card.Header className={"d-flex justify-content-between align-items-center h3"}>
        {page > 0 ? <i
          className={"bi bi-arrow-left"}
          style={{ width: "32px" }}
          onClick={() => swiper.slidePrev()}
        ></i> : <i style={{ width: "32px" }}></i>}
        Registrarse
        <i style={{ width: "32px" }}></i>
      </Card.Header>
      <Card.Body id={"loginBodyCard"}>
        <Swiper
          id={"swiper"}
          modules={[Pagination]}
          allowTouchMove={false}
          onSlideChange={(swiper) => setPage(swiper.activeIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {/* Slider de Correo Electrónico */}
          <SwiperSlide>
            <div
              id={"emailSlider"}
              className={"swiperSlide"}
            >
              <FormLabel className={"mb-2"}>Ingrese su correo electrónico</FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-envelope-at"}></i>
                </InputGroup.Text>
                <Form.Control
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={"text"}
                  placeholder={"Correo electrónico"}
                  value={email}
                  isInvalid={isValidEmail === "invalid"}
                  isValid={isValidEmail === "valid"}
                  onChange={(changeEvent) => handleOnChangeEmail(changeEvent.target.value)}
                />
                <Feedback type={"invalid"}>Ingrese un correo electrónico válido</Feedback>
                <Feedback type={"valid"}>Correo electrónico válido</Feedback>
              </InputGroup>
              <Button
                className={"mb-4 w-100"}
                onClick={handleNextPage}
                size={"lg"}
                type={"submit"}
              >
                Registrarse
              </Button>
              <Link
                to={"/login"}
                className={"btn btn-link"}
              >
                ¿Ya tiene cuenta? Inicie sesión
              </Link>
            </div>
          </SwiperSlide>

          {/* Slider de Datos Personales */}
          <SwiperSlide>
            <div
              id={"dataSlider"}
              className={"swiperSlide"}
            >
              <FormLabel className={"mb-2"}>Ingrese su nombre</FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-person"}></i>
                </InputGroup.Text>
                <Form.Control
                  tabIndex={-1}
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={"text"}
                  placeholder={"Nombre"}
                  value={name}
                  isInvalid={isValidName === "invalid"}
                  isValid={isValidName === "valid"}
                  onChange={(changeEvent) => handleOnChangeName(changeEvent.target.value)}
                />
                <Feedback type={"invalid"}>Ingrese un nombre válido</Feedback>
                <Feedback type={"valid"}>Nombre válido</Feedback>
              </InputGroup>
              <FormLabel className={"mb-2"}>Iniciales</FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-alphabet-uppercase"}></i>
                </InputGroup.Text>
                <Form.Control
                  disabled={true}
                  tabIndex={-1}
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={"text"}
                  placeholder={"Iniciales"}
                  value={initials}
                  onChange={(changeEvent) => handleOnChangeName(changeEvent.target.value)}
                />
              </InputGroup>
              <FormLabel className={"mb-2"}>Ingrese su nombre de usuario</FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-person"}></i>
                </InputGroup.Text>
                <Form.Control
                  tabIndex={-1}
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={"text"}
                  placeholder={"Nombre de usuario"}
                  value={username}
                  isInvalid={isValidUsername === "invalid"}
                  isValid={isValidUsername === "valid"}
                  onChange={(changeEvent) => handleOnChangeUsername(changeEvent.target.value)}
                />
                <Feedback type={"invalid"}>Ingrese un nombre de usuario válido</Feedback>
                <Feedback type={"valid"}>Nombre de usuario válido</Feedback>
              </InputGroup>
              <FormLabel className={"mb-2"}>Ingrese su correo electrónico</FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-envelope-at"}></i>
                </InputGroup.Text>
                <Form.Control
                  tabIndex={-1}
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={"text"}
                  placeholder={"Correo electrónico"}
                  value={email}
                  isInvalid={isValidEmail === "invalid"}
                  isValid={isValidEmail === "valid"}
                  onChange={(changeEvent) => handleOnChangeEmail(changeEvent.target.value)}
                />
                <Feedback type={"invalid"}>Ingrese un correo electrónico válido</Feedback>
                <Feedback type={"valid"}>Correo electrónico válido</Feedback>
              </InputGroup>
              <FormLabel className={"mb-2"}>Ingrese su contraseña</FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-key"}></i>
                </InputGroup.Text>
                <Form.Control
                  tabIndex={-1}
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Contraseña"}
                  value={password}
                  isInvalid={isValidPassword === "invalid"}
                  isValid={isValidPassword === "valid"}
                  onChange={(changeEvent) => handleOnChangePassword(changeEvent.target.value)}

                />
                <InputGroup.Text
                  className={"cursor-pointer"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                </InputGroup.Text>
                <Feedback type={"invalid"}>Ingrese una contraseña válida</Feedback>
                <Feedback type={"valid"}>Contraseña válida</Feedback>
              </InputGroup>
              <div className={"d-flex justify-content-center"}>
                <Button
                  className={"mb-4"}
                  onClick={handleNextPage}
                  size={"lg"}
                  type={"submit"}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slider de foto de perfil */}
          <SwiperSlide>
            <div
              id={"pictureSlide"}
              className={"swiperSlide"}
            >
              <div
                id={"picture"}
                className={"d-flex justify-content-center position-relative mb-3"}
              >
                {pictureSource ? <div id={"image-avatar"}>
                  <Avatar
                    size={175}
                    src={pictureSource}
                    round={true}
                  />
                  <Badge
                    id={"delete-profile-picture"}
                    className={"position-absolute translate-middle rounded-circle p-2 border border-light border-3"}
                    bg={"danger"}
                    onClick={deleteProfilePicture}
                  >
                    <i className={"bi bi-x-lg"}></i>
                  </Badge>
                </div> : <div>
                   <Avatar
                     name={name}
                     color={pictureColor ?? "#000000"}
                     size={175}
                     textSizeRatio={2}
                     round={true}
                     initials={(value) => getInitials(value)}
                   />

                   <input
                     id={"image-input"}
                     type={"file"}
                     onChange={handleOnChangePicture}
                     className={"d-none"}
                   />
                   <Badge
                     id={"add-profile-picture"}
                     className={"position-absolute translate-middle rounded-circle p-2 border border-light border-3"}
                     onClick={addProfilePicture}
                   >
                     <i className={"bi bi-plus-lg"}></i>
                   </Badge>
                 </div>}
              </div>
              <div className={"d-flex flex-wrap justify-content-center w-75 mb-3"}>
                {COLORS.map((color) => (
                  <ButtonReactBootstrap
                    key={color.name}
                    variant={"light"}
                    onClick={() => handleOnChangeColor(color)}
                  >
                    <i
                      className={"bi bi-circle-fill"}
                      style={{ color: color.value }}
                    ></i>
                  </ButtonReactBootstrap>
                ))}
              </div>
              <Form.Control
                hidden={true}
                required={true}
                type={"text"}
                placeholder={"Foto de perfil"}
                value={picture}
                isInvalid={isValidPicture === "invalid"}
                isValid={isValidPicture === "valid"}
              />
              <Feedback
                className={"text-center"}
                type={"invalid"}
              >
                Ingrese una foto de perfil o elija un color válido
              </Feedback>
              <Feedback
                className={"text-center"}
                type={"valid"}
              >
                Foto de perfil o color válida
              </Feedback>

              <Button
                className={"w-100"}
                onClick={handleNextPage}
                size={"lg"}
              >
                Continuar
              </Button>
            </div>
          </SwiperSlide>

          {/* Slide de código de verificación por email */}
          <SwiperSlide>
            <div
              id={"verificationCodeSlide"}
              className={"swiperSlide"}
            >
              <FormLabel className={"mb-2"}>
                Ingrese el código de verificación enviado a su correo electrónico
              </FormLabel>
              <InputGroup className={"mb-4"}>
                <InputGroup.Text>
                  <i className={"bi bi-key"}></i>
                </InputGroup.Text>
                <Form.Control
                  required={true}
                  className={"formControlText"}
                  size={"lg"}
                  type={"text"}
                  placeholder={"Código de verificación"}
                  isInvalid={isValidVerificationCode === "invalid"}
                  isValid={isValidVerificationCode === "valid"}
                  onChange={(changeEvent) => handleOnChangeVerificationCode(changeEvent.target.value)}
                />
                <Feedback type={"invalid"}>Ingrese un código de verificación válido</Feedback>
                <Feedback type={"valid"}>Código de verificación válido</Feedback>
              </InputGroup>
              <Button
                className={"w-100"}
                onClick={handleNextPage}
                size={"lg"}
              >
                Continuar
              </Button>
            </div>
          </SwiperSlide>

          {/* Slide de confirmación de registro */}
          <SwiperSlide>
            <div
              id={"confirmationSlide"}
              className={"swiperSlide"}
            >
              <div className={"d-flex justify-content-center"}>
                <i
                  className={"bi bi-check-circle-fill"}
                  style={{ color: "#28A745", fontSize: "100px" }}
                ></i>
              </div>
              <p className={"text-center mb-4"}>¡Registro exitoso!</p>
              <Link to={"/login"}>
                <Button
                  className={"w-100"}
                  onClick={handleNextPage}
                  size={"lg"}
                >
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </Card.Body>
    </Card>
  );
};

export default Register;
