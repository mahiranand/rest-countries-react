import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Card = ({ name, population, capital, image, region, id }) => {
  return (
    <Link to={`country/${id}`}>
      <li className="card">
        <img src={image} alt="" />
        <div className="about-data">
          <h1>{name}</h1>
          <div className="info-data">
            <p id="population">
              <b>Population: </b>
              <span>{population.toLocaleString()}</span>
            </p>
            <p id="region">
              <b>Region: </b>
              <span>{region}</span>
            </p>
            <p id="capital">
              <b>Capital: </b>
              <span>{capital}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};
