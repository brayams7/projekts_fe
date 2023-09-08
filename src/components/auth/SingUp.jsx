import { useForm } from "react-hook-form";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// eslint-disable-next-line react/prop-types
const SingUp = ({isSingUp,setIsSingUp}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const listData = [
      {
        name: "email",
        value: "",
      }
    ];

    console.log({ data });

    // handleDataForm(data, TYPES.login);
    resetValues(listData, setValue);
  };


  const resetValues = (list = [{ name: "", value: "" }], setValue) => {
    for (const { name, value } of list) {
      setValue(name, value);
    }
  }

  return (
    <div className="card card_custom card_singUp p-3">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="font_weith_600 font_title_card mb-4">
            Iniciar sessión en Projekts
          </p>

          <div className="mb-3">
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Ingrese el correo electrónico",
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Ingrese un correo válido",
                },
              })}
              name="email"
              type="text"
              className={
                errors?.email ? "form-control is-invalid" : "form-control"
              }
              // id="email"
              placeholder={
                errors?.email
                  ? errors?.email?.message
                  : "Ingrese el correo electrónico"
              }
            />
            {errors?.email && (
              <p
                className="invalid-feedback"
                style={{ fontSize: "var(--size-12)" }}
              >
                {errors?.email?.message}
              </p>
            )}
          </div>

          <button className="btn_login mb-3" type="submit">
            Iniciar sesión
          </button>
        </form>

        <hr />

        <div className="mb-2">
          <span
            className="lightBlue_color text-decoration-underline"
            style={{ fontSize: 12, cursor: "pointer" }}
            onClick={() => setIsSingUp(!isSingUp)}
          >
            ¿Ya tienes una CUENTA? Inicia sesión
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
