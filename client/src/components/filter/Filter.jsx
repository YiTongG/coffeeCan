import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    roasting: searchParams.get("roasting") || "",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city") || "all city"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">city</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="city located"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="localRoaster">Local Roaster</option>
            <option value="packagedBean">Packaged Bean</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="roasting">Roasting Level</label>
          <select
            name="roasting"
            id="roasting"
            onChange={handleChange}
            defaultValue={query.roasting}
          >
            <option value="">any</option>
            <option value="light">Light</option>
            <option value="cinnamon">Cinnamon</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="city">City</option>
            <option value="fullCity">Full City</option>
            <option value="french">French</option>
            <option value="italian">Italian</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
