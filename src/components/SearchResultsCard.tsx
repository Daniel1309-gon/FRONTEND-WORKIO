import { Link } from "react-router-dom";
import { HotelType } from "../../shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 shadow-lg rounded-lg p-6 lg:p-8 gap-6 bg-white">
  {/* Imagen del hotel */}
  <div className="w-full h-[300px] rounded-lg overflow-hidden">
    <img
      src={hotel.image_urls[0]}
      alt={`Imagen de ${hotel.name}`}
      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Información del hotel */}
  <div className="grid grid-rows-[auto_auto_1fr] gap-4">
    {/* Nombre y estrellas */}
    <div>
      {hotel.starrating > 0 && (
        <div className="flex items-center gap-2">
          <span className="flex">
            {Array.from({ length: hotel.starrating }).map((_, index) => (
              <AiFillStar key={index} className="fill-yellow-400 text-lg" />
            ))}
          </span>
          <span className="text-gray-600 text-sm">{hotel.type}</span>
        </div>
      )}
      <Link
        to={`/coworkings/${hotel._id ?? hotel.idsede}`}
        className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
      >
        {hotel.name}
      </Link>
    </div>

    {/* Dirección y descripción */}
    <div className="bg-gray-100 border-l-4 border-blue-600 p-4 rounded-lg shadow-sm">
      <p className="text-gray-500 text-xs uppercase font-semibold">Dirección</p>
      <p className="mt-1 text-gray-800 text-sm">
        {hotel.tipo_via_principal} {hotel.via_principal} #{hotel.via_secundaria} - {hotel.complemento}
      </p>
      <p className="text-gray-500 text-xs uppercase font-semibold mt-3">Descripción</p>
      <p className="text-gray-700 text-sm mt-1 line-clamp-3">{hotel.description}</p>
    </div>

    {/* Instalaciones y precios */}
    <div className="flex justify-between items-end">
      {/* Instalaciones */}
      <div className="flex gap-2 items-center flex-wrap">
        {hotel.facilities.slice(0, 3).map((facility, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
          >
            {facility}
          </span>
        ))}
        {hotel.facilities.length > 3 && (
          <span className="text-sm text-gray-600 font-medium">
            +{hotel.facilities.length - 3} más
          </span>
        )}
      </div>

      {/* Precio y botón */}
      <div className="flex flex-col items-end gap-2">
        <span className="text-lg font-bold text-gray-900">${hotel.price_per_day} por día</span>
        <Link
          to={`/coworkings/${hotel._id ?? hotel.idsede}`}
          className="bg-blue-600 text-white px-4 py-2 font-bold text-lg rounded-lg hover:bg-blue-500 transition-all"
        >
          Ver Más
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default SearchResultsCard;
