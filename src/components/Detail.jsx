import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Detail = () => {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState({});
  const [datafetch, setDatafetch] = useState("");

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDatafetch("loaded");
        return setData(res[0]);
      })
      .catch(() => setDatafetch("error"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let currencyArr = [];

  if (data.currencies) {
    currencyArr = Object.keys(data.currencies).map((code, i) => {
      if (i == 0) {
        return data.currencies[code].name;
      }
      return `, ${data.currencies[code].name}`;
    });
  }

  let languageArr = [];

  if (data.languages) {
    languageArr = Object.keys(data.languages).map((code, i) => {
      if (i == 0) {
        return data.languages[code];
      }
      return `, ${data.languages[code]}`;
    });
  }

  return datafetch == "loaded" ? (
    <div className="detail-container">
      <div className="backBtn">
        <Link to="/">
          <button>
            <span>&larr;</span> &nbsp;Back
          </button>
        </Link>
      </div>
      <div className="img-details">
        <div className="img-large">
          <img src={data.flags.png} alt="" />
        </div>
        <div className="more-details">
          <h1>{data.name.common}</h1>
          <div className="more-about">
            <div>
              <p>
                <b>Native Name: </b>
                <span>
                  {
                    data.name.nativeName[Object.keys(data.name.nativeName)[0]]
                      .common
                  }
                </span>
              </p>
              <p>
                <b>Population: </b>
                <span>{data.population.toLocaleString()}</span>
              </p>
              <p>
                <b>Region: </b>
                <span>{data.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span>{data.subregion}</span>
              </p>
              <p id="capital">
                <b>Capital: </b>
                <span>{data.capital}</span>
              </p>
            </div>
            <div>
              <p>
                <b>Top Level Domain: </b>
                <span>{data.tld}</span>
              </p>
              <p>
                <b>Currencies: </b>
                <span>{currencyArr}</span>
              </p>
              <p id="language">
                <b>Languages: </b>
                <span>{languageArr}</span>
              </p>
            </div>
          </div>
          <div className="Borders">
            <div>
              <div id="border-heading">
                <b>Border Countries: </b>
              </div>
              <div className="borders-name">
                {data.borders ? (
                  data.borders.map((border, i) => <span key={i}>{border}</span>)
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : datafetch == "error" ? (
    <h1>Error Occured</h1>
  ) : (
    <div className="notFound">
      <PulseLoader color="black" />
    </div>
  );
};

export default Detail;
