import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["localRoaster", "packagedBean"];
const roastingLevels = [
  "light",
  "cinnamon",
  "medium",
  "high",
  "city",
  "fullCity",
  "french",
  "italian",
];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "localRoaster",
    city: "",
    roasting: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type === "localRoaster" ? "Local Roaster" : "Packaged Bean"}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <select
          name="roasting"
          onChange={handleChange}

          defaultValue=""
        >
            <option value="" disabled>
              Roasting
            </option>
          {roastingLevels.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
        <Link
          to={`/list?type=${query.type}&city=${query.city}&roasting=${query.roasting}`}
        >
          <button type="button">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
