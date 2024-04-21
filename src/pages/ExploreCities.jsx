import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/explore.css";

const ExploreCities = () => {
  const [exploreCity, setExploreCity] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCity = searchParams.get("city");

  useEffect(() => {
    const fetchCity = async () => {
      if (selectedCity) {
        try {
          const response = await fetch(
            `http://localhost:4000/search-place/placename?p=${selectedCity}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setExploreCity(data[0]);
            console.log(data)
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error fetching city data:", error);
        }
      }
    };

    fetchCity();
  }, [selectedCity]);

  return (
    <div className="container">
      <h1 className="exploretitle">Explore {exploreCity.Place_name}!</h1>
      <h2 className="information">{exploreCity.information}</h2>
      <div className="buttons">
        <Link to={`/search-hotels?city=${selectedCity}`}>
          <button className="search-button"> Find Hotels</button>
        </Link>
        <Link to={`/search-transportation?city=${selectedCity}`}>
          <button className="search-button"> Find Transportation</button>
        </Link>
      </div>
      <div className="image-section">
        {exploreCity.images && (
          exploreCity.images.map((image, index) => (
            <div key={index} className="image-container">
              { <img
                className="image"
                src={image.image_url}
                alt={image.image_name}
              /> }
            </div>
          ))
        )}
      </div>
    </div> 
  );
};

export default ExploreCities;
