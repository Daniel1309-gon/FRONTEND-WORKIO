import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type ResetPasswordFormData = {
  email: string;
  code: string;
  newPassword: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const mutation = useMutation(apiClient.resetPassword, {
    onSuccess: () => {
      showToast({ message: "Password reset successfully!", type: "SUCCESS" });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: ResetPasswordFormData) => {
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
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Código de Verificación
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("code", { required: "This field is required" })}
        />
        {errors.code && (
          <span className="text-red-500">{errors.code.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Nueva Contraseña
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("newPassword", {
            required: "This field is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
        {errors.newPassword && (
          <span className="text-red-500">{errors.newPassword.message}</span>
        )}
      </label>
      <button
        type="submit"
        className="bg-rose-400 text-white p-2 font-bold hover:bg-rose-500 text-xl"
      >
        Restablecer Contraseña
      </button>
    </form>
  );
};

export default ResetPassword;
