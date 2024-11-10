import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import h1Image from './assets/h1.jpg';
import house2Image from './assets/house2.jpg';
import houseImage from './assets/houseimage.jpg';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

function FeaturedListing({ id, title, price, imageUrl }) {
  return (
    <div className="featured-listing">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{formatPrice(price)}/month</p> 
      <Link to={`/listing/${id}`} className="view-listing">View Listing</Link>
    </div>
  );
}

function HomePage() {
  const featuredListings = [
    { id: 1, title: "Luxurious Beach House", price: 12450, imageUrl: h1Image },
    { id: 2, title: "Cozy Mountain Cabin", price: 24900, imageUrl: house2Image },
    { id: 3, title: "Modern City Apartment", price: 16600, imageUrl: houseImage },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Find Your Perfect Home</h1>
        <p>Discover amazing rental properties in your area</p>
        <Link to="/search" className="cta-button">Start Searching</Link>
      </section>
      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="listings-grid">
          {featuredListings.map((listing) => (
            <FeaturedListing key={listing.id} {...listing} />
          ))}
        </div>
      </section>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Search</h3>
            <p>Browse our extensive list of properties.</p>
          </div>
          <div className="step">
            <h3>2. Book</h3>
            <p>Reserve your perfect rental with ease.</p>
          </div>
          <div className="step">
            <h3>3. Enjoy</h3>
            <p>Relax and enjoy your home away from home.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
