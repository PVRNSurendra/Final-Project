import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/properties?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{color:"blue",fontSize:"50px"}}>Find Your Home</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ padding: '10px', marginRight: '10px' , backgroundColor:"white",width:"500px",fontSize:"20px",color:"black"}}
      />
      <br /><br />
      <button onClick={handleSearch} style={{ padding: '10px 20px' }}>Search</button>
    </div>
  );
}

export default SearchPage;
