import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageCarousel from "../components/ImgCarousel";

const DetailPage = () => {
  const { idsede } = useParams<{ idsede: string }>();
  const [hotel, setHotel] = useState<HotelType | null>(null);
  // Estados para las fechas de reserva
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  //console.log("id", idsede);

  // Función para calcular la diferencia de días entre dos fechas
  const getDaysDifference = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0; // Si no hay fechas seleccionadas, devuelve 0
    const diffInMs = end.getTime() - start.getTime(); // Resta los timestamps
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convierte de milisegundos a días
  };
  
  const roundToNearest500 = (number: number): number => {
    return Math.ceil(number / 500) * 500;
  };
  useEffect(() => {
    const fetchHotelDetails = async () => {


      try {
        const response = await fetch(
          `${API_BASE_URL}/api/coworkings/${idsede}`
        ); // Endpoint del backend
        const data = await response.json();
        console.log("data", data);
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
    return <div>Cargando...</div>; // Mientras se carga, mostramos un mensaje
  }

  const handleReserve = async () => {
    if (!startDate || !endDate || !hotel) return;
    const subtotalPrice =
      getDaysDifference(startDate, endDate) * hotel.price_per_day * 1.15 / 0.9406;
    const totalPrice = roundToNearest500(subtotalPrice); // Añade un 15% PARA Workio
    const reservationData = {
      idsede: idsede,
      startDate: startDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
      endDate: endDate.toISOString().split("T")[0],
      totalDays: getDaysDifference(startDate, endDate),
      totalPrice: totalPrice, // Precio total
      sedeName: hotel.name,
      imgUrl: hotel.image_urls[0],
      idempresa: hotel.idempresa,
    };

    alert(totalPrice);

    console.log("reservationData", reservationData);
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
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
        <ImageCarousel imageUrls={hotel.image_urls} />

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
              ${roundToNearest500(hotel.price_per_day * 1.15 /0.9406)}
            </p>
          </div>

          {/* Selección de fechas */}
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
          </div>

          {/* Días seleccionados */}
          {startDate && endDate && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-semibold">
                <strong>Días seleccionados:</strong>{" "}
                {getDaysDifference(startDate, endDate)}
              </p>
            </div>
          )}

          {/* Botón de reserva */}
          <div className="mt-4">
            <button
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!startDate || !endDate}
              onClick={handleReserve}
            >
              Reservar con MercadoPago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
