import React, { useState } from 'react';
import axios from 'axios';
import './ListYourProperty.css';

function ListYourProperty() {
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setPropertyDetails({ ...propertyDetails, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', propertyDetails.title);
    formData.append('description', propertyDetails.description);
    if (propertyDetails.image) {
      formData.append('image', propertyDetails.image);
    }

    try {
    const response = await fetch('http://localhost:1026/api/property', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result.message); // Success
    } else {
      console.error(result.message); // Handle error
    }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the property.');
  }
  };

  return (
    <div className="list-your-property-container">
      <h1>List Your Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Property Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={propertyDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Property Description</label>
          <textarea
            name="description"
            id="description"
            value={propertyDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Property Image</label>
          <input 
            type="file" 
            name="image" 
            id="image" 
            onChange={handleImageUpload} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default ListYourProperty;
