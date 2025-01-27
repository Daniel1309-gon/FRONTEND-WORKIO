import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-rose-500 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Workio</Link>
        </span>
        <span className="flex space-x-2">
        {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                Mis Reservas
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-coworkings"
              >
                Mis Coworkings
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-rose-400 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;