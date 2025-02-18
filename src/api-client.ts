import { RegisterFormData } from "./pages/Register";
import { RegisterFormDataAdmin } from "./pages/RegisterAdmin";
import { UserFormData } from "./pages/EditUser";
import { SignInFormData } from "./pages/SignIn";
import { RecoverPasswordFormData } from "./pages/RecoverPassword";
import { ResetPasswordFormData } from "./pages/ResetPassword";
import {
  HotelSearchResponse,
  HotelType,
  SedeType,
  UserType,
} from ".././shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error obteniendo usuario");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const registerAdmin = async (formData: RegisterFormDataAdmin) => {
  const response = await fetch(`${API_BASE_URL}/api/users/registeradmin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const updateUser = async (email: string, formData: UserFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/update/${email}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el Usuario");
  }

  return response.json();
}

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  console.log(body);
  return await body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return await response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyCoworking = async (sedeFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-coworkings`, {
    method: "POST",
    credentials: "include",
    body: sedeFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add coworking");
  }

  return response.json();
};

export const fetchMyCoworkings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-coworkings`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (idsede: string): Promise<SedeType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-coworkings/get-coworking/${idsede}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching coworking");
  }

  return response.json();
};

export const updateMyHotelById = async (sedeFormData: FormData, idsede: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-coworkings/get-coworking/${idsede}`,
    {
      method: "PUT",
      body: sedeFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Fallo al actualizar coworking");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/coworkings/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

//Recuperar contraseña
export const recoverPassword = async (formData: RecoverPasswordFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message || "Error al recuperar la contraseña");
  }

  return response.json();
};

export const resetPassword = async (formData: ResetPasswordFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json(); // O lo que sea que necesites devolver
};
