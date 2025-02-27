import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useState, useEffect } from "react"; // Importamos useEffect
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"; // Importamos el nuevo componente
import Modal from '../components/DeleteUserModal'

export type UserFormData = {
  idusuario: number;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const EditUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast, user } = useAppContext();
  const { email, nombre: userFirstName, apellido: userLastName } = user || {}; // Extraemos los datos del usuario

  const {
    register,
    handleSubmit,
    watch,
    setValue, // Usamos setValue para prellenar los campos
    formState: { errors },
    setError,
  } = useForm<UserFormData>();

  const [passwordStrength] = useState(0); // Estado para la fortaleza de la contraseña
  const [isPasswordModified] = useState(false); // Estado para saber si la contraseña fue modificada
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  // Prellenamos los campos con los datos del usuario
  useEffect(() => {
    if (userFirstName) setValue("firstName", userFirstName);
    if (userLastName) setValue("lastName", userLastName);
  }, [userFirstName, userLastName, setValue]);

  const mutation = useMutation(
    (data: UserFormData) => {
      if (!email) {
        throw new Error("El correo electrónico es obligatorio");
      }
      return apiClient.updateUser(email, data);
    },
    {
      onSuccess: async () => {
        showToast({
          message: "Usuario actualizado correctamente",
          type: "SUCCESS",
        });
        await queryClient.invalidateQueries("fetchCurrentUser");
        navigate("/");
      },
      onError: () => {
        showToast({ message: "Error al actualizar usuario", type: "ERROR" });
      },
    }
  );

  const deleteMutation = useMutation(
    () => apiClient.deleteMyUser(),
    {
      onSuccess: () => {
        showToast({ message: "Cuenta eliminada correctamente", type: "SUCCESS" });
        navigate("/");
      },
      onError: () => {
        showToast({ message: "Error al eliminar la cuenta", type: "ERROR" });
      },
    }
  );

  const handleDelete = () => {
    if (confirmText === "deseo eliminar mi cuenta") {
      deleteMutation.mutate();
    } else {
      showToast({ message: "El texto ingresado no es correcto", type: "ERROR" });
    }
  };

  // Función para evaluar la fortaleza de la contraseña

  const onSubmit = handleSubmit((data) => {
    if (data.password && data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    if (isPasswordModified && passwordStrength < 2) {
      showToast({
        message:
          "La contraseña es demasiado débil. Intenta con una más segura.",
        type: "ERROR",
      });
      return;
    }

    // Enviar solo los campos que han cambiado
    const updatedData: Partial<UserFormData> = {};
    if (data.firstName !== userFirstName)
      updatedData.firstName = data.firstName;
    if (data.lastName !== userLastName) updatedData.lastName = data.lastName;
    if (data.password) updatedData.password = data.password;

    mutation.mutate(updatedData as UserFormData);
  });

  return (
    <>
    <form onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Editar usuario</h2>
      <div className="flex p-5 gap-2">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nombre
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            maxLength={50}
            {...register("firstName", { required: "El nombre es obligatorio" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
      </div>
      <div className="flex p-5 gap-2">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Apellido
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            maxLength={50}
            {...register("lastName", {
              required: "El apellido es obligatorio",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <div className="flex p-5 gap-2">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Contraseña
          <div className="relative">
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              maxLength={50}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de la contraseña
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          {/* Componente de fortaleza de contraseña */}
          <PasswordStrengthMeter password={password} />
        </label>
      </div>
      <div className="flex p-5 gap-2">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirmar Contraseña
          <div className="relative">
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              maxLength={50}
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (val) =>
                  !isPasswordModified ||
                  val === watch("password") ||
                  "Las contraseñas no coinciden",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex items-center justify-center gap-4 px-4">
        <button
          type="submit"
          className={`bg-rose-400 text-white p-2 font-bold hover:bg-rose-500 text-xl ${
            isPasswordModified && passwordStrength < 2
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={isPasswordModified && passwordStrength < 2} // Deshabilitar el botón solo si la contraseña es débil y fue modificada
        >
          Actualizar
        </button>
        <button
          type="button"
          className="bg-red-500 text-white p-2 font-bold hover:bg-red-600 text-xl"
          onClick={()=>setIsModalOpen(true)}
        >
          Eliminar
        </button>
      </div>
    </form>

    {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold">Confirmar eliminación</h2>
          <p className="mt-2">Para eliminar tu cuenta, escribe <strong>"deseo eliminar mi cuenta"</strong> en el campo de abajo.</p>
          <input
            type="text"
            className="border rounded w-full p-2 mt-3"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button className="bg-gray-400 text-white p-2 font-bold mr-2" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            <button className="bg-red-500 text-white p-2 font-bold" onClick={handleDelete} disabled={confirmText !== "deseo eliminar mi cuenta"}>Eliminar</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditUser;
