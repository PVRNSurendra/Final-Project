// src/components/PropertyCard.jsx
import React from 'react';

const PropertyCard = ({ image, description, rentPerMonth, location }) => {
  return (
    <div className="property-card" style={{fontFamily:"Times New Roman",textAlign:"center"}}>
      <img src={image} alt={description} />
      <h3>{description}</h3>
      <p style={{justifyContent:"center", fontFamily:"Times New Roman", fontWeight:"bold"}}>Rent per month:</p> ${rentPerMonth}
      <p style={{justifyContent:"center", fontFamily:"Times New Roman", fontWeight:"bold"}}>Location: </p>{location}
    </div>
  );
};

export default PropertyCard;
