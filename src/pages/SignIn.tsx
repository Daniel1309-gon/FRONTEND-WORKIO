import { useState } from "react"; // Importar useState
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  // Estado para rastrear si el campo de contraseña tiene contenido
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch, // Usar watch para observar cambios en el campo de contraseña
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Bienvenido!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      await queryClient.refetchQueries("fetchCurrentUser");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // Observar cambios en el campo de contraseña
  const password = watch("password");
  if (password && !isPasswordTyped) {
    setIsPasswordTyped(true);
  } else if (!password && isPasswordTyped) {
    setIsPasswordTyped(false);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Iniciar Sesion</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Este campo es obligatorio" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Contraseña
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 6,
              message: "La contraseña es de al menos 6 caracteres.",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Eres nuevo en Workio?{" "}
          <Link className="underline" to="/register">
            Crea tu cuenta
          </Link>
        </span>
        <Link to="/recover-password" className="text-sm underline">
          Recuperar Contraseña
        </Link>
        <button
          type="submit"
          className={`${
            isPasswordTyped ? "bg-rose-600" : "bg-rose-400" // Cambiar el color basado en el estado
          } text-white p-2 font-bold hover:bg-rose-600 text-xl`}
        >
          Iniciar Sesión
        </button>
      </span>
    </form>
  );
};

export default SignIn;