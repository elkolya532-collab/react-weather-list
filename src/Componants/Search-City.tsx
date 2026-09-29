import { useState } from "react"
import type { CityData, cityDataAPIresponse } from "../typs/cityData"
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa"

type Props = {
  handleAddcity: (city: CityData) => void
}

function SearchCity({ handleAddcity }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<CityData[]>([])
  const [loading, setLoading] = useState(false)

  const handlesearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const NewQueary = e.target.value
    setQuery(e.target.value)

    if (e.target.value.length < 3) {
      setResults([])
      return
    }

    setLoading(true)
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${NewQueary}`
    )
    const data: cityDataAPIresponse = await response.json()
    setResults(data.results ?? [])
    setLoading(false)
  }

  const handleAddcityclick = (city: CityData) => {
    handleAddcity(city)
    setResults([])
    setQuery("")
  }

  return (
    <div className="relative z-50">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={handlesearch}
          className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
          type="text"
          placeholder="Search for a city..."
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 text-sm">
            Loading...
          </span>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-col gap-1 z-50 shadow-2xl shadow-black/50 max-h-72 overflow-y-auto">
          {results.map((result) => (
            <div
              onClick={() => handleAddcityclick(result)}
              className="flex justify-between items-center hover:bg-slate-800 cursor-pointer p-3 rounded-xl text-slate-200 transition"
              key={result.id}
            >
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-sky-400 text-sm" />
                <span className="font-medium">{result.name}</span>
              </div>
              <span className="text-slate-500 text-xs">{result.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchCity