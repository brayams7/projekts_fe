import { useState } from "react";
import SingUp from "../../components/auth/SingUp";
import Login from "../../components/auth/Login";

const Auth = () => {
	const [isSingUp, setIsSingUp] = useState(false)

  return (
		<div className="container d-flex align-items-center justify-content-center text-center" style={{minHeight:"100vh"}}>
			{
				isSingUp ? 
					<SingUp
						isSingUp={isSingUp}
						setIsSingUp={setIsSingUp}
					/>
				: (
					<Login
						isSingUp={isSingUp}
						setIsSingUp={setIsSingUp}
					/>
				)
			}
		</div>
	)
};

export default Auth;
