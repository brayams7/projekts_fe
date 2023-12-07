import { Button as ButtonReactBootstrap } from "react-bootstrap";
import "./colorButton.css";

/**
 * Botón de multiple propósito para el proyecto
 * @param {*} Propiedades
 */
const ColorButton = (properties) => {
	return (
		<ButtonReactBootstrap
			id="colorButton"
			{...properties}>
			<i
				className="bi bi-circle-fill"
				style={{ color: properties.color }}></i>
		</ButtonReactBootstrap>
	);
};

export default ColorButton;

