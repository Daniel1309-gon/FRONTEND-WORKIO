import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"; // Importamos el nuevo componente
import TermsOfService from "../components/TermsOfService";
import zxcvbn from "zxcvbn";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registro exitoso!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(undefined);
  const [password, setPassword] = useState(""); // Estado para la contraseña

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = handleSubmit((data) => {
    const result = zxcvbn(data.password);
    if (result.score < 2) {
      showToast({ message: "Tu contraseña es muy débil", type: "ERROR" });
      return;
    }
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">No tienes cuenta? Crea una</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nombre
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Apellido
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "Este campo es obligatorio" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Ingresa un email válido",
            },
          })}
        />
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
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de la contraseña
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        {/* Componente de fortaleza de contraseña */}
        <PasswordStrengthMeter password={password} />
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirma Contraseña
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Este campo es obligatorio";
              } else if (watch("password") !== val) {
                return "Las contraseñas no coinciden";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4"
          {...register("termsAccepted", {
            required: "Debes aceptar los términos",
          })}
        />
        <span className="text-sm font-bold underline">
          <button
            onClick={(e) => {
              e.preventDefault();
              openModal(<TermsOfService />);
            }}
          >
            Acepto los términos de tratamiento de datos personales
          </button>
        </span>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Información adicional"
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            content: {
              width: "50%",
              height: "80%",
              margin: "auto",
              borderRadius: "8px",
              padding: "20px",
            },
          }}
          closeTimeoutMS={0}
        >
          <div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              ❌
            </button>
          </div>
          {modalContent}
        </Modal>
      </label>

      {errors.termsAccepted && (
        <span className="text-red-500 text-sm font-bold">
          {errors.termsAccepted.message}
        </span>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
      >
        Crear Cuenta
      </button>

      <Link
        to="/registeradmin"
        className="underline text-black p-2 items-center"
      >
        Quieres Registrar tu Coworking? Click Aquí
      </Link>
    </form>
  );
};

export default Register;
