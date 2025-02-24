import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: bookings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <span>Aún no tienes reservas</span>;
  }

  console.log(bookings);
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Mis Reservas</h1>
      {bookings.map((booking) => (
        <div
          key={booking.idreserva}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          {booking.image_urls?.length > 0 ? (
            <div className="lg:w-full lg:h-[250px]">
              <img
                src={booking.image_urls[0]}
                className="w-full h-full object-cover object-center rounded-lg"
                alt={`Imagen de ${booking.name}`}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              Sin imagen
            </div>
          )}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">{booking.name}</div>
            <div>
              <span className="font-bold mr-2">Fechas:</span>
              <span>
                {new Date(booking.fecha_inicio).toLocaleDateString("es-ES", {
                  weekday: "short", 
                  day: "numeric",
                  month: "short", 
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(booking.fecha_fin).toLocaleDateString("es-ES", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div>
              <span className="font-bold mr-2">Total:</span>
              <span>${booking.precio}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
