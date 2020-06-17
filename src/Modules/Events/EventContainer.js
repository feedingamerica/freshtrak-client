import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchComponent from "../General/SearchComponent";
import ResourceListComponent from "./ResourceListComponent";
import EventListContainer from "./EventListContainer";
import { ProgressBar } from "react-bootstrap";
import { API_URL } from "../../Utils/Urls";
import axios from "axios";
import "../../Assets/scss/main.scss";

const EventContainer = props => {
  const [foodBankResponse, setFoodBankResponse] = useState(false);
  let [foodBankData, setFoodBankData] = useState({});
  let [searchDetails, setSearchDetails] = useState({});
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSearchData = !!props.location.state;
    if (isSearchData) {
      onSubmit(props.location.state.searchData);
      props.history.replace({ state: null });
    }
  });

  const ResourceList = () => {
    if (foodBankResponse) {
      return <ResourceListComponent dataToChild={foodBankData} />;
    }
    if (serverError) {
      return <h2>Something went wrong</h2>;
    }
    return null;
  };

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async payload => {
    if (payload) {
      setLoading(true);
      let foodBankUri = API_URL.FOODBANK_LIST;
      const { zip_code } = payload;

      setSearchDetails(payload);

      try {
        const resp = await axios.get(foodBankUri, { params: { zip_code } });
        const { data } = resp;
        setFoodBankData(data);
        setFoodBankResponse(true);
        setLoading(false);
      } catch (err) {
        setServerError(true);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <section className="gray-bg">
        <div className="container pt-150 pb-150">
          <div className="search-area text-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <SearchComponent register={register} errors={errors} />
            </form>
            {loading && (
              <div className="pt-4">
                <ProgressBar animated now={100} data-testid="loading" />
              </div>
            )}
            {!loading && <ResourceList />}
          </div>
          <EventListContainer searchData={searchDetails} />
        </div>
      </section>
    </div>
  );
};

export default EventContainer;
