import { Button as ButtonReactBootstrap } from "react-bootstrap";
import "./Button.css";

/**
 * Botón de multiple propósito para el proyecto
 * @param properties Propiedades del botón
 */
function Button(properties) {
	return (
		<ButtonReactBootstrap
			id="button"
			{...properties}
		>
			{properties.children}
		</ButtonReactBootstrap>
	);
}

export default Button;
