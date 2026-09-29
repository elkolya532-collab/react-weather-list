type current_weather={
    time: "2025-12-10T16:45",
    interval: 900,
    temperature: 11.6,
    windspeed: 13.6,
    winddirection: 233,
    is_day: 0,
    weathercode: 2
}



type CurrentWeatherUnits={
    time: "iso8601",
      interval: "seconds",
      temperature: "°C",
      windspeed: "km/h",
      winddirection: "°",
      is_day: "",
      weathercode: "wmo code"
}




export type WeatherDataAPIResponse = {
    latitude: 51.5,
    longitude: -0.120000124,
    generationtime_ms: 0.0624656677246094,
    utc_offset_seconds: 0,
    timezone: "GMT",
    timezone_abbreviation: "GMT",
    elevation: 23,
    current_weather_units:CurrentWeatherUnits
  
    current_weather:current_weather  
}
