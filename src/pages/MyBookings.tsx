import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BookingType } from "../../shared/types";

// Definir el tipo de reserva


const MyBookings = () => {
  const { data: bookings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );


  const [showMore, setShowMore] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const now = Date.now();

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <span>Aún no tienes reservas</span>;
  }

  // Separar reservas en vigentes/futuras y pasadas
  const futureBookings = bookings.filter(
    (booking) => new Date(booking.fecha_fin).getTime() >= now
  );
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.fecha_fin).getTime() < now
  );

  // Ordenar reservas: primero por fecha de fin
  futureBookings.sort((a, b) => new Date(a.fecha_fin).getTime() - new Date(b.fecha_fin).getTime());
  pastBookings.sort((a, b) => new Date(b.fecha_fin).getTime() - new Date(a.fecha_fin).getTime()); // Más recientes primero

  // Mostrar solo 3 futuras por defecto
  const visibleFutureBookings = showMore ? futureBookings : futureBookings.slice(0, 3);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Mis Reservas</h1>

      {/* Mostrar las reservas vigentes y futuras */}
      {visibleFutureBookings.map((booking) => (
        <BookingCard key={booking.idreserva} booking={booking} isPast={false} />
      ))}

      {/* Botón para ver más o menos reservas futuras */}
      {futureBookings.length > 3 && (
        <div className="text-center mt-5">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            {showMore ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}

      {/* Botón para ver las reservas pasadas */}
      {pastBookings.length > 0 && (
        <div className="text-center mt-5">
          <button
            onClick={() => setShowPast(!showPast)}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            {showPast ? "Ocultar reservas pasadas" : "Ver reservas pasadas"}
          </button>
        </div>
      )}

      {/* Mostrar reservas pasadas solo si el usuario las quiere ver */}
      {showPast &&
        pastBookings.map((booking) => (
          <BookingCard key={booking.idreserva} booking={booking} isPast={true} />
        ))}
    </div>
  );
};

type BookingCardProps = {
  booking: BookingType;
  isPast: boolean;
};

const BookingCard = ({ booking, isPast }: BookingCardProps) => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5 ${
        isPast ? "bg-gray-100 text-gray-500 opacity-70" : ""
      }`}
    >
      {booking.image_urls?.length ? (
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

        {/* Fechas u horas según el tipo de reserva */}
        <div>
          <span className="font-bold mr-2">Fechas:</span>
          {booking.tipo === "days" ? (
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
          ) : (
            <span>
              {new Date(booking.fecha_inicio).toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              {new Date(booking.fecha_inicio).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              -{" "}
              {new Date(booking.fecha_fin).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          )}
        </div>

        <div>
          <span className="font-bold mr-2">Total:</span>
          <span>${booking.precio}</span>
          <br />
          <br />
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
            Reserva por {booking.tipo === "days" ? "días" : "horas"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
