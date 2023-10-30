import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import getFormattedWeatherData from "../services/weatherService";
import { UilTrashAlt, UilEye } from "@iconscout/react-unicons";

function TopCarousel({ setQuery }) {
  const initialCities = [
    {
      id: 1,
      title: "Beijing",
    },
    {
      id: 2,
      title: "Buenos Aires",
    },
    {
      id: 3,
      title: "Cairo",
    },
    {
      id: 4,
      title: "Chongqing",
    },
    {
      id: 5,
      title: "Delhi",
    },
    {
      id: 6,
      title: "Dhaka",
    },
    {
      id: 7,
      title: "Istanbul",
    },
    {
      id: 8,
      title: "Karachi",
    },
    {
      id: 9,
      title: "Mexico City",
    },
    {
      id: 10,
      title: "Mumbai",
    },
    {
      id: 11,
      title: "New York",
    },
    {
      id: 12,
      title: "Osaka",
    },
    {
      id: 13,
      title: "Sao Paulo",
    },
    {
      id: 14,
      title: "Shanghai",
    },
    {
      id: 15,
      title: "Tokyo",
    },
  ];

  const [cities, setCities] = useState(initialCities);
  const [cityWeather, setCityWeather] = useState({});
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {
    const fetchCityWeather = async (city) => {
      const data = await getFormattedWeatherData({
        q: city.title,
        units: "metric",
      });
      setCityWeather((prevWeather) => ({ ...prevWeather, [city.title]: data }));
    };

    cities.forEach((city) => {
      fetchCityWeather(city);
    });
  }, [cities]);

  const removeCity = (id) => {
    const updatedCities = cities.filter((city) => city.id !== id);
    setCities(updatedCities);
  };

  const handleViewClick = (city) => {
    setQuery({ q: city.title });
  };

  const handleDeleteClick = (city) => {
    removeCity(city.id);
  };

  const chunkSize = window.innerWidth < 640 ? 1 : 3;

  const chunkedCities = [];
  for (let i = 0; i < cities.length; i += chunkSize) {
    chunkedCities.push(cities.slice(i, i + chunkSize));
  }

  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
      >
        {chunkedCities.map((chunk, index) => (
          <div key={index} className="flex justify-between">
            {chunk.map((city) => (
              <div key={city.id} className={`w-full sm:w-1/2 md:w-1/4 p-2`}>
                <div className="rounded-lg p-2">
                  <div
                    className="m-2 p-2 text-white rounded-md text-md font-medium"
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    {city.title}
                    {cityWeather[city.title] && (
                      <div className="temperature">
                        {cityWeather[city.title].temp.toFixed()}&deg;C
                      </div>
                    )}
                    {hoveredCity === city && (
                      <div>
                        <button
                          className="hover-action-button view-button hover:text-green-500 hover:scale-125 text-white rounded p-1 px-0"
                          onClick={() => handleViewClick(city)}
                          data-testid="view-button"
                        >
                          <UilEye size={20} className="hover:scale-125" />
                        </button>
                        <button
                          className="delete-button hover-action-button delete-button hover:scale-125 hover:text-red-500 text-white rounded p-1 px-0 ml-1"
                          onClick={() => handleDeleteClick(city)}
                          data-testid="delete-button"
                        >
                          <UilTrashAlt size={20} className="hover:scale-125" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
      <style>
        {`
          .control-dots {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

export default TopCarousel;
