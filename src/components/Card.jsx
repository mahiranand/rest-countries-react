// eslint-disable-next-line react/prop-types
export const Card = ({ name, population, capital, image, region }) => {
  return (
    <li className="card">
      <img src={image} alt="" />
      <div className="about-data">
        <h1>{name}</h1>
        <div className="info-data">
          <p id="population">
            <b>Population: </b>
            {population.toLocaleString()}
          </p>
          <p id="region">
            <b>Region: </b>
            {region}
          </p>
          <p id="capital">
            <b>Capital: </b>
            {capital}
          </p>
        </div>
      </div>
    </li>
  );
};
