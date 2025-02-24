import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import zxcvbn from "zxcvbn"; // Importamos zxcvbn para evaluar la contraseña
import { useTranslation } from "react-i18next";

export type ResetPasswordFormData = {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string; // Nuevo campo para confirmar la contraseña
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();
  const { t } = useTranslation();
  const [passwordStrength, setPasswordStrength] = useState(0); // Estado para la fortaleza de la contraseña

  const mutation = useMutation(apiClient.resetPassword, {
    onSuccess: () => {
      showToast({ message: "Contraseña restablecida con éxito!", type: "SUCCESS" });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      console.log(error);
      const translatedMessage = t(`errors.${error.message}`, {
        defaultValue: "Ocurrió un error inesperado",
      });
      showToast({ message: translatedMessage, type: "ERROR" });
    },
  });

  // Función para evaluar la fortaleza de la contraseña
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const result = zxcvbn(value);
    setPasswordStrength(result.score); // Actualizamos el estado de la fortaleza
  };

  const onSubmit = handleSubmit((data: ResetPasswordFormData) => {
    if (passwordStrength < 2) {
      showToast({
        message: "La contraseña es demasiado débil. Intenta con una más segura.",
        type: "ERROR",
      });
      return;
    }
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Restablecer Contraseña</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Este campo es obligatorio" })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Código de Verificación
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("code", { required: "Este campo es obligatorio" })}
        />
        {errors.code && <span className="text-red-500">{errors.code.message}</span>}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Nueva Contraseña
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("newPassword", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          onChange={handlePasswordChange} // Evaluamos la contraseña en cada cambio
        />
        {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
        {/* Barra de fortaleza de la contraseña */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className={`h-2 rounded ${
                passwordStrength === 0
                  ? "bg-red-500 w-1/5"
                  : passwordStrength === 1
                  ? "bg-orange-500 w-2/5"
                  : passwordStrength === 2
                  ? "bg-yellow-500 w-3/5"
                  : passwordStrength === 3
                  ? "bg-blue-500 w-4/5"
                  : "bg-green-500 w-full"
              }`}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Fortaleza:{" "}
            {["Muy Débil", "Débil", "Moderada", "Fuerte", "Muy Fuerte"][passwordStrength]}
          </p>
        </div>
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirmar Contraseña
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "Este campo es obligatorio",
            validate: (val) =>
              val === watch("newPassword") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <button
        type="submit"
        className={`bg-rose-400 text-white p-2 font-bold hover:bg-rose-500 text-xl ${
          passwordStrength < 2 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={passwordStrength < 2} // Deshabilitar el botón si la contraseña es débil
      >
        Restablecer Contraseña
      </button>
    </form>
  );
};

export default ResetPassword;