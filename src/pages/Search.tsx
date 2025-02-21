import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/SedeTypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import { FiFilter } from "react-icons/fi"; // Icono para filtros

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    name: search.name,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    asistentes: search.asistentes.toString(),
    visitantes: search.visitantes.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };


  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <button
      className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
      onClick={() => setShowFilters(!showFilters)}
    >
      <FiFilter />
      Filtrar
    </button>

    {/* Sidebar de filtros */}
    <div
      className={`${
        showFilters ? "block" : "hidden"
      } lg:block absolute lg:relative top-0 left-0 bg-white p-5 w-full lg:w-auto h-screen lg:h-auto z-50 shadow-lg lg:shadow-none border border-slate-300 rounded-lg`}
    >
      <button
        className="lg:hidden mb-4 text-red-500"
        onClick={() => setShowFilters(false)}
      >
        Cerrar filtros
      </button>
      <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
        Filtrar por:
      </h3>
      <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
      <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
      <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
      <PriceFilter selectedPrice={selectedPrice} onChange={(value) => setSelectedPrice(value)} />
    </div>
      {/* <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filtrar por:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div> */}


      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Coworkings encontrados
            {search.name ? ` in ${search.name}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Organizar Por</option>
            <option value="starRating">Calificacion</option>
            <option value="pricePerNightAsc">
              Precio Por Dia (menor a mayor)
            </option>
            <option value="pricePerNightDesc">
              Precio Por Dia (mayor a menor)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;