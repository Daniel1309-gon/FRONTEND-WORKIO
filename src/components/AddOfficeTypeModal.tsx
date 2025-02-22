import { useEffect, useState } from "react";
import * as apiClient from "../api-client";

interface AddOfficeTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  idsede?: number;
}

interface OfficeType {
  idFacilidad: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  capacidad: number;
  disponibilidad: boolean;
}

const AddOfficeTypeModal = ({ isOpen, onClose, idsede }: AddOfficeTypeModalProps) => {
  const [officeTypes, setOfficeTypes] = useState<OfficeType[]>([]);
  const [newOfficeType, setNewOfficeType] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    capacidad: 1,
  });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !idsede) return;

    const fetchOfficeTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.getOfficeTypesBySede(idsede);
        setOfficeTypes(response);
      } catch (error) {
        console.error("Error fetching office types:", error);
        setError("No se pudieron cargar los tipos de oficina.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeTypes();
  }, [isOpen, idsede]);

  const handleCreateOfficeType = async () => {
    if (!idsede) {
      setError("Error: No se ha seleccionado una sede.");
      return;
    }

    if (!newOfficeType.nombre.trim() || !newOfficeType.tipo.trim() || newOfficeType.capacidad <= 0) {
      setError("El nombre, tipo y capacidad son obligatorios.");
      return;
    }

    setCreating(true);
    setError(null);
    try {
      const createdOfficeType = await apiClient.createOfficeType(idsede, newOfficeType);
      setOfficeTypes((prev) => [...prev, createdOfficeType]);
      setNewOfficeType({ nombre: "", tipo: "", descripcion: "", capacidad: 1 });
    } catch (error) {
      console.error("Error creando tipo de oficina:", error);
      setError("Hubo un problema al crear el tipo de oficina.");
    } finally {
      setCreating(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">Agregar Tipo de Oficina/Sala</h2>

        {/* Mostrar errores */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Listado de tipos existentes */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Tipos existentes:</h3>
          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : officeTypes.length > 0 ? (
            officeTypes.map((officeType) => (
              <p key={officeType.idFacilidad} className="text-gray-700">
                {officeType.nombre} - {officeType.tipo} (Capacidad: {officeType.capacidad}) {officeType.disponibilidad ? "Disponible": "No disponible"}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No hay tipos de oficina registrados.</p>
          )}
        </div>

        {/* Crear nuevo tipo de oficina */}
        <div className="mt-4">
          <h3 className="font-semibold">Crear nuevo tipo:</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={newOfficeType.nombre}
            onChange={(e) => setNewOfficeType({ ...newOfficeType, nombre: e.target.value })}
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="text"
            placeholder="Tipo (Ej: privada, compartida, sala de reuniones)"
            value={newOfficeType.tipo}
            onChange={(e) => setNewOfficeType({ ...newOfficeType, tipo: e.target.value })}
            className="w-full p-2 border rounded-md mt-2"
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={newOfficeType.descripcion}
            onChange={(e) => setNewOfficeType({ ...newOfficeType, descripcion: e.target.value })}
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="number"
            placeholder="Capacidad"
            min={1}
            value={newOfficeType.capacidad}
            onChange={(e) =>
              setNewOfficeType({ ...newOfficeType, capacidad: Math.max(1, Number(e.target.value)) })
            }
            className="w-full p-2 border rounded-md mt-2"
          />
          <button
            onClick={handleCreateOfficeType}
            disabled={creating}
            className={`mt-2 px-4 py-2 rounded-lg transition w-full ${
              creating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {creating ? "Creando..." : "Crear Tipo"}
          </button>
        </div>

        {/* Botones de acción */}
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddOfficeTypeModal;
