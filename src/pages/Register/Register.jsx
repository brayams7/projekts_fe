import RegisterComponent from "../../components/auth/Register.jsx";
import "./Register.css";

const Register = () => {
	return (
		<div
			id={"register"}
			className={"d-flex justify-content-center align-items-center vh-100 vw-100"}
		>
			<RegisterComponent />
		</div>
	);
};

export default Register;
