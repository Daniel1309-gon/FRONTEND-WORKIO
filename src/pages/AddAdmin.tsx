// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import * as apiClient from "../api-client";
// import { useAppContext } from "../contexts/AppContext";
// import { EmpresaType } from "../../shared/types";

// export type AprobeEmpresaFormData = {
//   nombre: string;
//   nit: string;
//   direccion: string;
//   telefono: string;
//   email: string; 
//   contrato_firmado: true;
//   termsAccepted: true;
//   active: boolean;
// };

// type LoginFormData = {
//   username: string;
//   password: string;
// };

// const AddAdmin = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loginError, setLoginError] = useState("");
//   const [searchEmail, setSearchEmail] = useState("");
//   const queryClient = useQueryClient();
//   const { showToast } = useAppContext();
  
//   // Formulario de registro
//   const {
//     register: registerForm,
//     handleSubmit: handleSubmitForm,
//     formState: { errors: formErrors },
//     reset
//   } = useForm<AprobeEmpresaFormData>({
//     defaultValues: {
//       nombre: "",
//       nit: "",
//       email: "",
//       telefono: "",
//       direccion: "",
//       active: false
//     }
//   });

//   // Formulario de login
//   const {
//     register: registerLogin,
//     handleSubmit: handleSubmitLogin,
//     formState: { errors: loginErrors },
//     setValue
//   } = useForm<LoginFormData>();
  
//   useEffect(() => {
//     setValue("username", "");
//     setValue("password", "");
//   }, [setValue]);

//   const { data: empresas = [], isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery<EmpresaType[]>(
//     "empresas",
//     async () => {
//       const empresa = await apiClient.fetchEmpresa;
//       return Array.isArray(empresa) ? empresa : [];
//     },
//     {
//       enabled: isAuthenticated,
//       refetchOnWindowFocus: false,
//     }
//   );

//   const pendingAdmins = Array.isArray(empresas) ? empresas.filter((empresa: EmpresaType) => !empresa.active) : [];

//   const registerMutation = useMutation(apiClient.promoteAdmin, {
//     onSuccess: async () => {
//       showToast({ message: "Registro exitoso!", type: "SUCCESS" });
//       await queryClient.invalidateQueries("addAdmin");
//       reset();
//     },
//     onError: (error: Error) => {
//       showToast({
//         message: error.message || "Ocurrió un error inesperado",
//         type: "ERROR",
//       });
//     },
//   });

//   const approveMutation = useMutation(
//     (emails: string[]) => Promise.all(emails.map(email => apiClient.promoteAdmin({
//       email,
//       nombre: "",
//       nit: "",
//       direccion: "",
//       telefono: "",
//       contrato_firmado: true,
//       termsAccepted: true,
//       active: true
//     }))),
//     {
//       onSuccess: async () => {
//         showToast({ message: "Administradores aprobados exitosamente", type: "SUCCESS" });
//         await queryClient.invalidateQueries("adminUsers");
//         setSelectedUsers([]);
//       },
//       onError: (error: Error) => {
//         showToast({
//           message: error.message || "Ocurrió un error al aprobar administradores",
//           type: "ERROR",
//         });
//       },
//     }
//   );

//   const handleSelectUser = (email: string) => {
//     setSelectedUsers(prev => 
//       prev.includes(email) 
//         ? prev.filter(e => e !== email)
//         : [...prev, email]
//     );
//   };

//   const handleApproveSelected = () => {
//     if (selectedUsers.length > 0) {
//       approveMutation.mutate(selectedUsers);
//     } else {
//       showToast({ message: "Selecciona al menos un usuario", type: "ERROR" });
//     }
//   };

//   const handleSelectAll = () => {
//     if (pendingAdmins && pendingAdmins.length > 0) {
//       if (selectedUsers.length === pendingAdmins.length) {
//         // Si todos están seleccionados, deseleccionar todos
//         setSelectedUsers([]);
//       } else {
//         // Seleccionar todos
//         setSelectedUsers(pendingAdmins.map(admin => admin.email));
//       }
//     }
//   };

//   const onSubmitForm = handleSubmitForm((data) => {
//     return registerMutation.mutate(data);
//   });

//   const onSubmitLogin = handleSubmitLogin((data) => {
//     // Verificar credenciales
//     if (data.username === "equipoWorkio" && data.password === "workio2025*") {
//       setIsAuthenticated(true);
//       setLoginError("");
//       showToast({ message: "Acceso concedido", type: "SUCCESS" });
//     } else {
//       setLoginError("Usuario o contraseña incorrectos");
//     }
//   });

