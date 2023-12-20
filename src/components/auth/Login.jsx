import { useForm } from "react-hook-form";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/thunks/authThunk";
import { useEffect } from "react";
import { setError, setIsError } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// eslint-disable-next-line react/prop-types
const Login = ({ setIsSingUp, isSingUp }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid }
	} = useForm();
	const { loading, isError, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		const listData = [
			{
				name: "email",
				value: ""
			},
			{
				name: "password",
				value: ""
			}
		];

		// handleDataForm(data, TYPES.login);

		dispatch(login(data, navigate));
		resetValues(listData, setValue);
	};

	const resetValues = (list = [{ name: "", value: "" }], setValue) => {
		for (const { name, value } of list) {
			setValue(name, value);
		}
	};

	useEffect(() => {
		if (isValid) {
			dispatch(setError(""));
			dispatch(setIsError(false));
		}
	}, [isValid, dispatch]);

	return (
		<div className="card card_custom card_login p-3">
			<div className="card-body">
				<form onSubmit={handleSubmit(onSubmit)}>
					<p className="font_weith_600 font_title_card mb-4">Iniciar sesión en Projekts</p>
					{isError && <p className="text-start text-danger font_size_10_12">{error}</p>}
					<div className="mb-3">
						<input
							{...register("email", {
								required: {
									value: true,
									message: "Ingrese el correo electrónico"
								},
								pattern: {
									value: EMAIL_REGEX,
									message: "Ingrese un correo válido"
								}
							})}
							name="email"
							type="text"
							className={errors?.email ? "form-control is-invalid" : "form-control"}
							// id="email"
							placeholder={errors?.email ? errors?.email?.message : "Ingrese el correo electrónico"}
						/>
						{errors?.email && (
							<p
								className="invalid-feedback"
								style={{ fontSize: "var(--size-12)" }}>
								{errors?.email?.message}
							</p>
						)}
					</div>

					<div className="mb-3">
						<input
							{...register("password", {
								required: {
									value: true,
									message: "Ingrese la contraseña"
								},
								minLength: {
									value: 6,
									message: "La contraseña debe contener al menos 6 caractéres"
								}
							})}
							name="password"
							type="password"
							className={errors?.password ? "form-control is-invalid" : "form-control"}
							// id="password"
							placeholder={errors?.password ? errors?.password?.message : "Ingrese la contraseña"}
						/>
						{errors?.password && (
							<p
								className="invalid-feedback"
								style={{ fontSize: "var(--size-12)" }}>
								{errors?.password?.message}
							</p>
						)}
					</div>

					<button
						className="btn_login mb-3"
						type="submit"
						disabled={loading}>
						{!loading ? "Iniciar sesión" : "Loading..."}
					</button>
				</form>

				<hr />
				<Link
					to={"/register"}
					className="btn btn-link">
					¿No tiene cuenta? Regístrese
				</Link>
			</div>
		</div>
	);
};

export default Login;
