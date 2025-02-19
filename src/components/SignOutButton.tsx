import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { showToast, user } = useAppContext();
  const { nombre } = user || {};

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
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
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        <span className="mr-2">{nombre}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
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

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-2">
            <li>
              <a
                href="/edituser"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Editar usuario
              </a>
            </li>
            <li>
              <button
                onClick={handleClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignOutButton;