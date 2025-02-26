import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useQueryClient } from "react-query";
import SignOutButton from "./SignOutButton";
import { useEffect, useState } from "react";

const Header = () => {
  const { isLoggedIn, user } = useAppContext();
  const [currentRole, setCurrentRole] = useState(user?.role);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {

      if (user?.role !== currentRole) {
        setCurrentRole(user?.role);
      }

      if (currentRole === "admin") {
        await queryClient.invalidateQueries("fetchCurrentAdmin");
      }
    };
    fetchData();
  }, [user, currentRole, queryClient]);

  return (
    <div className="relative bg-gradient-to-t from-[#f43f5e] to-[#e32243] py-4 sm:py-6 max-w-screen">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Logo y nombre */}
        <Link
          to="/"
          className="flex items-center text-xl sm:text-3xl text-white font-bold tracking-tight"
        >
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-6 h-6 sm:w-8 sm:h-8 mr-2"
          />
          <span className="hidden sm:block">Workio</span>{" "}
          {/* Oculta "Workio" en pantallas pequeñas */}
        </Link>

	{/* 
	<span className="flex space-x-2 sm:space-x-3">
          {isLoggedIn ? (
            <>
              {user?.role === "user" && (
                <Link
                  className="flex items-center text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-bold hover:bg-blue-600 rounded"
                  to="/bookings"
                >
                  Mis Reservas
                </Link>
              )}
              
	*/}

        {/* Menú de navegación */}
        <span className="flex space-x-2 sm:space-x-3">
          {isLoggedIn ? (
            <>
              {user?.role === "user" && (
                <Link
                  className="flex items-center text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-bold hover:bg-blue-600 rounded"
                  to="/bookings"
                >
                  Mis Reservas
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  className="flex items-center text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-bold hover:bg-blue-600 rounded"
                  to="/my-coworkings"
                >
                  Mis Coworkings
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-rose-400 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-bold hover:bg-gray-100 rounded"
            >
              Iniciar sesión
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
