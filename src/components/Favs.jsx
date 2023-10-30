import React, { useState, useEffect } from "react";
import { UilTrashAlt, UilHeartAlt } from "@iconscout/react-unicons";
import getFormattedWeatherData from "../services/weatherService";

function Favs({ favorites, removeFromFavorites, addToFavorites }) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [cityData, setCityData] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    // Fetch weather data for all favorite cities
    const fetchDataForCities = async () => {
      const cityData = {};
      for (const city of favorites) {
        const data = await getFormattedWeatherData({
          q: city.name,
          units: "metric",
        });
        cityData[city.name] = data;
      }
      setCityData(cityData);
    };

    fetchDataForCities();
  }, [favorites]);

  const toggleCity = (city) => {
    setSelectedCity(city === selectedCity ? null : city);
  };

  return (
    <div className="md:flex">
      <div className="md:w-1/2 text-center md:text-left text-lg text-white">
        <div className="company-logo">Your Weather Today</div>
      </div>
      <div className="md:w-1/2 flex flex-col items-end w-full">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`text-white p-2 m-2 hover:scale-125 rounded-md`}
        >
          <UilHeartAlt className={showFavorites ? "text-green-500" : ""} />
        </button>
        {showFavorites && (
          <FavoriteCities
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
            cityData={cityData}
            selectedCity={selectedCity}
            toggleCity={toggleCity}
          />
        )}
      </div>
    </div>
  );
}

function FavoriteCities({
  favorites,
  removeFromFavorites,
  cityData,
  selectedCity,
  toggleCity,
}) {
  // Sort the favorites array alphabetically by city name
  const sortedFavorites = [...favorites].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="centered-favorite-data">
      <ul>
        {sortedFavorites.map((city, index) => (
          <li key={index} className="">
            <button
              onClick={() => toggleCity(city.name)}
              className={`text-white mt-2 text-lg cursor-pointer transition ease-out hover:scale-125 p-2 md:inline-block w-full rounded-md`}
            >
              {city.name}, {city.country}
            </button>
            {selectedCity === city.name && (
              <div className="text-white text-center">
                <div>Temperature: {cityData[city.name].temp.toFixed()}°C</div>
                <div>Humidity: {cityData[city.name].humidity.toFixed()}%</div>
                <div>Wind: {cityData[city.name].speed.toFixed()}km/h</div>
              </div>
            )}
            <button
              onClick={() => removeFromFavorites(city)}
              className="hover-action-button delete-button hover:text-red-600 text-white rounded p-1 px-0 ml-10 items-center justify-center"
            >
              <UilTrashAlt size={20} className="hover:scale-125" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favs;
