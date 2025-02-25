import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Toast from "../components/Toast";
import { AdminType, UserType, EmpresaType } from "../../shared/types";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  user: UserType | AdminType | null;
  empresa: EmpresaType | null;
  clearUser: () => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [user, setUser] = useState<UserType | AdminType | null>(null);
  const [empresa, setEmpresa] = useState<EmpresaType | null>(null);
  const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
    onError: () => {
      // Si falla la validación, limpiamos el usuario
      setUser(null);
      setEmpresa(null);
    }
  });

  const getCurrentUser = async () => {
    try {
      const userData = await apiClient.fetchCurrentUser();
      setUserRole("user");
      return userData;
    } catch {
      try {
        const adminData = await apiClient.fetchCurrentAdmin();
        setUserRole("admin");
        return adminData;
      } catch {
        setUserRole(null);
        throw new Error("No authenticated user found");
      }
    }
  };

  const { data: userData } = useQuery<UserType | AdminType>(
    "getCurrentUser",
    getCurrentUser,
    {
      retry: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: dataEmpresa } = useQuery<EmpresaType>(
    ["fetchEmpresa", userRole === "admin" ? (userData as AdminType)?.idempresa : null],
    async () => {
      return apiClient.fetchEmpresa((userData as AdminType).idempresa);
    },
    {
      enabled: userRole === "admin" && !!(userData as AdminType)?.idempresa,
      retry: false,
      staleTime: 1000 * 60 * 5,
    }
  );
  
  // 🔥 Actualiza `user` cuando `data` cambia
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (dataEmpresa) {
      setEmpresa(dataEmpresa);
    }
  }, [dataEmpresa]);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        user,
        empresa,
        clearUser: () => {
          setUser(null);
          setEmpresa(null);
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext debe ser usado dentro de un AppContextProvider");
  }
  return context as AppContext;
};
