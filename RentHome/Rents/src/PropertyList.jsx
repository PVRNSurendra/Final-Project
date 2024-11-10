// src/components/PropertyList.jsx
import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { useLocation } from 'react-router-dom';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationFilter = searchParams.get('location');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/properties.json');
        const data = await response.json();
        const filteredProperties = data.filter(
          (property) => property.location.toLowerCase() === locationFilter.toLowerCase()
        );
        setProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [locationFilter]);

  return (
    <div className="property-list">
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))
      ) : (
        <p>No properties found for this location.</p>
      )}
    </div>
  );
};

export default PropertyList;
