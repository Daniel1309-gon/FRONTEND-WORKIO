import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

export type UserFormData = {
    firstName: string;
    lastName: string;
    password: string;
};

const EditUser = () => {
    const queryClient = useQueryClient();
    const { showToast, user } = useAppContext();
    const { email } = user || {};

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>();

    const mutation = useMutation(
        (data: UserFormData) => {
            if (!email) {
                throw new Error("Email is required");
            }
            return apiClient.updateUser(email, data);
        },
        {
            onSuccess: async () => {
                showToast({ message: "Usuario actualizado correctamente", type: "SUCCESS" });
                await queryClient.invalidateQueries("fetchCurrentUser");
            },
            onError: () => {
                showToast({ message: "Error al actualizar usuario", type: "ERROR" });
            },
        },
    );

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (    
        <form onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Editar usuario</h2>
                <div className="flex p-5 gap-2">
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Nombre
                        <input 
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstName", { required: "El nombre es obligatorio" })} />
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
                        {...register("lastName", { required: "El apellido es obligatorio" })} />
                        {errors.lastName && (
                            <span className="text-red-500">{errors.lastName.message}</span>
                        )}
                    </label>
                </div>
                <div className="flex p-5 gap-2">
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Contraseña
                        <input 
                        className="border rounded w-full py-1 px-2 font-normal"
                        type="password" 
                        {...register("password", { 
                            required: "La contraseña es obligatoria", 
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            }
                        })} />
                        {errors.password && (
                            <span className="text-red-500">{errors.password.message}</span>
                        )}
                    </label>
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit"
                        className="bg-rose-400 text-white p-2 font-bold hover:bg-rose-400 text-xl"
                    >
                        Actualizar
                    </button>
                </div>
        </form>
    );
};

export default EditUser;