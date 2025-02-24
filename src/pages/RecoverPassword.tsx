import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type RecoverPasswordFormData = {
  email: string;
};

const RecoverPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { register, handleSubmit, formState: { errors } } = useForm<RecoverPasswordFormData>();
  const { t } = useTranslation();
  const mutation = useMutation(apiClient.recoverPassword, {
    onSuccess: () => {
      showToast({ message: "Password recovery email sent!", type: "SUCCESS" });
      navigate("/reset-password")
    },
    onError: (error: Error) => {
      const translatedMessage = t(`errors.${error.message}`, {
        defaultValue: "Ocurrió un error inesperado",
      });
      showToast({ message: translatedMessage, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: RecoverPasswordFormData) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Recuperar Contraseña</h2>
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
      <button
        type="submit"
        className="bg-rose-400 text-white p-2 font-bold hover:bg-rose-400 text-xl"
      >
        Enviar
      </button>
    </form>
  );
};

export default RecoverPassword;
