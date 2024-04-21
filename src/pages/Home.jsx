// import React, { useState, useEffect } from "react";
// import "../styles/home.css";
// import { Container } from "reactstrap";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const navigate = useNavigate();

//   const handleCitySelection = (city) => {
//     fetch(`http://localhost:4000/search-place/placename?p=${city}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           navigate(`/explore?city=${encodeURIComponent(city)}`);
//         } else {
//           throw new Error("Network response was not ok");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching city details:", error);
//       });
//   };
    
//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       setNoResults(false);

//       const response = await fetch(
//         `http://localhost:4000/search/autocomplete?q=${searchInput}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data);
//         if (data.length === 0) {
//           setNoResults(true); 
//         }
//       } else {
//         throw new Error("Network response was not ok");
//       }
//     };

//     if (searchInput) {
//       fetchSearchResults();
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchInput]);

//   const handleChange = (e) => {
//     e.preventDefault();
//     setSearchInput(e.target.value);
//   };

//   return (
//     <Container>
//       <h1 className="title">Start Traveling with Ease!!</h1>
//       <div className="centered">
//         <input
//           className="searchBar"
//           type="text"
//           placeholder="Search"
//           onChange={handleChange}
//           value={searchInput}
//         />
//       </div>
//       <div className="results centered">
//         {noResults ? (
//           <p>No results found</p>
//         ) : (
//           <ul className="autocomplete">
//             {searchResults.map((places, index) => (
//               <li key={index}>
//                 <a
//                   className="link-style"
//                   onClick={() => handleCitySelection(places.place_name)}
//                 >
//                   {places.place_name} {places.state}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import part2icon1 from "../assets/images/part2icon1.png";
import part2icon2 from "../assets/images/part2icon2.png";
import part2icon3 from "../assets/images/part2icon3.png";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const handleCitySelection = (city) => {
    fetch(`http://localhost:4000/search-place/placename?p=${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/explore?city=${encodeURIComponent(city)}`);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error fetching city details:", error);
      });
  };
    
  useEffect(() => {
    const fetchSearchResults = async () => {
      setNoResults(false);

      const response = await fetch(
        `http://localhost:4000/search/autocomplete?q=${searchInput}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setSearchResults(data);
        if (data.length === 0) {
          setNoResults(true); 
        }
      } else {
        throw new Error("Network response was not ok");
      }
    };

    if (searchInput) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <Container className="part-1">
      <h1 className="title">Start Traveling with Ease!!</h1>
      <div className="centered">
        <input
          className="searchBar"
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div className="results centered">
        {noResults ? (
          <p>No results found</p>
        ) : (
          <ul className="autocomplete">
            {searchResults.map((places, index) => (
              <li key={index}>
                <a
                  className="link-style"
                  onClick={() => handleCitySelection(places.Place_name)}
                >
                  {places.Place_name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Container className="part-2">
      <p className="heading" > We Provide Best Travel Experience</p>
      <p>Your gateway to amazing destinations!</p>
      <section className="boxs">
          <div className="box">
            <p className="subheading">
              <span > 
            <img className="icon1" src={part2icon1} />
            </span><br/>
            Select Destination<a href=""></a></p>
            <p className="p">At first choose the place you wanted to go.</p>
          </div>
          <div className="box">
            <p className="subheading" ><span > 
            <img className="icon1" src={part2icon2} />
            </span><br/>
            Book a Trip</p>
            <p className="p">Book your tip form our exclusive offers.</p>
          </div>
         <div className="box">
            <p className="subheading" >
            <span > 
            <img className="icon1" src={part2icon3} />
            </span><br/>
            Take your flight</p>
            <p className="p">Take your flight on selected date and joy.</p>
          </div>
        </section>
      </Container>
      {/* <section className="part-3 " >
                    <div className="place-info">
                      <h3>New York</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptatum, quasi, quibusdam.
                      </p>
                    </div>
                    <div className="place-info">
                      <h3>China</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptatum, quasi, quibusdam.
                      </p>
                    </div>
                <div className="place-info">
                      <h3>Japan</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptatum, quasi, quibusdam.
                      </p>
                    </div>


        </section> */}

    </Container>
  );
};

export default Home;
