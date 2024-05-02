import icon from "../src/assets/icon.png";
import logo from "../src/assets/log.png";
import btn from "../src/assets/btn.png";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import Weather from "./components/Weather";

export default function App() {
  const [location, setLocation] = useState(".....");
  const [clicked, isClicked] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const obtainLocation = () => {
    isClicked(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        fetchLocation(latitude, longitude);
        setError(null);
      },
      (error) => {
        console.error(error);
        if (error.code === error.PERMISSION_DENIED) {
          setError("Location access denied");
          alert("Location access denied");
        }
      }
    );
    const fetchLocation = async (latitude, longitude) => {
      try {
        // I'll utilize the geolocation API rather than the Google Maps API to determine location.Since it costs more to obtain position details using the Google Maps API
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        console.log(data);
        const city = data.city;
        const state = data.principalSubdivision;
        const country = data.countryName;
        fetchWeather(city);
        setLocation(`${city}, ${state},${country}`);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchWeather = async (city) => {
      try {
        // Find weather conditions using openweather map api key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c665d7dd748d6ef6ded9d9fd6c915e1&units=metric`
        );
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        setWeatherData(null);
        console.log("Error fetching weather data. Please try again.");
      }
    };
  };

  const resetHome = () => {
    isClicked(false);
  };
  let content;
  if (error) {
    content = error;
  } else {
    content = "Right now, you are in " + location + ".";
  }
  return (
    <>
      <header className="w-full h-14 bg-cover bg-top flex justify-center">
        <img src={icon} alt="The Icon" className="h-12 pt-2 mr-5" />
        <h2 className="pt-4 uppercase text-lg max-md:text-md font-bold bg-gradient-to-r from-red-400 to-pink-700 text-transparent bg-clip-text">
          Track User's Location
        </h2>
      </header>
      <main className="w-full h-screen bg-gradient-to-bl from-blue-700 via-sky-500 to-sky-200">
        {!clicked && (
          <Card>
            <img
              src={logo}
              alt="The Logo"
              className="h-24 w-32 max-md:h-16 max-md:w-20 my-5"
            />
            <h3 className="text-2xl uppercase font-bold bg-gradient-to-r from-teal-500 via-emerald-300 to-green-200 text-transparent bg-clip-text">
              Locate ME
            </h3>
            <p className="text-xl text-red-300 text-center m-6 max-md:text-base max-md:m-4">
              A user-friendly app enabling location tracking. Discover your
              current location and weather conditions with ease. Simple
              andintuitive.
            </p>
            <button
              className="h-20 max-md:h-16 w-3/4 flex gap-4 justify-center items-center bg-gradient-to-bl from-yellow-300 via-amber-500 to-orange-700 rounded-2xl max-md:rounded-xl text-xl transition duration-300 ease-in hover:scale-105 active:scale-105"
              onClick={obtainLocation}
            >
              <p className="max-md:text-base">Obtain Location</p>
              <img
                src={btn}
                alt="Button Icon"
                className="h-16 w-16 max-md:h-12 max-md:w-12"
              />
            </button>
          </Card>
        )}
        {clicked && (
          <Card>
            <img
              src={logo}
              alt="The Logo"
              className="h-24 w-32 max-md:h-16 max-md:w-20 my-5"
            />
            <h3 className="text-2xl uppercase font-bold bg-gradient-to-r from-teal-500 via-emerald-300 to-green-200 text-transparent bg-clip-text">
              location & weather
            </h3>
            <p className="text-xl text-red-300 text-center m-4 max-md:text-base max-md:m-2">
              {content}
            </p>
            <Weather weatherData={weatherData} />
            {!error ? (
              <button
                className="h-16 max-lg:h-12 max-md:text-sm w-1/3 max-md:w-1/2 bg-orange-500 text-lg rounded-lg px-6 py-4 my-6 duration-300 ease-in hover:scale-105 active:scale-105"
                onClick={resetHome}
              >
                Back to home
              </button>
            ) : (
              <button
                className="h-16 max-lg:h-12 max-md:text-sm w-1/3 max-md:w-1/2 bg-red-500 text-lg rounded-lg px-6 py-4 my-6 duration-300 ease-in hover:scale-105 active:scale-105"
                onClick={obtainLocation}
              >
                Retry
              </button>
            )}
          </Card>
        )}
      </main>
    </>
  );
}
