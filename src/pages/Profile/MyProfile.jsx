import personCircle from "../../assets/icons/person-circle.svg";
import "./MyProfile.css";

/**
 * Página de Mi Perfil
 * @returns Página JSX de Mi Perfil
 */
const MyProfile = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4 d-flex justify-content-center align-items-start mt-4 mb-5 m-md-0">
					<img
						id="profile-picture"
						src={personCircle}
						alt="Foto de perfil">
					</img>
				</div>
				<div className="col-md-8">
					<div className="mb-4">
						<label
							htmlFor="username-input"
							className="form-label">
							Nombre de Usuario
						</label>
						<div className="input-group">
							<span id="at-sign" className="input-group-text">@</span>
							<input
								id="username-input"
								type="text"
								className="form-control"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label
							htmlFor="name-input"
							className="form-label">
							Nombre(s)
						</label>
						<div className="input-group">
							<input
								id="name-input"
								type="text"
								className="form-control"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email-input"
							className="form-label">
							Correo electrónico
						</label>
						<div className="input-group">
							<input
								id="email-input"
								type="text"
								className="form-control"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col d-flex justify-content-end">
					<button
						id="save-button"
						className="btn">
						Guardar
					</button>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;

