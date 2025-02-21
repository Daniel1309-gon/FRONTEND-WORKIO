import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { showToast, user } = useAppContext();
  const { nombre } = user || {};

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(); 
      await queryClient.refetchQueries("fetchCurrentUser");
      showToast({ message: "Sesión cerrada", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="relative">
      {/* Botón con Avatar e ícono */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition shadow-sm"
      >
        {/* Avatar con inicial */}
        <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full">
          {nombre ? nombre.charAt(0).toUpperCase() : "?"}
        </div>
        <span className="ml-2 text-gray-700">{nombre || "Usuario"}</span>

        {/* Icono de flecha */}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Menú desplegable con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
          >
            <ul className="py-2">
              <li>
                <a
                  href="/edituser"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Editar usuario
                </a>
              </li>
              <li>
                <button
                  onClick={handleClick}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignOutButton;
