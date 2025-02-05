import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
/* import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"; */
import { motion } from "framer-motion";

interface Coworking {
  idsede: number;
  type: string;
  name: string;
  tipo_via_principal: string;
  via_principal: string;
  via_secundaria: string;
  complemento: string;
}

const MyHotels = () => {
  const {
    data: coworkingData,
    isLoading,
    isError,
  } = useQuery<Coworking[]>("fetchMyCoworkings", apiClient.fetchMyCoworkings, {
    onError: () => {},
  });

  if (isLoading) return <span>Cargando coworkings...</span>;
  if (isError || !coworkingData)
    return <span>Ningún coworking encontrado</span>;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">Mis Coworkings</h1>
        <Link
          to="/add-coworking"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Anadir Coworking
        </Link>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {coworkingData.map((coworking) => (
          <motion.div
            key={coworking.idsede}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-gray-600 mt-2">{coworking.name}</h2>
            <p className="text-gray-500 text-sm mt-1">Direccion: {coworking.tipo_via_principal} {coworking.via_principal} #{coworking.via_secundaria} - {coworking.complemento}</p>
            <p className="text-gray-500 text-sm mt-1">
              Tipo: {coworking.type}
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
              Ver detalles
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
