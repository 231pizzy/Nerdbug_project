import "./App.css";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import Temprature from "./components/Temprature";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loadFavoritesFromLocalStorage,
  saveFavoritesToLocalStorage,
} from "./utils/localStorage";
import Favs from "./components/Favs";
import TopCarousel from "./components/TopCarousel";

function App() {
  const [query, setQuery] = useState({ q: "tokyo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (city) => {
    if (!favorites.some((favCity) => favCity.name === city.name)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFromFavorites = (city) => {
    const updatedFavorites = favorites.filter(
      (favCity) => favCity.name !== city.name
    );
    setFavorites(updatedFavorites);

    const existingFavorites = loadFavoritesFromLocalStorage("favorites");
    const updatedLocalStorage = existingFavorites.filter(
      (favCity) => favCity.name !== city.name
    );
    saveFavoritesToLocalStorage("favorites", updatedLocalStorage);
  };
  useEffect(() => {
    const initialFavorites = loadFavoritesFromLocalStorage("favorites");
    setFavorites(initialFavorites);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      toast.info("fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Succesfully fetched weather for ${data.name}, ${data.country}`
        );
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshHold = units === "metric" ? 25 : 60;
    if (weather.temp <= threshHold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };
  return (
    <div
      className={`mx-auto auto max-w-screen-md mt-0 py-5 ${"min-h-screen md:h-screen"} mt-1 py-5 ${"px-0 md:px-32"} bg-gradient-to-br shadow-xl  h-fit shadow-gray-400 ${formatBackground()} space-y-5 md:space-y-0`}
    >
      <Favs
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
      <TopCarousel setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation
            weather={weather}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
          <Temprature weather={weather} />
        </div>
      )}

      <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
