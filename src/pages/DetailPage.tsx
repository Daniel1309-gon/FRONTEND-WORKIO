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

  useEffect(() => {
    // Fetch the hotel details using the ID from the URL
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
    const subtotalPrice = getDaysDifference(startDate, endDate) * hotel.price_per_day;
    const totalPrice = subtotalPrice * 1.1; // Añade un 10% PARA Workio
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
  
    console.log("reservationData", reservationData);
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
         },
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
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8">
        {/* <div className="w-full h-[300px]">
          <img
            src={hotel.image_urls[0]}
            alt={`Imagen de ${hotel.name}`}
            className="w-full h-full object-cover object-center"
          />
        </div> */}
        <ImageCarousel imageUrls={hotel.image_urls} />

        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          {hotel.starrating > 0 && (
            <div className="flex items-center mt-2">
              <span className="flex">
                {Array.from({ length: hotel.starrating }).map((_, index) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ))}
              </span>
              <span className="ml-2 text-sm">{hotel.type}</span>
            </div>
          )}
          <p className="mt-4">{hotel.description}</p>

          <div className="mt-4">
            <h3 className="font-bold">Instalaciones:</h3>
            <ul>
              {hotel.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-bold">
              Subtotal por día: ${hotel.price_per_day}
              <br />
              Total por día: ${hotel.price_per_day*1.1}
            </h3>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              Selecciona las fechas de tu reserva
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div>
                <label className="block font-medium">Desde:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()} // No permite fechas pasadas
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Hasta:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()} // La fecha final debe ser mayor que la inicial
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            {startDate && endDate && (
              <p className="text-lg">
                <strong>Días seleccionados:</strong>{" "}
                {getDaysDifference(startDate, endDate)}
              </p>
            )}
          </div>

          {/* Aquí agregamos el botón de MercadoPago */}
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg hover:bg-blue-500"
              disabled={!startDate || !endDate} // Deshabilita si no se seleccionaron fechas
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
