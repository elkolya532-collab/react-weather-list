import { useEffect, useState } from "react"
import Header from "./Componants/Header"
import SearchCity from "./Componants/Search-City"
import type { CityData } from "./typs/cityData"
import Weathercard from "./Componants/Weathercard"
import { FaMapMarkedAlt } from "react-icons/fa"

function App() {
  const [cities, setCities] = useState<CityData[]>([])

  const handleAddcity = (city: CityData) => {
    setCities(prev => [...prev, city])
  }

  const handleRemovecity = (id: number) => {
    setCities(prev => prev.filter(c => c.id !== id))
  }

  const TouchCitis = () => {
    setCities(prev => prev.map(city => ({ ...city })))
  }

  useEffect(() => {
    const intreval = setInterval(() => {
      TouchCitis()
    }, 5000)
    return () => clearInterval(intreval)
  }, [cities])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <Header />
        <SearchCity handleAddcity={handleAddcity} />

        {cities.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <FaMapMarkedAlt className="text-6xl text-slate-700" />
            <p className="text-slate-400 text-lg">
              Search for a city to see its weather
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => (
              <Weathercard
                key={city.id}
                city={city}
                handleRemovecity={handleRemovecity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App