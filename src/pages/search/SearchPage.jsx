import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as SEARCH_SERVICE from "../../services/results.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

import ResultCard from "../../components/ResultCard/ResultCard";

import "./SearchPage.css";
import "../../style/Button.css";

export default function SearchPage(props) {
  const [results, setResults] = useState([]);
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  const params = new URLSearchParams(props.location.search);
  const q = params.get("q");

  useEffect(() => {
    SEARCH_SERVICE.SEARCH_LISTINGS(accessToken)
      .then((res) => {
        if (q) {
          const resultsFromSearch = res.foundListings.filter(function (result) {
            return result.city === q || result.country === q;
          });
          setResults(resultsFromSearch);
        } else {
          setResults(res.foundListings);
        }
      })
      .catch((err) => console.log(err));
  }, [q]);

  return (
    <div className="result-page-wrapper">
      <h2>
        {results.length} {results.length === 1 ? "listing" : "listings"}{" "}
        {!q ? "available" : `available in ${q}`}
      </h2>
      <div>
        {q && results.length === 0 ? (
          <div>
            <p>Sorry, we haven't found any results for "{q}"</p>
            <Link to={`${PATHS.SEARCH_RESULTS}`} className="btn sandybrown">
              Check what's available in other cities
            </Link>
          </div>
        ) : null}
        <div className="filters-container">
          <div>
            <h4>Type</h4>
            <p>House</p>
            <p>Flat</p>
            <p>Room</p>
          </div>
        </div>

        <div className="results-container">
          {results.map((item, index) => (
            <ResultCard item={item} key={index}>
              More info
            </ResultCard>
          ))}
        </div>
      </div>
    </div>
  );
}
