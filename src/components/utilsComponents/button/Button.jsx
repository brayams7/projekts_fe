import { Button as ButtonReactBootstrap } from "react-bootstrap";
import "./Button.css";

/**
 * Botón de multiple propósito para el proyecto
 * @param {*} Propiedades
 */
const Button = (properties) => {
  return (
    <ButtonReactBootstrap id="button" {...properties}>
      {properties.children}
    </ButtonReactBootstrap>
  )
}

export default Button;
