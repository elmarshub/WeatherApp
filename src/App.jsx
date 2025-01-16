import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import "./index.css";
import WeatherDisplay from "./components/WeatherDisplay";
import Loading from "./components/Loading";
import { useWeather } from "./context/WeatherContext";

function App() {
  const { weather, isLoading, error } = useWeather();
  const [darkmode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => setDarkMode(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      className={`${
        darkmode ? "dark" : ""
      } bg-light-light dark:bg-dark-dark overflow-x-hidden px-3 sm:px-6 h-screen w-full transition-colors duration-500`}
    >
      <div className="max-w-[600px] mx-auto">
        <SearchBar darkmode={darkmode} setDarkMode={setDarkMode} />
        {isLoading && <Loading />}
        {error && <p className="text-red-500 mt-5 text-center">{error} ❌</p>}
        {!isLoading && !error && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  );
}

export default App;
