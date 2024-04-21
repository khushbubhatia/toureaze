

import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../styles/search-transportation.css";
import axios from 'axios';
import TransportationPopup from "../components/TransportationPopup";

const SearchTransportation = () => {
  const [exploreCity, setExploreCity] = useState({});
  const [transportationData, setTransportationData] = useState([]);
  const [departureCities, setDepartureCities] = useState([
    'San Francisco',
    'San Diego',
    "Chicago",
    'Indianapolis',
    'Los Angeles',
    'Las Vegas',
    'New York City',
  ]); 
  const [departureCity, setDepartureCity] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const destinationCity = searchParams.get("city");
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [travelModeId, setTravelModeId] = useState("");

  useEffect(() => {
    const fetchDestinationCity = async () => {
      if (destinationCity) {
        try {
          const response = await fetch(
            `http://localhost:4000/search-place/placename?p=${destinationCity}`,
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
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error fetching city data:", error);
        }
      }
    };

    fetchDestinationCity();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!userId && storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, [destinationCity, userId]);

  const handleDepartureCityChange = (event) => {
    const selectedCity = event.target.value;
    setDepartureCity(selectedCity);
    setShowPopup(false);
  };

  const handleResultClick = (item) => {
    setSelectedTransportation(item);
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const handlePopupSubmit = async ({ numTravelers, departureDate, returnDate }) => {
    console.log("Submitted Data:", { numTravelers, departureDate, returnDate });
    try {
      const response = await axios.post("http://localhost:4000/api/submititinerary", {
        num_travelers: numTravelers,
        departure_date: departureDate,
        return_date: returnDate,
        from_place: departureCity,
        uid: travelModeId,
        uid_user: userId
      });
      console.log(response);
    } catch(error) {
      console.error("Error posting to travel itinerary:", error);
    }
  };


    const fetchTransportationData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/search-mode/travelmode?city=${destinationCity}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransportationData(data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching transportation data:", error);
      }
    };


  const filteredTransportationData = useCallback(() => {
    if (departureCity && transportationData.length > 0) {
      return transportationData.filter((item) => item.from_place === departureCity);
    }
    return [];
  }, [departureCity, transportationData]);

  return (
    <div className="transportation-container">
      <div className="body1">
      <div className="input-container">
        <div className="departureCitySelect">
          <label htmlFor="departureCitySelect">Departure City:</label>
          <select id="departureCitySelect" value={departureCity} onChange={handleDepartureCityChange}>
            <option value="">Select Departure City</option>
            {departureCities.filter((city) => city !== destinationCity).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>  
      </div> 
      
      <button className="search-button" onClick={() => fetchTransportationData()}>
        Show Results
      </button>
      <div className="transportation-list">
        {filteredTransportationData().map((item) => (
          <div key={item._id} className="transportation-item" onClick={() => handleResultClick(item)}>
          <p><b>Type of Transportation:</b> {item.mode}</p>
          <p><b>Departure City:</b> {item.from_place}</p>
          <p><b>Arrival City:</b> {item.to_place}</p>
          <p><b>Price:</b> ${item.fare}</p>
          <p><b>Dropoff Location:</b> {item.arrival}</p>
          <p><b>Duration:</b> {item.duration}</p>
          <p><b>Bus/Flight Number:</b> {item.vehicle_number}</p>
          
          <p><b>Airline/Bus Co.:</b> {item.name}</p>
          <button style={{display: 'block', margin: '0 auto'}} className="search-button" onClick={() => handleResultClick(item)}>
            Book
          </button>
        </div>
         ))}
       </div>
       <div className="popup">
       {showPopup && selectedTransportation && (
  <TransportationPopup selectedTransportation={selectedTransportation}
  onClose={handleClosePopup}
  onSubmit={handlePopupSubmit}
  />
  
)}
</div>
</div>
     </div>
   );
 };
 
 export default SearchTransportation;