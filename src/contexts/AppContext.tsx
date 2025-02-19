import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
//import { loadStripe, Stripe } from "@stripe/stripe-js";
import Toast from "../components/Toast";
import { UserType } from "../../shared/types";

//const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  user: UserType | null;
  //stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

//const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const { data } = useQuery<UserType>(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
    {
      retry: false,
      staleTime: 1000*60*5,
    }
  );

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        user: data || null,
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