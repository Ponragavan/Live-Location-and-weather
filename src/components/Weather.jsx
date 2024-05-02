import { useEffect, useState } from "react";
import cloud from "../assets/svg/wi-cloud.svg";
import daycloud from "../assets/svg/wi-day-cloudy-gusts.svg";
import hot from "../assets/svg/wi-hot.svg";
import humidity from "../assets/svg/wi-humidity.svg";
import drizzle from "../assets/svg/wi-showers.svg";
import wind from "../assets/svg/wi-windy.svg";

const WeatherApp = ({ weatherData }) => {
  const [img, setImg] = useState(undefined);

  let description;
  useEffect(() => {
    if (weatherData) {
      description = weatherData.weather[0].description.toString().toLowerCase();
      if (description.includes("clouds")) {
        setImg(cloud);
      }
      else if (description.includes("rain") && description === "drizzle") {
        setImg(drizzle);
      }
      else{
        setImg(daycloud)
      }
    }
  }, [weatherData]);

  return (
    <div className="text-lg max-md:text-base">
      {weatherData && (
        <div>
          <div className="flex flex-row gap-8 margin mx-5 mt-7 mb-7 max-[1000px]:gap-6 not-last:border-b-0">
            <Description descTitle='Description' img={img} alt='Description icon' desc={weatherData.weather[0].description} />
            <Description descTitle='Temperature' img={hot} alt='Temperature icon' desc={weatherData.main.temp.toString()+ '\u00B0C'} />
            <Description descTitle='Humidity' img={humidity} alt='Humidity icon' desc={weatherData.main.humidity.toString()+ '%'} />
            <Description descTitle='Wind Speed' img={wind} alt='Wind Speed icon' desc={weatherData.wind.speed.toString()+ 'm/s'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

const Description = (props) => {
  return (
    <div className="flex flex-col border-r-2 pr-5 max-[450px]:pr-3 border-white">
      <p className="text-lg font-semibold text-yellow-500 max-[450px]:text-base">
        {props.descTitle}
      </p>
      <img src={props.img} alt={props.alt} className="w-28 h-28 max-[450px]:w-20  max-[450px]:h-20" />
      <p className="text-center max-[450px]:text-sm capitalize">{props.desc}</p>
    </div>
  );
};
