import TermsOfService from "../components/TermsOfService";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

export type RegisterFormDataAdmin = {
  name: string;
  NIT: string;
  direccion: string;
  telefono: string;
  email: string;
  sitio_web: string;
  direccion_facturacion: string;
  responsable_facturacion: string;
  email_facturacion: string;
  identificacion_empresa: string;
  comprobante_domicilio: string;
  password: string;
  confirmPassword: string;
  contrato_firmado: boolean;
  termsAccepted: boolean;
};

const RegisterAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormDataAdmin>();

  const mutation = useMutation(apiClient.registerAdmin, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(undefined);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Registro de Empresa</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="text-gray-700 text-sm font-bold">
          Nombre de la Empresa
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("name", { required: "Este campo es requerido" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          NIT
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("NIT", { 
              required: "Este campo es requerido",
              pattern: {
                value: /^\d{9}-\d{1}$/,
                message: "Formato de NIT inválido (ej. 123456789-0)"
              }
            })}
          />
          {errors.NIT && (
            <span className="text-red-500">{errors.NIT.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold">
        Dirección
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("direccion", { required: "Este campo es requerido" })}
        />
        {errors.direccion && (
          <span className="text-red-500">{errors.direccion.message}</span>
        )}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="text-gray-700 text-sm font-bold">
          Teléfono
          <input
            type="tel"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("telefono", { 
              required: "Este campo es requerido",
              pattern: {
                value: /^\+?[\d\s-]{10,15}$/,
                message: "Número de teléfono inválido"
              }
            })}
          />
          {errors.telefono && (
            <span className="text-red-500">{errors.telefono.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { 
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Dirección de email inválida"
              }
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="text-gray-700 text-sm font-bold">
          Contraseña
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "Este campo es requerido",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Confirmar Contraseña
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "Este campo es requerido";
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
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4"
          {...register("termsAccepted", { required: "Debes aceptar los términos" })}
        />
        <span className="text-sm font-bold underline">
          <button onClick={(e) => {
            e.preventDefault();
            openModal(<TermsOfService />);
          }}>
            Acepto los términos de tratamiento de datos personales
          </button>
        </span>
      </label>
      {errors.termsAccepted && (
        <span className="text-red-500 text-sm font-bold">{errors.termsAccepted.message}</span>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl w-full"
      >
        Registrar Empresa
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Términos de Servicio"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {modalContent && modalContent}
      </Modal>
    </form>
  );
};

export default RegisterAdmin;