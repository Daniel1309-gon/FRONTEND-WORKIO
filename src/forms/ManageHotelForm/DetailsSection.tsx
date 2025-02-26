import { useFormContext } from "react-hook-form";
//import { HotelFormData } from "./ManageHotelForm";
import { SedeFormData } from "./ManageCoworkingForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SedeFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Anadir Coworking</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Nombre <span className="text-[#f83c5c]">*</span>
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          maxLength={50}
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        {/* <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label> */}

        <label className="text-gray-700 text-sm font-bold flex-1">
          Ciudad <span className="text-[#f83c5c]">*</span>
          <select
            {...register("city", {
              required: "This field is required",
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
          >
            <option value="">Selecciona una ciudad</option>
            {[
              "Bogotá",
              "Medellín",
              "Cali",
              "Barranquilla",
              "Cartagena",
              "Bucaramanga",
              "Pereira",
              "Santa Marta",
              "Cúcuta",
              "Manizales",
              "Ibagué",
              "Villavicencio",
              "Armenia",
              "Pasto",
              "Neiva",
            ].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          País <span className="text-[#f83c5c]">*</span>
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            maxLength={50}
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Descripción <span className="text-[#f83c5c]">*</span>
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Precio por Día <span className="text-[#f83c5c]">*</span>
        <input
          type="number"
          min={1}
          maxLength={50}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("price_per_day", { required: "This field is required" })}
        ></input>
        {errors.price_per_day && (
          <span className="text-red-500">{errors.price_per_day.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Estrellas de Calificación <span className="text-[#f83c5c]">*</span>
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Selecciona Calificacion
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
      <h2 className="text-2xl font-bold mb-3">Dirección</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Tipo de Vía Principal <span className="text-[#f83c5c]">*</span>
        <select
          {...register("tipo_via_principal", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="">Selecciona tipo de vía</option>
          {[
            "Avenida Calle",
            "Avenida Carrera",
            "Calle",
            "Carrera",
            "Diagonal",
            "Transversal",
          ].map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        {errors.tipo_via_principal && (
          <span className="text-red-500">
            {errors.tipo_via_principal.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Vía Principal <span className="text-[#f83c5c]">*</span>
        <input
          type="text"
          maxLength={50}
          className="border rounded w-full py-1 px-2 font-normal"
          placeholder="Número identificador de la vía"
          {...register("via_principal", { required: "This field is required" })}
        ></input>
        {errors.via_principal && (
          <span className="text-red-500">{errors.via_principal.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Vía Secundaria <span className="text-[#f83c5c]">*</span>
        <input
          type="text"
          maxLength={50}
          className="border rounded w-full py-1 px-2 font-normal"
          placeholder="12b-21"
          {...register("via_secundaria")}
        ></input>
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Complemento <span className="text-[#f83c5c]">*</span>
        <input
          type="text"
          maxLength={50}
          className="border rounded w-full py-1 px-2 font-normal"
          placeholder="Edificio esquinero, etc..."
          {...register("complemento")}
        ></input>
      </label>
    </div>
  );
};

export default DetailsSection;
