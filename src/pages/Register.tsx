import TermsOfService from "../components/TermsOfService";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";


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
      <h2 className="text-3xl font-bold">No tienes cuenta? Crea una</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nombre
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Apellido
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
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
          {...register("email", { required: "This field is required" })}
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
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirma Contraseña
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
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
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Información adicional"
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
      </label>
      {errors.termsAccepted && (
        <span className="text-red-500 text-sm font-bold">{errors.termsAccepted.message}</span>
      )}
      <span className="grid grid-cols-2 gap-20 text-center md:px-5">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Crear Cuenta
        </button>
        <Link
              to="/registeradmin"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl items-center"
            >
              Crear Cuenta Admin
        </Link>
      </span>
    </form>
  );
};

export default Register;