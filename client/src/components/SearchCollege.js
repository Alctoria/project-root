import React, { useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

const SearchCollege = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const { searchPlaces } = useGoogleMaps();

  const handleSearch = async () => {
    const results = await searchPlaces(query);
    if (results.length > 0) {
      onSelect(results[0]);
    }
  };

  return (
    <div className="search-college">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your college"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchCollege;