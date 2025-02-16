import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
//import { HotelType } from "../../../../backend/src/shared/types";
import { SedeType } from "../../../shared/types";
import { useEffect } from "react";

/* export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
}; */

export type SedeFormData = {
  idsede: number
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  price_per_day: number;
  starRating: number;
  facilities: string[];
  asistentes: number;
  visitantes: number;
  imageUrls: string[];
  imageFiles: FileList;
  tipo_via_principal: string;
  via_principal: string;
  via_secundaria: string;
  complemento: string;
};

type Props = {
  sede?: SedeType;
  onSave: (sedeFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, sede }: Props) => {
  const formMethods = useForm<SedeFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(sede);
  }, [sede, reset]);

  /* const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (sede) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  }); */

  const onSubmit = handleSubmit((formDataJson: SedeFormData) => {
    const formData = new FormData();
    
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("price_per_day", formDataJson.price_per_day.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("asistentes", formDataJson.asistentes.toString());
    formData.append("visitantes", formDataJson.visitantes.toString());
    formData.append("tipo_via_principal", formDataJson.tipo_via_principal);
    formData.append("via_principal", formDataJson.via_principal);
    formData.append("via_secundaria", formDataJson.via_secundaria);
    formData.append("complemento", formDataJson.complemento);

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles || []).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });


  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;