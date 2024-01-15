import Avatar from "react-avatar";
import { Badge, Button, Card, Form, FormLabel } from "react-bootstrap";
import { COLORS } from "../../utils/contants/colorsHex.js";
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
  const [height, setHeight] = useState("300px");

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
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLowercase, setPasswordLowercase] = useState(false);
  const [passwordUppercase, setPasswordUppercase] = useState(false);
  const [passwordNumbers, setPasswordNumbers] = useState(false);
  const [passwordSpecialCharacters, setPasswordSpecialCharacters] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCode1, setVerificationCode1] = useState("");
  const [verificationCode2, setVerificationCode2] = useState("");
  const [verificationCode3, setVerificationCode3] = useState("");
  const [verificationCode4, setVerificationCode4] = useState("");
  const [verificationCode5, setVerificationCode5] = useState("");
  const [verificationCode6, setVerificationCode6] = useState("");

  // Validaciones
  const [isValidEmail, setIsValidEmail] = useState("initial");
  const [isValidName, setIsValidName] = useState("initial");
  const [isValidUsername, setIsValidUsername] = useState("initial");
  const [isValidPassword, setIsValidPassword] = useState("initial");
  const [isValidPicture, setIsValidPicture] = useState("initial");
  const [isValidVerificationCode1, setIsValidVerificationCode1] = useState("initial");
  const [isValidVerificationCode2, setIsValidVerificationCode2] = useState("initial");
  const [isValidVerificationCode3, setIsValidVerificationCode3] = useState("initial");
  const [isValidVerificationCode4, setIsValidVerificationCode4] = useState("initial");
  const [isValidVerificationCode5, setIsValidVerificationCode5] = useState("initial");
  const [isValidVerificationCode6, setIsValidVerificationCode6] = useState("initial");

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
          if (isValidEmail === "valid")
          {
            swiper.slideNext();
          }
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
        console.log(verificationCode);

        if (isValidVerificationCode1 === "initial")
        {

          setIsValidVerificationCode1("invalid");
        }

        if (isValidVerificationCode2 === "initial")
        {
          setIsValidVerificationCode2("invalid");
        }

        if (isValidVerificationCode3 === "initial")
        {
          setIsValidVerificationCode3("invalid");
        }

        if (isValidVerificationCode4 === "initial")
        {
          setIsValidVerificationCode4("invalid");
        }

        if (isValidVerificationCode5 === "initial")
        {
          setIsValidVerificationCode5("invalid");
        }

        if (isValidVerificationCode6 === "initial")
        {
          setIsValidVerificationCode6("invalid");
        }

        if (isValidVerificationCode1 ===
          "valid" &&
          isValidVerificationCode2 ===
          "valid" &&
          isValidVerificationCode3 ===
          "valid" &&
          isValidVerificationCode4 ===
          "valid" &&
          isValidVerificationCode5 ===
          "valid" &&
          isValidVerificationCode6 ===
          "valid")
        {
          if (verificationCode === "123456") swiper.slideNext();
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

    if (value.length > 8) setPasswordLength(true); else setPasswordLength(false);

    if (value.match(/[a-z]/)) setPasswordLowercase(true); else setPasswordLowercase(false);

    if (value.match(/[A-Z]/)) setPasswordUppercase(true); else setPasswordUppercase(false);

    if (value.match(/[0-9]/)) setPasswordNumbers(true); else setPasswordNumbers(false);

    if (value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/))
    {
      setPasswordSpecialCharacters(true);
    }
    else
    {
      setPasswordSpecialCharacters(false);
    }

    if (value.length >
      8 &&
      value.match(/[a-z]/) &&
      value.match(/[A-Z]/) &&
      value.match(/[0-9]/) &&
      value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/))
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
      <Card.Header className={"d-flex justify-content-between align-items-center h3 border-bottom-0 pt-4"}>
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
          onSlideChange={(swiper) =>
          {
            setPage(swiper.activeIndex);
            switch (swiper.activeIndex)
            {
              case 0:
                setHeight("300px");
                break;
              case 1:
                setHeight("600px");
                break;
              case 2:
                setHeight("400px");
                break;
              case 3:
                setHeight("300px");
                break;
              case 4:
                setHeight("300px");
                break;
              default:
                break;
            }
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {/* Slider de Correo Electrónico */}
          <SwiperSlide>
            <div
              id={"emailSlider"}
              style={{ height: height }}
              className={"swiperSlide"}
            >
              <Form
                className={"w-100"}
                onSubmit={(event) =>
                {
                  event.preventDefault();
                  handleNextPage();
                }}
                noValidate={true}
              >
                <Form.Group className={"mb-3"}>
                  <Form.Label className={"w-100 text-center"}>
                    Ingrese su correo electrónico
                  </Form.Label>
                  <div>
                    <i className={"bi bi-envelope inputIcon"}></i>
                    <Form.Control
                      id={"emailInput"}
                      className={"input"}
                      required={true}
                      size={"lg"}
                      type={"email"}
                      placeholder={"Correo electrónico"}
                      value={email}
                      isInvalid={isValidEmail === "invalid"}
                      isValid={isValidEmail === "valid"}
                      onChange={(changeEvent) => handleOnChangeEmail(changeEvent.target.value)}
                    />
                    <Feedback type={"invalid"}>Ingrese un correo electrónico válido</Feedback>
                    <Feedback type={"valid"}>Correo electrónico válido</Feedback>
                  </div>
                </Form.Group>
                <Button
                  className={"mb-4 w-100 button"}
                  size={"lg"}
                  type={"submit"}
                >
                  Registrarse
                </Button>
              </Form>

              <hr className={"w-75"} />

              <Link
                to={"/login"}
                className={"btn btn-link"}
                onKeyDown={(event) =>
                {
                  if (event.key === "Tab")
                  {
                    event.preventDefault();
                    document.getElementById("emailInput").focus();
                  }
                }}
              >
                ¿Ya tiene cuenta? Inicie sesión
              </Link>
            </div>
          </SwiperSlide>

          {/* Slider de Datos Personales */}
          <SwiperSlide>
            <div
              id={"dataSlider"}
              style={{ height: height }}
              className={"swiperSlide"}
            >
              <Form
                onSubmit={(event) =>
                {
                  event.preventDefault();
                  handleNextPage();
                }}
                noValidate={true}
              >
                <Form.Group className={"mb-3"}>
                  <Form.Label>Ingrese su nombre</Form.Label>
                  <div>
                    <i className={"bi bi-person inputIcon"}></i>
                    <Form.Control
                      id={"nameInput"}
                      required={true}
                      className={"input"}
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
                  </div>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                  <FormLabel>Iniciales</FormLabel>
                  <div>
                    <i className={"bi bi-alphabet-uppercase inputIcon"}></i>
                    <Form.Control
                      className={"input"}
                      disabled={true}
                      required={true}
                      size={"lg"}
                      type={"text"}
                      placeholder={"Iniciales"}
                      value={initials}
                      onChange={(changeEvent) => handleOnChangeName(changeEvent.target.value)}
                    />
                  </div>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                  <FormLabel>Ingrese su nombre de usuario</FormLabel>
                  <div>
                    <i className={"bi bi-at inputIcon"}></i>
                    <Form.Control
                      className={"input"}
                      required={true}
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
                  </div>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                  <FormLabel>Ingrese su correo electrónico</FormLabel>
                  <div>
                    <i className={"bi bi-envelope inputIcon"}></i>
                    <Form.Control
                      className={"input"}
                      required={true}
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
                  </div>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                  <FormLabel className={"mb-2"}>Ingrese su contraseña</FormLabel>
                  <div>
                    <i className={"bi bi-key inputIcon"}></i>
                    <i
                      id={"showPassword"}
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    <Form.Control
                      id={"passwordInput"}
                      className={"input"}
                      required={true}
                      size={"lg"}
                      type={showPassword ? "text" : "password"}
                      placeholder={"Contraseña"}
                      value={password}
                      isInvalid={isValidPassword === "invalid"}
                      isValid={isValidPassword === "valid"}
                      onChange={(changeEvent) => handleOnChangePassword(changeEvent.target.value)}
                    />
                    <Feedback type={"invalid"}>Ingrese una contraseña válida</Feedback>
                    <Feedback type={"valid"}>Contraseña válida</Feedback>
                  </div>
                  {passwordLength ? <Badge
                    className={"badge"}
                    bg={"success"}
                  >
                    <i className={"bi bi-check-circle-fill"}></i> 8 caractéres
                  </Badge> : <Badge
                    className={"badge"}
                    bg={"danger"}
                  >
                    <i className={"bi bi-x-circle-fill"}></i> 8 caractéres
                  </Badge>}{" "}
                  {passwordLowercase ? <Badge
                    className={"badge"}
                    bg={"success"}
                  >
                    <i className={"bi bi-check-circle-fill"}></i> Minúsculas
                  </Badge> : <Badge
                    className={"badge"}
                    bg={"danger"}
                  >
                    <i className={"bi bi-x-circle-fill"}></i> Minúsculas
                  </Badge>}{" "}
                  {passwordUppercase ? <Badge
                    className={"badge"}
                    bg={"success"}
                  >
                    <i className={"bi bi-check-circle-fill"}></i> Mayúsculas
                  </Badge> : <Badge
                    className={"badge"}
                    bg={"danger"}
                  >
                    <i className={"bi bi-x-circle-fill"}></i> Mayúsculas
                  </Badge>}{" "}
                  {passwordNumbers ? <Badge
                    className={"badge"}
                    bg={"success"}
                  >
                    <i className={"bi bi-check-circle-fill"}></i> Números
                  </Badge> : <Badge
                    className={"badge"}
                    bg={"danger"}
                  >
                    <i className={"bi bi-x-circle-fill"}></i> Números
                  </Badge>}{" "}
                  {passwordSpecialCharacters ? <Badge
                    className={"badge"}
                    bg={"success"}
                  >
                    <i className={"bi bi-check-circle-fill"}></i> Caractéres especiales
                  </Badge> : <Badge
                    className={"badge"}
                    bg={"danger"}
                  >
                    <i className={"bi bi-x-circle-fill"}></i> Caractéres especiales
                  </Badge>}
                </Form.Group>

                <div className={"d-flex justify-content-center"}>
                  <Button
                    className={"button"}
                    size={"lg"}
                    type={"submit"}
                    onKeyDown={(event) =>
                    {
                      if (event.key === "Tab")
                      {
                        event.preventDefault();
                        document.getElementById("nameInput").focus();
                      }
                    }}
                  >
                    Continuar
                  </Button>
                </div>
              </Form>
            </div>
          </SwiperSlide>

          {/* Slider de foto de perfil */}
          <SwiperSlide>
            <div
              id={"pictureSlide"}
              style={{ height: height }}
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
                  <Button
                    className={"imageColorButton"}
                    key={color.name}
                    variant={"light"}
                    onClick={() => handleOnChangeColor(color)}
                  >
                    <i
                      className={"bi bi-circle-fill"}
                      style={{ color: color.value }}
                    ></i>
                  </Button>
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
                className={"button w-100"}
                onClick={handleNextPage}
                size={"lg"}
                onKeyDown={(event) =>
                {
                  if (event.key === "Tab")
                  {
                    event.preventDefault();
                    document.getElementsByClassName("imageColorButton")[0].focus();
                  }
                }}
              >
                Continuar
              </Button>
            </div>
          </SwiperSlide>

          {/* Slide de código de verificación por email */}
          <SwiperSlide>
            <div
              id={"verificationCodeSlide"}
              style={{ height: height }}
              className={"swiperSlide"}
            >
              <Form
                className={"w-100"}
                onSubmit={(event) =>
                {
                  event.preventDefault();
                  handleNextPage();
                }}
                noValidate={true}
              >
                <Form.Group className={"mb-3"}>
                  <Form.Label className={"w-100 text-center"}>
                    Ingrese el código de verificación enviado a su correo electrónico
                  </Form.Label>
                  <div className={"d-flex justify-content-center"}>
                    <Form.Control
                      id={"firstCodeInput"}
                      className={"codeInput"}
                      maxLength={1}
                      onChange={(event) =>
                      {
                        if (!event.target.value.match(/[0-9]/))
                        {
                          event.target.value = "";
                        }

                        if (event.target.value.length === 1)
                        {
                          setIsValidVerificationCode1("valid");
                        }
                        else
                        {
                          setIsValidVerificationCode1("invalid");
                        }
                      }}
                      onKeyDown={(event) =>
                      {
                        if (!(
                          event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Tab"
                        ))
                        {
                          event.preventDefault();
                        }

                        if (event.key.match(/[0-9]/))
                        {
                          event.preventDefault();
                          document.getElementById("firstCodeInput").value = event.key;
                          setVerificationCode1(event.key);
                          setVerificationCode(event.key +
                            verificationCode2 +
                            verificationCode3 +
                            verificationCode4 +
                            verificationCode5 +
                            verificationCode6);
                          setIsValidVerificationCode1("valid");
                          document.getElementById("secondCodeInput").focus();
                        }
                      }}
                      isValid={isValidVerificationCode1 === "valid"}
                      isInvalid={isValidVerificationCode1 === "invalid"}
                    />
                    <Form.Control
                      id={"secondCodeInput"}
                      className={"codeInput"}
                      maxLength={1}
                      onChange={(event) =>
                      {
                        if (!event.target.value.match(/[0-9]/))
                        {
                          event.target.value = "";
                        }

                        if (event.target.value.length === 1)
                        {
                          setIsValidVerificationCode2("valid");
                        }
                        else
                        {
                          setIsValidVerificationCode2("invalid");
                        }
                      }}
                      onKeyDown={(event) =>
                      {
                        if (!(
                          event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Tab"
                        ))
                        {
                          event.preventDefault();
                        }

                        if (event.key.match(/[0-9]/))
                        {
                          document.getElementById("secondCodeInput").value = event.key;
                          setVerificationCode2(event.key);
                          setVerificationCode(verificationCode1 +
                            event.key +
                            verificationCode3 +
                            verificationCode4 +
                            verificationCode5 +
                            verificationCode6);
                          setIsValidVerificationCode2("valid");
                          document.getElementById("thirdCodeInput").focus();
                        }
                      }}
                      isValid={isValidVerificationCode2 === "valid"}
                      isInvalid={isValidVerificationCode2 === "invalid"}
                    />
                    <Form.Control
                      id={"thirdCodeInput"}
                      className={"codeInput"}
                      maxLength={1}
                      onChange={(event) =>
                      {
                        if (!event.target.value.match(/[0-9]/))
                        {
                          event.target.value = "";
                        }

                        if (event.target.value.length === 1)
                        {
                          setIsValidVerificationCode3("valid");
                        }
                        else
                        {
                          setIsValidVerificationCode3("invalid");
                        }
                      }}
                      onKeyDown={(event) =>
                      {
                        if (!(
                          event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Tab"
                        ))
                        {
                          event.preventDefault();
                        }

                        if (event.key.match(/[0-9]/))
                        {
                          document.getElementById("thirdCodeInput").value = event.key;
                          setVerificationCode3(event.key);
                          setVerificationCode(verificationCode1 +
                            verificationCode2 +
                            event.key +
                            verificationCode4 +
                            verificationCode5 +
                            verificationCode6);
                          setIsValidVerificationCode3("valid");
                          document.getElementById("fourthCodeInput").focus();
                        }
                      }}
                      isValid={isValidVerificationCode3 === "valid"}
                      isInvalid={isValidVerificationCode3 === "invalid"}
                    />
                    <Form.Control
                      id={"fourthCodeInput"}
                      className={"codeInput"}
                      maxLength={1}
                      onChange={(event) =>
                      {
                        if (!event.target.value.match(/[0-9]/))
                        {
                          event.target.value = "";
                        }

                        if (event.target.value.length === 1)
                        {
                          setIsValidVerificationCode4("valid");
                        }
                        else
                        {
                          setIsValidVerificationCode4("invalid");
                        }
                      }}
                      onKeyDown={(event) =>
                      {
                        if (!(
                          event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Tab"
                        ))
                        {
                          event.preventDefault();
                        }

                        if (event.key.match(/[0-9]/))
                        {
                          document.getElementById("fourthCodeInput").value = event.key;
                          setVerificationCode4(event.key);
                          setVerificationCode(verificationCode1 +
                            verificationCode2 +
                            verificationCode3 +
                            event.key +
                            verificationCode5 +
                            verificationCode6);
                          setIsValidVerificationCode4("valid");
                          document.getElementById("fifthCodeInput").focus();
                        }
                      }}
                      isValid={isValidVerificationCode4 === "valid"}
                      isInvalid={isValidVerificationCode4 === "invalid"}
                    />
                    <Form.Control
                      id={"fifthCodeInput"}
                      className={"codeInput"}
                      maxLength={1}
                      onChange={(event) =>
                      {
                        if (!event.target.value.match(/[0-9]/))
                        {
                          event.target.value = "";
                        }

                        if (event.target.value.length === 1)
                        {
                          setIsValidVerificationCode5("valid");
                        }
                        else
                        {
                          setIsValidVerificationCode5("invalid");
                        }
                      }}
                      onKeyDown={(event) =>
                      {
                        if (!(
                          event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Tab"
                        ))
                        {
                          event.preventDefault();
                        }

                        if (event.key.match(/[0-9]/))
                        {
                          document.getElementById("fifthCodeInput").value = event.key;
                          setVerificationCode5(event.key);
                          setVerificationCode(verificationCode1 +
                            verificationCode2 +
                            verificationCode3 +
                            verificationCode4 +
                            event.key +
                            verificationCode6);
                          setIsValidVerificationCode5("valid");
                          document.getElementById("sixthCodeInput").focus();
                        }
                      }}
                      isValid={isValidVerificationCode5 === "valid"}
                      isInvalid={isValidVerificationCode5 === "invalid"}
                    />
                    <Form.Control
                      id={"sixthCodeInput"}
                      className={"codeInput"}
                      maxLength={1}
                      onChange={(event) =>
                      {
                        if (!event.target.value.match(/[0-9]/))
                        {
                          event.target.value = "";
                        }

                        if (event.target.value.length === 1)
                        {
                          setIsValidVerificationCode6("valid");
                        }
                        else
                        {
                          setIsValidVerificationCode6("invalid");
                        }
                      }}
                      onKeyDown={(event) =>
                      {
                        if (!(
                          event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Tab"
                        ))
                        {
                          event.preventDefault();
                        }

                        if (event.key.match(/[0-9]/))
                        {
                          document.getElementById("sixthCodeInput").value = event.key;
                          setVerificationCode6(event.key);
                          setVerificationCode(verificationCode1 +
                            verificationCode2 +
                            verificationCode3 +
                            verificationCode4 +
                            verificationCode5 +
                            event.key);
                          setIsValidVerificationCode6("valid");
                          document.getElementById("verificationCodeButton").focus();
                        }
                      }}
                      isValid={isValidVerificationCode6 === "valid"}
                      isInvalid={isValidVerificationCode6 === "invalid"}
                    />
                  </div>
                </Form.Group>
                <Button
                  id={"verificationCodeButton"}
                  className={"mb-4 w-100 button"}
                  size={"lg"}
                  onClick={handleNextPage}
                  onKeyDown={(event) =>
                  {
                    if (event.key === "Tab")
                    {
                      event.preventDefault();
                      document.getElementById("firstCodeInput").focus();
                    }
                  }}
                >
                  Registrarse
                </Button>
              </Form>
            </div>
          </SwiperSlide>

          {/* Slide de confirmación de registro */}
          <SwiperSlide>
            <div
              id={"confirmationSlide"}
              style={{ height: height }}
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
