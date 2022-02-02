import React, { useState } from 'react';
import useDebounce from './UseDebounce';
import './Search.css'

const SearchInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 750);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <input  
        value={displayValue}
        onChange={handleChange}
        id="search" 
        type="search" 
        className='form-control' 
    />
  );
};

export default SearchInput;
