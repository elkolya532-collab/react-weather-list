import { useEffect, useState } from "react"
import type { CityData } from "../typs/cityData"
import type { WeatherDataAPIResponse } from "../typs/ًWeatherData"
import { getWeathercodeDescription } from "../utils/GetWeatherCodeDescription"
import { getWeathercodeicone } from "../utils/GetWeatherCodeIcone"
import { FaTimes, FaMapMarkerAlt, FaWind, FaCompass } from "react-icons/fa"

type Props = {
  city: CityData
  handleRemovecity: (id: number) => void
}

function Weathercard({ city, handleRemovecity }: Props) {
  const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null)

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
    )
    const data: WeatherDataAPIResponse = await response.json()
    setWeather(data)
  }

  useEffect(() => {
    fetchWeather()
  }, [city])

  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all"></div>

      {/* Header: city name + remove button */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h2 className="text-lg font-bold text-slate-100">{city.name}</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <FaMapMarkerAlt className="text-sky-500" />
            {city.country}
          </p>
        </div>
        <button
          onClick={() => handleRemovecity(city.id)}
          className="bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          <FaTimes className="text-xs" />
        </button>
      </div>

      {/* Temperature + Icon */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-5xl font-bold text-sky-400">
            {Math.round(weather?.current_weather.temperature ?? 0)}
            <span className="text-2xl text-slate-500 ml-1">
              {weather?.current_weather_units.temperature}
            </span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {getWeathercodeDescription(weather?.current_weather.weathercode ?? 0)}
          </p>
        </div>
        <p className="text-6xl drop-shadow-lg">
          {getWeathercodeicone(weather?.current_weather.weathercode ?? 0)}
        </p>
      </div>

      {/* Wind + Direction */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-3 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <FaWind /> Wind
          </span>
          <span className="text-sm text-slate-300 font-medium">
            {weather?.current_weather.windspeed} {weather?.current_weather_units.windspeed}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <FaCompass /> Direction
          </span>
          <span className="text-sm text-slate-300 font-medium">
            {weather?.current_weather.winddirection}
            {weather?.current_weather_units.winddirection}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Weathercard