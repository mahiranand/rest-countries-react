import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Options } from "./Options";
import { PulseLoader } from "react-spinners";
import { Dropdown } from "./Dropdown";

export const Body = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("");
  const [subRegion, setSubregion] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((dataOfCountry) => {
        setData(dataOfCountry);
      });
  }, []);

  const handler = (e) => {
    setSubregion("");
    return setRegion(e.target.value);
  };
  const regionArr = Object.keys(
    data.reduce((acc, cv) => {
      if (!acc[cv.region]) {
        acc[cv.region] = 1;
      }
      return acc;
    }, {})
  );

  const subRegionsObj = data.reduce(
    (acc, cv) => {
      if (!acc[cv.region]) {
        acc[cv.region] = {};
      }
      if (cv.subregion != undefined && !acc[cv.region][cv.subregion]) {
        acc[cv.region][cv.subregion] = 1;
      }
      return acc;
    },
    { "": [] }
  );

  for (let key in subRegionsObj) {
    subRegionsObj[key] = Object.keys(subRegionsObj[key]);
  }

  const filterdCountry = data.filter((country) => {
    if (
      country.name.common.toLowerCase().includes(input.toLowerCase().trim()) &&
      country.region.includes(region) &&
      (subRegion == "" ||
        (country.subregion != undefined &&
          country.subregion.includes(subRegion)))
    ) {
      return true;
    }
    return false;
  });

  if (sort == "pa") {
    filterdCountry.sort((a, b) => a.population - b.population);
  } else if (sort == "pd") {
    filterdCountry.sort((a, b) => b.population - a.population);
  } else if (sort == "aa") {
    filterdCountry.sort((a, b) => a.area - b.area);
  } else if (sort == "ad") {
    filterdCountry.sort((a, b) => b.area - a.area);
  }

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
        <Dropdown
          set={setSort}
          data={{
            name: "sort",
            className: "region",
            optionsText: [
              "Sort",
              "Population (Ascending)",
              "Population (Descending)",
              "Area (Ascending)",
              "Area (Descending)",
            ],
            optionsValue: ["", "pa", "pd", "aa", "ad"],
          }}
        />

        <div className="dropdown">
          <select name="region" className="region" onChange={handler}>
            <option value="">Filter by Region</option>
            {regionArr.map((item, index) => (
              <Options region={item} key={index} />
            ))}
          </select>
        </div>
        <Dropdown
          set={setSubregion}
          data={{
            name: "subregion",
            className: "region",
            optionsText: ["Filter By Subregion", ...subRegionsObj[region]],
            optionsValue: ["", ...subRegionsObj[region]],
          }}
        />
      </div>
      <div className="cards-container">
        <ul className="cards">
          {data.length == 0 ? (
            <div className="notFound">
              <PulseLoader color="black" />
            </div>
          ) : filterdCountry.length == 0 ? (
            <div className="notFound" id="noCountry">
              Country not Found
            </div>
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