//   // Si no está autenticado, mostrar formulario de login
//   if (!isAuthenticated) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
//         <form 
//           className="flex flex-col gap-5 bg-white p-6 shadow-lg rounded-lg w-full max-w-md" 
//           onSubmit={onSubmitLogin}
//         >
//           <h2 className="text-3xl font-bold text-center">Acceso Administrativo</h2>
//           <p className="text-center text-gray-600 mb-4">Ingrese sus credenciales para continuar</p>
          
//           {loginError && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {loginError}
//             </div>
//           )}

//           <label className="text-gray-700 text-sm font-bold">
//             Usuario <span className="text-[#f83c5c]">*</span>
//             <input
//               className="border rounded w-full py-2 px-3 font-normal mt-1"
//               maxLength={50}
//               type="text"
//               autoComplete="off"
//               {...registerLogin("username", { required: "Usuario es obligatorio" })}
//             />
//             {loginErrors.username && <span className="text-red-500">{loginErrors.username.message}</span>}
//           </label>

//           <label className="text-gray-700 text-sm font-bold">
//             Contraseña <span className="text-[#f83c5c]">*</span>
//             <input
//               className="border rounded w-full py-2 px-3 font-normal mt-1"
//               maxLength={50}
//               type="password"
//               autoComplete="off"
//               {...registerLogin("password", { required: "Contraseña es obligatoria" })}
//             />
//             {loginErrors.password && <span className="text-red-500">{loginErrors.password.message}</span>}
//           </label>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 font-bold rounded-lg hover:bg-blue-500 text-lg mt-2"
//           >
//             Iniciar Sesión
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
//       <div className="flex flex-col gap-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-6xl">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold">Panel de Administración</h2>
//           <button
//             type="button"
//             onClick={() => setIsAuthenticated(false)}
//             className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
//           >
//             Cerrar Sesión
//           </button>
//         </div>

//         {/* Sección de usuarios pendientes */}
//         <div className="border rounded-lg p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Administradores Pendientes de Aprobación</h3>
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={handleSelectAll}
//                 className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
//                 disabled={pendingAdmins.length === 0}
//               >
//                 {pendingAdmins && selectedUsers.length === pendingAdmins.length 
//                   ? "Deseleccionar Todos" 
//                   : "Seleccionar Todos"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => refetchEmpresas()}
//                 className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-300 text-sm"
//               >
//                 Actualizar
//               </button>
//               <button
//                 type="button"
//                 onClick={handleApproveSelected}
//                 className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 text-sm"
//                 disabled={selectedUsers.length === 0 || approveMutation.isLoading}
//               >
//                 {approveMutation.isLoading ? "Procesando..." : "Aprobar Seleccionados"}
//               </button>
//             </div>
//           </div>

//           {isLoadingEmpresas ? (
//             <div className="text-center py-4">Cargando usuarios...</div>
//           ) : pendingAdmins.length === 0 ? (
//             <div className="text-center py-4 text-gray-500">No hay administradores pendientes de aprobación</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="border p-2 text-left w-16">
//                       <input 
//                         type="checkbox" 
//                         checked={pendingAdmins.length > 0 && selectedUsers.length === pendingAdmins.length}
//                         onChange={handleSelectAll}
//                         className="w-4 h-4"
//                       />
//                     </th>
//                     <th className="border p-2 text-left">Nombre</th>
//                     <th className="border p-2 text-left">Email</th>
//                     <th className="border p-2 text-left">NIT</th>
//                     <th className="border p-2 text-left w-24">Acciones</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pendingAdmins.map((admin) => (
//                     <tr key={admin.email} className="hover:bg-gray-50">
//                       <td className="border p-2">
//                         <input 
//                           type="checkbox" 
//                           checked={selectedUsers.includes(admin.email)}
//                           onChange={() => handleSelectUser(admin.email)}
//                           className="w-4 h-4"
//                         />
//                       </td>
//                       <td className="border p-2">{admin.nombre}</td>
//                       <td className="border p-2">{admin.email}</td>
//                       <td className="border p-2">{admin.nit}</td>
//                       <td className="border p-2">
//                         <button
//                           type="button"
//                           onClick={() => approveMutation.mutate([admin.email])}
//                           className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500 text-xs"
//                           disabled={approveMutation.isLoading}
//                         >
//                           Aprobar
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Sección para registrar manualmente */}
//         <div className="border rounded-lg p-4">
//           <h3 className="text-xl font-semibold mb-4">Registrar Nueva Empresa</h3>
//           <form className="flex flex-col gap-4" onSubmit={onSubmitForm}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <label className="text-gray-700 text-sm font-bold">
//                 Nombre de la Empresa <span className="text-[#f83c5c]">*</span>
//                 <input
//                   className="border rounded w-full py-2 px-3 font-normal mt-1"
//                   maxLength={50}
//                   autoComplete="off"
//                   {...registerForm("nombre", { required: "Este campo es obligatorio" })}
//                 />
//                 {formErrors.nombre && <span className="text-red-500">{formErrors.nombre.message}</span>}
//               </label>

