"use client";
import { useState, useEffect } from "react";

interface CitySearchProps {
  location: string;
  onLocationSelect: (selectedLocation: string) => void;
}

const CitySearch = ({ location, onLocationSelect }: CitySearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([
    {
      place_id: "",
      description: "",
    },
  ]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const getData = async () => {
    //const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${API_KEY}`;
    await fetch(`/api/places?query=${query}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResults(data.predictions);
        console.log("response " + data.predictions);
      })
      .catch((error) => {
        console.error("Error fetching data from Google Places API", error);
      });
  };

  useEffect(() => {
    if (query.length > 0) {
      setIsDropdownVisible(true);
      getData();
    } else {
      setResults([]);
      setIsDropdownVisible(false);
    }
  }, [query]);

  const handleLocationSelect = (selectedLocation: string) => {
    const str = selectedLocation.split(",");
    setQuery(str[0] + str[1]);
    onLocationSelect(str[0] + str[1]);
    setIsDropdownVisible(false); // Hide the dropdown after selection
  };

  return (
    <div className="city-search">
      <input
        className="city-search-input"
        type="text"
        placeholder="Search for a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isDropdownVisible && (
        <ul>
          {results ? (
            results.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleLocationSelect(result.description)}
              >
                {result.description}
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
