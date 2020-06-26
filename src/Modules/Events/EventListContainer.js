import React, { useState, useEffect, Fragment } from "react";
import EventListComponent from "./EventListComponent";
import { EventHandler } from "../../Utils/EventHandler";
import { API_URL } from "../../Utils/Urls";
import SpinnerComponent from "../General/SpinnerComponent";
import axios from "axios";

const EventListContainer = ({ searchData }) => {
  const [agencyResponse, setAgencyResponse] = useState(false);
  const [agencyData, setAgencyData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isSearchData = !!searchData.zip_code;
    const buildSearchData = data => {
      if (Object.keys(data)[0]) {
        handleSubmit(data);
      }
    };

    if (isSearchData) {
      buildSearchData(searchData);
    }
  }, [searchData]);

  const handleSubmit = async payload => {
    if (payload) {
      setLoading(true);
      const { zip_code, lat, long } = payload;
      try {
        const resp =
          lat !== ""
            ? await axios.get(API_URL.EVENTS_LIST, {
                params: { zip_code, lat, long },
                headers: { Accept: "application/json" },
              })
            : await axios.get(API_URL.EVENTS_LIST, { params: { zip_code } });

        const {
          data: { agencies },
        } = resp;
        setAgencyData(agencies);
        setAgencyResponse(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const EventList = () => {
    if (agencyResponse) {
      const agencyDataSorted = EventHandler(agencyData);
      return <EventListComponent events={agencyDataSorted} />;
    }
    return null;
  };

  return (
    <Fragment>
      {!loading && <EventList />}
      {loading && <SpinnerComponent />}
    </Fragment>
  );
};

export default EventListContainer;
