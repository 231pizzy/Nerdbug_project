import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { toast } from "react-toastify";

function Inputs({ setQuery, units, setUnits }) {
  const [city, SetCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          setQuery({
            lat,
            lon,
          });
        },
        (error) => {
          toast.error(
            "Failed to fetch location. Please check your browser settings."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported in your browser.");
    }
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if (units !== selectedUnit) setUnits(selectedUnit);
  };
  return (
    <div className="flex flex-col md:flex-row justify-center my-6">
      <div className="flex flex-col md:flex-row w-full md:w-3/4 items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow">
          <input
            type="text"
            value={city}
            onKeyDown={(e) => {
              if (e.key === "Enter" && city !== "") {
                e.preventDefault();
                handleSearchClick();
              }
            }}
            onChange={(e) => SetCity(e.currentTarget.value)}
            placeholder="Search for city..."
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-md"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <UilSearch
            size={25}
            className="text-white cursor-pointer border border-white transition ease-out hover:scale-125"
            onClick={handleSearchClick}
          />
          <UilLocationPoint
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocation}
          />
        </div>
      </div>
      <div className="flex flex-row w-full md:w-1/4 items-center justify-center md:justify-end">
        <button
          name="metric"
          className="text-xl text-white font-light hover:scale-125"
          onClick={handleUnitChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light hover:scale-125"
          onClick={handleUnitChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
