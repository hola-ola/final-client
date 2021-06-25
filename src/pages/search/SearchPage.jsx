import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as SEARCH_SERVICE from "../../services/results.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";

import ResultCard from "../../components/ResultCard/ResultCard";
import Dropdown from "../../components/Dropdown/Dropdown";

import "./SearchPage.css";
import "../../style/Button.css";

export default function SearchPage(props) {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState({});
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

  console.log(filteredResults);
  const filteredList = results.filter((item) => {
    let relevant = true;
    for (const key in filteredResults) {
      const value = filteredResults[key];
      const exists = value.some((result) => {
        return item[key].includes(result);
      });
      if (!exists) {
        relevant = false;
      }
    }
    return relevant;
  });

  return (
    <div className="result-page-wrapper">
      <h2>
        {results.length} {results.length === 1 ? "listing" : "listings"}{" "}
        {!q ? "available" : `available in ${q}`}
      </h2>
      <div>
        <div className="filters-container">
          <Dropdown
            title="Duration"
            modelKey="lengthOfStay"
            items={AMENITIES.LENGTH_OF_STAY}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Type"
            modelKey="type"
            items={AMENITIES.LISTING_TYPE}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Guests"
            modelKey="numberOfSleepingSpots"
            items={AMENITIES.SLEEPS}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Bathroom"
            modelKey="bathroomEquipment"
            items={AMENITIES.BATHROOM_EQUIPMENT}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Kitchen"
            modelKey="kitchenEquipment"
            items={AMENITIES.KITCHEN_EQUIPMENT}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Work setup"
            modelKey="workSetup"
            items={AMENITIES.WORK_SETUP}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Accessibility"
            modelKey="accessibility"
            items={AMENITIES.ACCESSIBILITY}
            setFilteredResults={setFilteredResults}
          />
          <Dropdown
            title="Perfect for"
            modelKey="ambienceLabels"
            items={AMENITIES.AMBIENCE}
            setFilteredResults={setFilteredResults}
          />
        </div>
        {q && results.length === 0 ? (
          <div className="noresults-container">
            <p>Sorry, we haven't found any results for "{q}"</p>
            <Link to={`${PATHS.SEARCH_RESULTS}`} className="btn sandybrown">
              Check what's available in other cities
            </Link>
          </div>
        ) : null}
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
