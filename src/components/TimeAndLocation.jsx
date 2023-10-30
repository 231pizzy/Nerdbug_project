import React, { useEffect, useState } from "react";
import { formatToLocalTime } from "../services/weatherService";
import { UilHeartAlt } from "@iconscout/react-unicons";
import {
  saveFavoritesToLocalStorage,
  loadFavoritesFromLocalStorage,
} from "../utils/localStorage";

function TimeAndLocation({
  weather: { dt, timezone, name, country },
  addToFavorites,
  removeFromFavorites,
}) {
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  useEffect(() => {
    const savedFavorites = loadFavoritesFromLocalStorage("favorites");
    if (
      savedFavorites.some(
        (favCity) => favCity.name === name && favCity.country === country
      )
    ) {
      setIsAddedToFavorites(true);
      console.log("Saved Favorites from Local Storage: ", savedFavorites);
    }
  }, [name, country]);

  const handleAddToFavorites = () => {
    const existingFavorites = loadFavoritesFromLocalStorage("favorites");
    const cityExistsInFavorites = existingFavorites.some(
      (favCity) => favCity.name === name && favCity.country === country
    );

    if (cityExistsInFavorites) {
      const updatedFavorites = existingFavorites.filter(
        (favCity) => !(favCity.name === name && favCity.country === country)
      );
      saveFavoritesToLocalStorage("favorites", updatedFavorites);

      removeFromFavorites({ name, country });
      setIsAddedToFavorites(false);
    } else {
      const updatedFavorites = [...existingFavorites, { name, country }];
      saveFavoritesToLocalStorage("favorites", updatedFavorites);
      addToFavorites({ name, country });
      setIsAddedToFavorites(true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-lg font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex justify-center items-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
        {isAddedToFavorites ? (
          <button
            className={`ml-8 transition ease-out hover:scale-125 ${
              isAddedToFavorites ? "text-green-500" : "text-white"
            }`}
            onClick={handleAddToFavorites}
          >
            <UilHeartAlt />
          </button>
        ) : (
          <button
            className={`ml-8 transition ease-out hover:scale-125 ${
              isAddedToFavorites ? "text-green-500" : "text-white"
            }`}
            onClick={handleAddToFavorites}
          >
            <UilHeartAlt />
          </button>
        )}
      </div>
    </div>
  );
}

export default TimeAndLocation;
