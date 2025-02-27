import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../shared/types";
import { useSearchContext } from "../contexts/SearchContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageCarousel from "../components/ImgCarousel";

const DetailPage = () => {
  const { idsede } = useParams<{ idsede: string }>();
  const search = useSearchContext();
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(search.checkIn);
  const [endDate, setEndDate] = useState<Date | null>(search.checkOut);
  const [reservationDate, setReservationDate] = useState<Date | null>(null); // Fecha para reserva por horas
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [reservationType, setReservationType] = useState("days");

  // Función para calcular la diferencia de días entre dos fechas
  const getDaysDifference = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;
    const diffInMs = end.getTime() - start.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  };

  // Función para calcular la diferencia de horas entre dos horas
  const getHoursDifference = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;
    const diffInMs = end.getTime() - start.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60));
  };

  const roundToNearest500 = (number: number): number => {
    return Math.ceil(number / 500) * 500;
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/coworkings/${idsede}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    if (idsede) {
      fetchHotelDetails();
    }
  }, [idsede]);

  if (!hotel) {
    return <div>Cargando...</div>;
  }

  const handleReserve = async () => {
    if (reservationType === "days" && (!startDate || !endDate)) return;
    if (reservationType === "hours" && (!reservationDate || !startTime || !endTime)) return;

    let totalPrice = 0;
    if (reservationType === "days") {
      const subtotalPrice = getDaysDifference(startDate, endDate) * hotel.price_per_day * 1.15 / 0.9406;
      totalPrice = roundToNearest500(subtotalPrice);
    } else if (reservationType === "hours") {
      const subtotalPrice = getHoursDifference(startTime, endTime) * (hotel.price_per_day / 8) * 1.15 / 0.9406;
      totalPrice = roundToNearest500(subtotalPrice);
    }

    const formatDate = (date: Date) => {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString().split("T")[0];
    };

    const formatTime = (date: Date) => {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString().split("T")[1].slice(0, 5);
    };

    const reservationData = {
      idsede: idsede,
      startDate: reservationType === "days" ? formatDate(startDate!) : null,
      endDate: reservationType === "days" ? formatDate(endDate!) : null,
      reservationDate: reservationType === "hours" ? formatDate(reservationDate!) : null,
      startTime: reservationType === "hours" && startTime ? formatTime(startTime) : null,
      endTime: reservationType === "hours" && endTime ? formatTime(endTime) : null,
      totalDays: reservationType === "days" ? getDaysDifference(startDate, endDate) : null,
      totalHours: reservationType === "hours" && startTime && endTime ? getHoursDifference(startTime, endTime) : null,
      totalPrice: totalPrice,
      sedeName: hotel.name,
      imgUrl: hotel.image_urls[0],
      idempresa: hotel.idempresa,
      reservationType: reservationType
    };

    console.log(reservationData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
      console.log(data)
      if (data.url) {
        window.location.href = data.url; // Redirige a MercadoPago
      } else {
        alert("Error al procesar el pago");
      }
    } catch (error) {
      console.error("Error creando la orden de pago:", error);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8">
        {/* Carrusel de imágenes */}
        <div>
          <ImageCarousel imageUrls={hotel.image_urls} />
          {/* Botón de reserva debajo del carrusel */}
          <button
            className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              reservationType === "days"
                ? !startDate || !endDate
                : !reservationDate || !startTime || !endTime || getHoursDifference(startTime, endTime) <= 0
            }
            onClick={handleReserve}
          >
            Reservar con MercadoPago
          </button>
        </div>

        {/* Información del hotel */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{hotel.name}</h1>

          {/* Estrellas y tipo de hotel */}
          {hotel.starrating > 0 && (
            <div className="flex items-center gap-2">
              <span className="flex">
                {Array.from({ length: hotel.starrating }).map((_, index) => (
                  <AiFillStar key={index} className="fill-yellow-400 text-xl" />
                ))}
              </span>
              <span className="text-gray-600 text-sm">{hotel.type}</span>
            </div>
          )}

          {/* Descripción */}
          <p className="text-gray-700 leading-relaxed">{hotel.description}</p>

          {/* Instalaciones */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Instalaciones:
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {hotel.facilities.map((facility, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {facility}
                </li>
              ))}
            </ul>
          </div>

          {/* Precios */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">Precios:</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Subtotal por día:</span> $
              {hotel.price_per_day}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">
                Total por día (con impuestos y comisión de pasarela):
              </span>{" "}
              ${roundToNearest500(hotel.price_per_day * 1.15 / 0.9406)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Subtotal por hora:</span> $
              {(hotel.price_per_day / 8).toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">
                Total por hora (con impuestos y comisión de pasarela):
              </span>{" "}
              ${(roundToNearest500((hotel.price_per_day / 8) * 1.15 / 0.9406)).toFixed(2)}
            </p>
          </div>

          {/* Tipo de reserva */}
          <div className="mt-6">
            <label className="block text-lg font-semibold text-gray-800">
              Selecciona tipo de reserva:
            </label>
            <select
              value={reservationType}
              onChange={(e) => setReservationType(e.target.value)}
              className="mt-2 p-2 border rounded-lg w-full"
            >
              <option value="days">Por días</option>
              <option value="hours">Por horas</option>
            </select>
          </div>

          {/* Selección de fechas u horas según el tipo de reserva */}
          {reservationType === "days" ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Selecciona las fechas de tu reserva
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div>
                  <label className="block font-medium text-gray-700">
                    Desde:
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Hasta:
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    dateFormat="dd/MM/yyyy"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              </div>
              {startDate && endDate && (
                <div className="p-3 bg-blue-50 rounded-lg mt-4">
                  <p className="text-blue-700 font-semibold">
                    <strong>Días seleccionados:</strong>{" "}
                    {getDaysDifference(startDate, endDate)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Selecciona el día y las horas de tu reserva
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div>
                  <label className="block font-medium text-gray-700">
                    Fecha:
                  </label>
                  <DatePicker
                    selected={reservationDate}
                    onChange={(date) => setReservationDate(date)}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Hora inicio:
                  </label>
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Hora"
                    dateFormat="h:mm aa"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Hora fin:
                  </label>
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Hora"
                    dateFormat="h:mm aa"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              </div>
              {reservationDate && startTime && endTime && (
                <div className="p-3 bg-blue-50 rounded-lg mt-4">
                <p className="text-blue-700 font-semibold">
                  <strong>Horas seleccionadas:</strong>{" "}
                  {getHoursDifference(startTime, endTime) > 0 ? (
                    getHoursDifference(startTime, endTime)
                  ) : (
                    <span className="text-red-500">Selecciona un rango de horas válido</span>
                  )}
                </p>
              </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;