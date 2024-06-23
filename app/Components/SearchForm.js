'use client'; // Add this line

import { useState, useEffect } from 'react';
import { getPokemonTypes } from '../utils/getList';
import { SEARCH, SELECT_TYPE_PLACEHOLDER } from '../Constant';

const SearchForm = ({ onFilterChange }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await getPokemonTypes();
      setTypes(types);
    };
    fetchTypes();
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onFilterChange(e.target.value, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange(selectedType, e.target.value);
  };

  return (
    <form className="mb-8 flex flex-col sm:flex-row gap-2 items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <select
        value={selectedType}
        onChange={handleTypeChange}
        className="p-2 border rounded w-full flex-grow"
      >
        <option value="">{SELECT_TYPE_PLACEHOLDER}</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded w-full flex-grow"
        placeholder={SEARCH}
      />
      <button
        type="button"
        onClick={() => onFilterChange(selectedType, searchTerm)}
        className="p-2 bg-blue-600 text-white rounded w-full sm:w-auto"
      >
        {SEARCH}
      </button>
    </form>
  );
};

export default SearchForm;
