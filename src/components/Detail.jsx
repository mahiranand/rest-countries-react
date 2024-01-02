import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  console.log(data);
  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default Detail;
