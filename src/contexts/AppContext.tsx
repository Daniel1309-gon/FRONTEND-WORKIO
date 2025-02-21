import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Toast from "../components/Toast";
import { UserType } from "../../shared/types";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  user: UserType | null;
  clearUser: () => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [user, setUser] = useState<UserType | null>(null);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const { data } = useQuery<UserType>(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
    {
      retry: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  // 🔥 Actualiza `user` cuando `data` cambia
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        user,
        clearUser: () => setUser(null),
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

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
