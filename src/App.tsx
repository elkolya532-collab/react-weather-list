import { useEffect, useState } from "react"
import Header from "./Componants/Header"
import SearchCity from "./Componants/Search-City"
import type { CityData } from "./typs/cityData"
import Weathercard from "./Componants/Weathercard"

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
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <Header />
        <SearchCity handleAddcity={handleAddcity} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Weathercard
              key={city.id}
              city={city}
              handleRemovecity={handleRemovecity}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App