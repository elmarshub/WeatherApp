/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { WeatherApi } from "../hooks/WeatherApi";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const { weather, isLoading, error } = WeatherApi(city);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();

            if (data.city) {
              setCity(data.city);
              console.log(`📍 Detected City: ${data.city}`);
            } else {
              console.error("❌ Could not determine city.");
            }
          } catch (error) {
            console.error("❌ Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("❌ Geolocation Error:", error.message);
        }
      );
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{ city, setCity, weather, isLoading, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export { WeatherProvider, useWeather };
