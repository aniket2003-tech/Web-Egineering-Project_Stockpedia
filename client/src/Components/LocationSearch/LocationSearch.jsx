import React from "react";
import "./LocationSearch.css";

const LocationSearch = () => {
  return (
    <div className="location">
      <h2 className="green">Search Nearby E Waste Collector</h2>
      <p className="para">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi fuga
        perferendis, veritatis voluptatibus ratione officia earum laudantium!
      </p>
      <div className="location_search">
        <input
          className="search_part"
          type="text"
          placeholder="Find Your Nearest E waste Buyer . . . "
        />

        <div className="btn_part  ">
          <p>Location</p>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
