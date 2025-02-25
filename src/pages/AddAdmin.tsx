import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  email: string; 
  contrato_firmado: true;
  termsAccepted: true;
};

type LoginFormData = {
  username: string;
  password: string;
};

const AddAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  
  // Formulario de registro
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: formErrors },
  } = useForm<RegisterFormData>();

  // Formulario de login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.addAdmin, {
    onSuccess: async () => {
      showToast({ message: "Registro exitoso!", type: "SUCCESS" });
      await queryClient.invalidateQueries("addAdmin");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message || "Ocurrió un error inesperado",
        type: "ERROR",
      });
    },
  });

  const onSubmitForm = handleSubmitForm((data) => {
    return mutation.mutate(data);
  });

  const onSubmitLogin = handleSubmitLogin((data) => {
    // Verificar credenciales
    if (data.username === "equipoWorkio" && data.password === "workio2025*") {
      setIsAuthenticated(true);
      setLoginError("");
      showToast({ message: "Acceso concedido", type: "SUCCESS" });
    } else {
      setLoginError("Usuario o contraseña incorrectos");
    }
  });

  // Si no está autenticado, mostrar formulario de login
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
        <form 
          className="flex flex-col gap-5 bg-white p-6 shadow-lg rounded-lg w-full max-w-md" 
          onSubmit={onSubmitLogin}
        >
          <h2 className="text-3xl font-bold text-center">Acceso Administrativo</h2>
          <p className="text-center text-gray-600 mb-4">Ingrese sus credenciales para continuar</p>
          
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          <label className="text-gray-700 text-sm font-bold">
            Usuario
            <input
              className="border rounded w-full py-2 px-3 font-normal mt-1"
              type="text"
              {...registerLogin("username", { required: "Usuario es obligatorio" })}
            />
            {loginErrors.username && <span className="text-red-500">{loginErrors.username.message}</span>}
          </label>

          <label className="text-gray-700 text-sm font-bold">
            Contraseña
            <input
              className="border rounded w-full py-2 px-3 font-normal mt-1"
              type="password"
              {...registerLogin("password", { required: "Contraseña es obligatoria" })}
            />
            {loginErrors.password && <span className="text-red-500">{loginErrors.password.message}</span>}
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 font-bold rounded-lg hover:bg-blue-500 text-lg mt-2"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  // Si está autenticado, mostrar el formulario de registro
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
      <form className="flex flex-col gap-5 bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl" onSubmit={onSubmitForm}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Registro de Empresa por Workio</h2>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
          >
            Cerrar Sesión
          </button>
        </div>

        <label className="text-gray-700 text-sm font-bold">
          Nombre de la Empresa
          <input
            className="border rounded w-full py-2 px-3 font-normal mt-1"
            {...registerForm("nombre", { required: "Este campo es obligatorio" })}
          />
          {formErrors.nombre && <span className="text-red-500">{formErrors.nombre.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          NIT
          <input
            className="border rounded w-full py-2 px-3 font-normal mt-1"
            {...registerForm("nit", { required: "Este campo es obligatorio" })}
          />
          {formErrors.nit && <span className="text-red-500">{formErrors.nit.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Correo Electrónico
          <input
            type="email"
            className="border rounded w-full py-2 px-3 font-normal mt-1"
            {...registerForm("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Ingresa un email válido",
              },
            })}
          />
          {formErrors.email && <span className="text-red-500">{formErrors.email.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Teléfono
          <input
            className="border rounded w-full py-2 px-3 font-normal mt-1"
            {...registerForm("telefono", { required: "Este campo es obligatorio" })}
          />
          {formErrors.telefono && <span className="text-red-500">{formErrors.telefono.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Dirección
          <input
            className="border rounded w-full py-2 px-3 font-normal mt-1"
            placeholder="Ej: Calle 50 # 15-20"
            {...registerForm("direccion", { required: "Este campo es obligatorio" })}
          />
          {formErrors.direccion && <span className="text-red-500">{formErrors.direccion.message}</span>}
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 font-bold rounded-lg hover:bg-blue-500 text-lg mt-2"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Registrando..." : "Registrar Empresa"}
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;