import { useState } from "react";
import SingUp from "../../components/auth/SingUp";
import Login from "../../components/auth/Login";
import "./Auth.css";

const Auth = () => {
	const [isSingUp, setIsSingUp] = useState(false);

	return (
		<div
			id={"auth"}
			className="d-flex align-items-center justify-content-center text-center"
			style={{ height: "100vh" }}
		>
			{isSingUp ?
				<SingUp
					isSingUp={isSingUp}
					setIsSingUp={setIsSingUp}
				/>
			:	<>
					<Login
						isSingUp={isSingUp}
						setIsSingUp={setIsSingUp}
					/>
				</>
			}
		</div>
	);
};

export default Auth;
