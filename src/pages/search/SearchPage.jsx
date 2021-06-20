import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
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
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const [filterDropdown, setFilterDropdown] = useState(false);

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
            <Dropdown title="Duration" items={AMENITIES.LENGTH_OF_STAY} />
            <div className="filter-label">
              <p>Duration</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.LENGTH_OF_STAY.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Type</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.LISTING_TYPE.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Guests</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.SLEEPS.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Bathroom</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.BATHROOM_EQUIPMENT.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Kitchen</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.KITCHEN_EQUIPMENT.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Work from home</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.WORK_SETUP.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Accessibility</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.ACCESSIBILITY.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="filter-label">
              <p>Perfect for</p>
              {filterDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div>
              {AMENITIES.AMBIENCE.map((item, index) => (
                <p>{item}</p>
              ))}
            </div>
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
