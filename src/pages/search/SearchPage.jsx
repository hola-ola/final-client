import React, { useEffect, useState } from "react";
import * as SEARCH_SERVICE from "../../services/results.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";
import useForm from "../../hooks/useForm";

export default function SearchPage(props) {
  const [results, setResults] = useState([]);

  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  useEffect(() => {
    SEARCH_SERVICE.SEARCH_LISTINGS(accessToken)
      .then((res) => {
        setResults(res.foundListings);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(results);

  return (
    <div>
      <h1>Here you will see search results</h1>
      <div>
        <h3>Search results</h3>
        {results.map((item, index) => (
          <div key={index}>
            <img src={item.imagesGallery[0]} alt={item.title} />
            <h4>{item.title}</h4>
            <h4>
              {item.city}, {item.country}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
