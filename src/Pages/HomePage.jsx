import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Homepage.css";
import SearchCriteria from "../Component/PageComponent/SeacrhCriteria";
import useHttp from "../Hooks/use-Http";
import useSearch from "../Hooks/use-search";
import Filter from "../Resuablefunctions/Filter";
import Loader from "../Component/Loader";
import CardMapping from "../Component/CardMapping";

export const countryData = [];
const HomePage = () => {
  const { countryDetails, sendRequest, isLoading } = useHttp();
  const [region, setRegion] = React.useState([]);
  const navigate = useNavigate();
  const {
    searchCriteria,
    TypingState,
    error,
    SearchFilter: Filtering,
  } = useSearch();

  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const SearchFilter = (SearchData) => {
    Filtering(SearchData, countryDetails);
  };
  const onSearchHandler = () => {
    if (searchCriteria.length > 1) {
      searchCriteria.pop();
    }
    countryData.push(searchCriteria);
    navigate(`/country/${searchCriteria.flat().at(0).countryName}`);
  };
  const DataHandler = (index) => {
    Filter(countryDetails, index, countryData, navigate);
  };

  const RegionFilter = (index) => {
    Filter(region, index, countryData, navigate);
  };

  const getRegion = (region) => {
    const regionFilter = countryDetails.filter(
      (value) => value.region === region
    );
    setRegion(regionFilter);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="content-container">
      <SearchCriteria SearchedData={SearchFilter} sendRegionData={getRegion} />
      <div className="card-main-container">
        {searchCriteria.length > 0 && searchCriteria !== "" ? (
          <CardMapping clickHandler={onSearchHandler} data={searchCriteria} />
        ) : error ? (
          <h1 style={{ textAlign: "center", color: "red" }}>
            Searched Country not Found
          </h1>
        ) : region.length > 0 ? (
          <CardMapping clickHandler={RegionFilter} data={region} />
        ) : (
          !TypingState && (
            <CardMapping clickHandler={DataHandler} data={countryDetails} />
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
