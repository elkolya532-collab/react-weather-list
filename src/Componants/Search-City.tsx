import { useRef, useState } from "react"
import type { CityData, cityDataAPIresponse } from "../typs/cityData";

type Props = {
  handleAddcity: (city: CityData) => void
}

function SearchCity({ handleAddcity }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<CityData[]>([])
  const inputRef= useRef<HTMLInputElement>(null)

  const handlesearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const NewQueary = e.target.value
    setQuery(e.target.value)

    if (e.target.value.length < 3) {
      setResults([])
      if(inputRef.current){
        inputRef.current.value=""
      }
      return;
    }

    const fetchCitis = async () => {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${NewQueary}`
      )
      const data: cityDataAPIresponse = await response.json()
      console.log(data.results)
      setResults(data.results ?? [])
    }
    fetchCitis()
  }

  const handleAddcityclick = (city: CityData) => {
    handleAddcity({...city,updatedAt:new Date()})
    setResults([])
  }

  return (
    <div>
      <input ref={inputRef}
        value={query}
        onChange={handlesearch}
        className="w-full p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="search for a city"
      />

      {results.length > 0 && (
        <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
          {results.map((result) => (
            <div
              onClick={() => handleAddcityclick(result)}
              className="hover:bg-gray-100 cursor-pointer p-1 rounded-md"
              key={result.id}
            >
              {result.name} {result.country}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchCity