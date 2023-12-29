import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Options } from "./Options";
import { PulseLoader } from "react-spinners";

export const Body = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((dataOfCountry) => {
        setData(dataOfCountry);
      });
  }, []);

  const regionArr = Object.keys(
    data.reduce((acc, cv) => {
      if (!acc[cv.region]) {
        acc[cv.region] = 1;
      }
      return acc;
    }, {})
  );

  const filterdCountry = data.filter((country) => {
    if (
      country.name.common.toLowerCase().includes(input.toLowerCase()) &&
      country.region.includes(region)
    ) {
      return true;
    }
    return false;
  });

  return (
    <>
      <div className="container-search">
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            name="country"
            id="searchCountry"
            placeholder="Search for a country..."
            onKeyUp={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <select
            name="region"
            className="region"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Filter by Region</option>
            {regionArr.map((item, index) => (
              <Options region={item} key={index} />
            ))}
          </select>
        </div>
      </div>
      <div className="cards-container">
        <ul className="cards">
          {data.length == 0 ? (
            <div className="notFound">
              <PulseLoader color="black" />
            </div>
          ) : filterdCountry.length == 0 ? (
            <div className="notFound" id = "noCountry">Country not Found</div>
          ) : (
            filterdCountry.map((country, i) => (
              <Card
                name={country.name.common}
                population={country.population}
                capital={country.capital}
                image={country.flags.png}
                region={country.region}
                key={i}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
