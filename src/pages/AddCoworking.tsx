import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageCoworkingForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyCoworking, {
    onSuccess: () => {
      showToast({ message: "Coworking Guardado!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Guardando Coworking", type: "ERROR" });
    },
  });

  const handleSave = (sedeFormData: FormData) => {
    mutate(sedeFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;