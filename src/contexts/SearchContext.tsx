import React, { useContext, useState } from "react";

type SearchContext = {
  name: string;
  checkIn: Date;
  checkOut: Date;
  asistentes: number;
  visitantes: number;
  hotelId: string;
  saveSearchValues: (
    name: string,
    checkIn: Date,
    checkOut: Date,
    asistentes: number,
    visitantes: number
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [name, setName] = useState<string>(
    () => sessionStorage.getItem("name") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [asistentes, setVisitantes] = useState<number>(() =>
    parseInt(sessionStorage.getItem("asistentes") || "1")
  );
  const [visitantes, setAsistentes] = useState<number>(() =>
    parseInt(sessionStorage.getItem("asistentes") || "1")
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelID") || ""
  );

  const saveSearchValues = (
    name: string,
    checkIn: Date,
    checkOut: Date,
    asistentes: number,
    visitantes: number,
    hotelId?: string
  ) => {
    setName(name);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAsistentes(asistentes);
    setVisitantes(visitantes);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("asistentes", asistentes.toString());
    sessionStorage.setItem("visitantes", visitantes.toString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        name,
        checkIn,
        checkOut,
        asistentes,
        visitantes,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};