//               <label className="text-gray-700 text-sm font-bold">
//                 NIT <span className="text-[#f83c5c]">*</span>
//                 <input
//                   className="border rounded w-full py-2 px-3 font-normal mt-1"
//                   maxLength={50}
//                   autoComplete="off"
//                   {...registerForm("nit", { required: "Este campo es obligatorio" })}
//                 />
//                 {formErrors.nit && <span className="text-red-500">{formErrors.nit.message}</span>}
//               </label>

//               <label className="text-gray-700 text-sm font-bold">
//                 Email <span className="text-[#f83c5c]">*</span>
//                 <input
//                   type="email"
//                   className="border rounded w-full py-2 px-3 font-normal mt-1"
//                   maxLength={50}
//                   autoComplete="off"
//                   {...registerForm("email", {
//                     required: "Este campo es obligatorio",
//                     pattern: {
//                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Ingresa un email válido",
//                     },
//                   })}
//                 />
//                 {formErrors.email && <span className="text-red-500">{formErrors.email.message}</span>}
//               </label>

//               <label className="text-gray-700 text-sm font-bold">
//                 Teléfono <span className="text-[#f83c5c]">*</span>
//                 <input
//                   className="border rounded w-full py-2 px-3 font-normal mt-1"
//                   maxLength={50}
//                   autoComplete="off"
//                   {...registerForm("telefono", { required: "Este campo es obligatorio" })}
//                 />
//                 {formErrors.telefono && <span className="text-red-500">{formErrors.telefono.message}</span>}
//               </label>

//               <label className="text-gray-700 text-sm font-bold md:col-span-2">
//                 Dirección <span className="text-[#f83c5c]">*</span>
//                 <input
//                   className="border rounded w-full py-2 px-3 font-normal mt-1"
//                   maxLength={50}
//                   autoComplete="off"
//                   placeholder="Ej: Calle 50 # 15-20"
//                   {...registerForm("direccion", { required: "Este campo es obligatorio" })}
//                 />
//                 {formErrors.direccion && <span className="text-red-500">{formErrors.direccion.message}</span>}
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 p-5 font-bold rounded-lg hover:bg-blue-500 text-lg mt-2 w-full md:w-auto md:self-center"
//               disabled={registerMutation.isLoading}
//             >
//               {registerMutation.isLoading ? "Registrando..." : "Registrar Empresa"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAdmin;
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { EmpresaType } from "../../shared/types";

export type AprobeEmpresaFormData = {
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  email: string; 
  contrato_firmado: true;
  termsAccepted: true;
  active: boolean;
};

type LoginFormData = {
  username: string;
  password: string;
};

const AddAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedEmpresas, setSelectedEmpresas] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<EmpresaType[]>([]);
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  
  // Formulario de búsqueda
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    formState: { errors: searchErrors }
  } = useForm<{ searchEmail: string }>({
    defaultValues: {
      searchEmail: ""
    }
  });

  // Formulario de login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    setValue
  } = useForm<LoginFormData>();
  
  useEffect(() => {
    setValue("username", "");
    setValue("password", "");
  }, [setValue]);

  // Corrección: Usar la función correcta de fetchEmpresas y manejar correctamente los datos
  const { data: empresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useQuery<EmpresaType[]>(
    "empresas",
    async () => {
      try {
        // Asegúrate de que apiClient.fetchEmpresa sea una función que se llama, no una referencia a una promesa
        const response = await apiClient.fetchEmpresa();
        return Array.isArray(response) ? response : [response];
      } catch (error) {
        console.error("Error fetching empresas:", error);
        return [];
      }
    },
    {
      enabled: isAuthenticated,
      refetchOnWindowFocus: false,
    }
  );

  const pendingEmpresas = Array.isArray(empresas) ? empresas.filter((empresa: EmpresaType) => !empresa.active) : [];

  const searchMutation = useMutation(
    async (email: string) => {
      try {
        const result = await apiClient.fetchEmpresa(email);
        return Array.isArray(result) ? result : [result];
      } catch {
        throw new Error("No se encontraron empresas con ese email");
      }
    },
    {
      onSuccess: (data) => {
        setSearchResults(data);
        if (data.length === 0) {
          showToast({ message: "No se encontraron empresas con ese email", type: "ERROR" });
        } else {
          showToast({ message: `Se encontraron ${data.length} empresas`, type: "SUCCESS" });
        }
      },
      onError: (error: Error) => {
        setSearchResults([]);
        showToast({
          message: error.message || "Ocurrió un error en la búsqueda",
          type: "ERROR",
        });
      },
    }
  );

  const updateStatusMutation = useMutation(
    ({ emails, active }: { emails: string[], active: boolean }) => 
      Promise.all(emails.map(email => 
        active?
          apiClient.promoteAdmin({
            email,
            nombre: "",
            nit: "",
            direccion: "",
            telefono: "",
            contrato_firmado: true,
            termsAccepted: true,
            active: true
          }) :
          apiClient.promoteAdmin({
            email,
            nombre: "",
            nit: "",
            direccion: "",
            telefono: "",
            contrato_firmado: true,
            termsAccepted: true,
            active: false
          })
      )),
    {
      onSuccess: async () => {
        const action = selectedEmpresas.length > 0 ? 
        (empresas?.find(e => e.email === selectedEmpresas[0])?.active ? "desactivadas" : "activadas") : 
        "actualizadas";
        showToast({ message: `Administradores ${action} exitosamente`, type: "SUCCESS" });
        await queryClient.invalidateQueries("empresas");
        setSelectedEmpresas([]);
      },
      onError: (error: Error) => {
        showToast({
          message: error.message || "Ocurrió un error al aprobar administradores",
          type: "ERROR",
        });
      },
    }
  );

  const handleSelectEmpresa = (email: string) => {
    setSelectedEmpresas(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    )
  };

  const handleUpdateSelected = (active: boolean) => {
    if (selectedEmpresas.length === 0) {
      showToast({ message: "Selecciona al menos una empresa", type: "ERROR" });
      return;
    
    if (!active) {
      return;
    }

    updateStatusMutation.mutate({ emails: selectedEmpresas, active });
    }
  };

  const handleSelectAll = () => {
    if (pendingEmpresas && pendingEmpresas.length > 0) {
      if (selectedEmpresas.length === pendingEmpresas.length) {
        // Si todos están seleccionados, deseleccionar todos
        setSelectedEmpresas([]);
      } else {
        // Seleccionar todos
        setSelectedEmpresas(pendingEmpresas.map(empresas => empresas.email));
      }
    }
  };

  const onSubmitSearch = handleSubmitSearch((data) => {
    searchMutation.mutate(data.searchEmail);
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
            Usuario <span className="text-[#f83c5c]">*</span>
            <input
              className="border rounded w-full py-2 px-3 font-normal mt-1"
              maxLength={50}
              type="text"
              autoComplete="off"
              {...registerLogin("username", { required: "Usuario es obligatorio" })}
            />
            {loginErrors.username && <span className="text-red-500">{loginErrors.username.message}</span>}
          </label>

          <label className="text-gray-700 text-sm font-bold">
            Contraseña <span className="text-[#f83c5c]">*</span>
            <input
              className="border rounded w-full py-2 px-3 font-normal mt-1"
              maxLength={50}
              type="password"
              autoComplete="off"
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
      <div className="flex flex-col gap-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-6xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Panel de Administración</h2>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Sección de usuarios pendientes */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Administradores Pendientes de Aprobación</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
                disabled={pendingEmpresas.length === 0}
              >
                {pendingEmpresas && selectedEmpresas.length === pendingEmpresas.length 
                  ? "Deseleccionar Todos" 
                  : "Seleccionar Todos"}
              </button>
              <button
                type="button"
                onClick={() => refetchEmpresas()}
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-300 text-sm"
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={() => handleUpdateSelected(true)}
                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 text-sm"
                disabled={selectedEmpresas.length === 0 || updateStatusMutation.isLoading}
              >
                {updateStatusMutation.isLoading ? "Procesando..." : "Aprobar Seleccionados"}
              </button>
            </div>
          </div>

          {isLoadingEmpresas ? (
            <div className="text-center py-4">Cargando usuarios...</div>
          ) : pendingEmpresas.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No hay administradores pendientes de aprobación</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left w-16">
                      <input 
                        type="checkbox" 
                        checked={pendingEmpresas.length > 0 && selectedEmpresas.length === pendingEmpresas.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="border p-2 text-left">ID</th>
                    <th className="border p-2 text-left">Nombre</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">NIT</th>
                    <th className="border p-2 text-left">ID Empresa</th>
                    <th className="border p-2 text-left w-24">Estado</th>
                    <th className="border p-2 text-left w-24">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingEmpresas.map((empresa) => (
                    <tr key={empresa.idempresa} className="hover:bg-gray-50">
                      <td className="border p-2">
                        <input 
                          type="checkbox" 
                          checked={selectedEmpresas.includes(empresa.email)}
                          onChange={() => handleSelectEmpresa(empresa.email)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="border p-2">{empresa.idempresa}</td>
                      <td className="border p-2">{empresa.nombre}</td>
                      <td className="border p-2">{empresa.email}</td>
                      <td className="border p-2">{empresa.nit}</td>
                      <td className="border p-2">{empresa.telefono}</td>
                      <td className="border p-2">
                        <span className={empresa.active ? "text-green-600" : "text-red-600"}>
                          {empresa.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="border p-2">
                        {!empresa.active && (
                          <button
                            type="button"
                            onClick={() => updateStatusMutation.mutate({
                              emails: [empresa.email],
                              active: !empresa.active
                            })}
                            className={`${empresa.active ? "bg-red-600" : "bg-green-600"} text-white px-2 py-1 rounded hover:${empresa.active ? "bg-red-500" : "bg-green-500"} text-xs`}
                            disabled={updateStatusMutation.isLoading}
                          >
                            {empresa.active ? "Desactivar" : "Aprobar"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sección para buscar empresas */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Buscar Empresa por Email</h3>
          <form className="flex flex-col gap-4" onSubmit={onSubmitSearch}>
            <div className="flex gap-4">
              <div className="flex-grow">
                <label className="text-gray-700 text-sm font-bold">
                  Email de la Empresa <span className="text-[#f83c5c]">*</span>
                  <input
                    type="email"
                    className="border rounded w-full py-2 px-3 font-normal mt-1"
                    placeholder="Ingresa el email para buscar"
                    {...registerSearch("searchEmail", {
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Ingresa un email válido",
                      },
                    })}
                  />
                  {searchErrors.searchEmail && <span className="text-red-500">{searchErrors.searchEmail.message}</span>}
                </label>
              </div>
              <div className="self-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 font-bold rounded-lg hover:bg-blue-500 h-10"
                  disabled={searchMutation.isLoading}
                >
                  {searchMutation.isLoading ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </div>
          </form>

          {/* Resultados de búsqueda */}
          {searchResults.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Resultados de la búsqueda</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2 text-left">ID</th>
                      <th className="border p-2 text-left">Nombre</th>
                      <th className="border p-2 text-left">Email</th>
                      <th className="border p-2 text-left">NIT</th>
                      <th className="border p-2 text-left">Teléfono</th>
                      <th className="border p-2 text-left">Estado</th>
                      <th className="border p-2 text-left w-24">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((empresa) => (
                      <tr key={empresa.idempresa} className="hover:bg-gray-50">
                        <td className="border p-2">{empresa.idempresa}</td>
                        <td className="border p-2">{empresa.nombre}</td>
                        <td className="border p-2">{empresa.email}</td>
                        <td className="border p-2">{empresa.nit}</td>
                        <td className="border p-2">{empresa.telefono}</td>
                        <td className="border p-2">
                          <span className={empresa.active ? "text-green-600" : "text-red-600"}>
                            {empresa.active ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="border p-2">
                          <button
                            type="button"
                            onClick={() => updateStatusMutation.mutate({
                              emails: [empresa.email], 
                              active: !empresa.active
                            })}
                            className={`${empresa.active ? "bg-red-600" : "bg-green-600"} text-white px-2 py-1 rounded hover:${empresa.active ? "bg-red-500" : "bg-green-500"} text-xs`}
                            disabled={updateStatusMutation.isLoading}
                          >
                            {empresa.active ? "Desactivar" : "Aprobar"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;