import { useFormContext } from "react-hook-form";
//import { HotelFormData } from "./ManageHotelForm";
import { SedeFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SedeFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Participantes</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Asistentes
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("asistentes", {
              required: "This field is required",
            })}
          />
          {errors.asistentes?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.asistentes?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Visitantes
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("visitantes", {
              required: "This field is required",
            })}
          />
          {errors.visitantes?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.visitantes?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;