import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageCoworkingForm";
import { useAppContext } from "../contexts/AppContext";
import { SedeType } from "../../shared/types"; // Asegúrate de definir esta interfaz

const EditHotel = () => {
  const navigate = useNavigate();
  const { idsede } = useParams<{ idsede: string }>();
  const { showToast } = useAppContext();

  const { data: sede, isLoading: isFetching } = useQuery<SedeType>(
    ["fetchMyHotelById", idsede], // Clave dinámica para evitar problemas de caché
    () => apiClient.fetchMyHotelById(idsede as string),
    {
      enabled: !!idsede, // Solo ejecuta la query si hay un `idsede`
    }
  );

  const { mutate, isLoading: isSaving } = useMutation(
    ({ idsede, sedeFormData }: { idsede: string; sedeFormData: FormData }) =>
      apiClient.updateMyHotelById(sedeFormData, idsede),
    {
      onSuccess: () => {
        showToast({ message: "Coworking guardado!", type: "SUCCESS" });
        navigate('/');
      },
      onError: () => {
        showToast({ message: "Error editando Coworking", type: "ERROR" });
      },
    }
  );

  const handleSave = (hotelFormData: FormData) => {
    if (!idsede) {
      showToast({ message: "ID de sede no válido", type: "ERROR" });
      return;
    }
    mutate({ idsede, sedeFormData: hotelFormData });
  };

  if (isFetching) return <p>Cargando datos...</p>;
  if (!sede) return <p>Error: No se encontró la sede.</p>;

  return (
    <ManageHotelForm sede={sede} onSave={handleSave} isLoading={isSaving} />
  );
};

export default EditHotel;
