import { useEffect, useState } from "react"
import type { CityData } from "../typs/cityData"
import type { WeatherDataAPIResponse  } from "../typs/ًWeatherData"
import { getWeathercodeDescription } from "../utils/GetWeatherCodeDescription"
import { getWeathercodeicone } from "../utils/GetWeatherCodeIcone"
type props={
city:CityData
handleRemovecity:(id:number)=>void
}
function Weathercard({ city,handleRemovecity }: props) {
  const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null)

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
    )
    const data: WeatherDataAPIResponse = await response.json()
    console.log(`data fetched for city `,city.name, data)
    setWeather(data)
  }

  useEffect(() => {
    fetchWeather()
  }, [city.updatedAt])


  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
        <div className="flex justify-between items-center"><h1>{city.name} , {city.country}</h1>
        <div onClick={()=>handleRemovecity(city.id)}className="cursor-pointer" >🗑️</div>
        </div>
      

      <p className="text-3xl font-bold">
        {Math.round(weather?.current_weather.temperature ?? 0)}
        {weather?.current_weather_units.temperature}
      </p>

      <p className="text-3xl ">
        {getWeathercodeicone(weather?.current_weather.weathercode ?? 0)}{" "}
        {getWeathercodeDescription(weather?.current_weather.weathercode ?? 0)}
      </p>
      <p className="text-3xl  border border-gray-300 rounded-md p-2">
       Wind:{Math.round(weather?.current_weather.windspeed??0)}
       {weather?.current_weather_units.windspeed}
      </p>
      <p className="text-xs text-gray-700 text-bold">Updated at:{city.updatedAt.toLocaleString()}</p>

    </div>
  )
}

export default Weathercard