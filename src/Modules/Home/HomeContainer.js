import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import SearchComponent from '../General/SearchComponent';
import SpinnerComponent from '../General/SpinnerComponent';
import LocalFoodBankComponent from '../Home/LocalFoodBankComponent';
// import YourPantriesComponent from '../Home/YourPantriesComponent';
import EventNearByComponent from '../Home/EventNearByComponent';
import { API_URL, RENDER_URL } from '../../Utils/Urls';
import { setCurrentZip } from '../../Store/Search/searchSlice';
import axios from 'axios';
import '../../Assets/scss/main.scss';
import EventListComponent from '../Events/EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';
import moment from 'moment';

const HomeContainer = props => {
  const [agencyResponse, setAgencyResponse] = useState(false);
  const [agencyData, setAgencyData] = useState({});
  const [zipCode, setZipCode] = useState(localStorage.getItem("zip_code"));
  let [searchDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (zipCode) {
      getEvents(zipCode);
      dispatch(setCurrentZip(zipCode));
    }
  }, [zipCode, dispatch]);

  const getEvents = async zip => {
    if (zip) {
      setLoading(true);
      try {
        const resp = await axios.get(API_URL.EVENTS_LIST, {
          params: { zip_code: zip },
        });

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

  const { register, errors, handleSubmit } = useForm();


  const onSubmit = data => {
    if (data) {
      const { zip_code } = data;
      localStorage.setItem("zip_code", zip_code)
      // props.history.push({
      //   pathname: `/home`,
      // });
      setZipCode(zip_code)
    }
  };

  // const EventList = () => {
  //   if (agencyResponse) {
  //     const agencyDataSorted = EventHandler(agencyData);
  //     return <EventListComponent events={agencyDataSorted} zipCode={zipCode} />;
  //   }
  //   return null;
  // };

  const EventList = (props) => {
    const filterEvents = (eventList) => {
      if (props.filter === "today"){
        const todayDate = moment(new Date()).format("YYYY-MM-DD");
        return { [todayDate]: eventList[todayDate]}
      }
      if (props.filter === "week"){
        const todayDate = moment(new Date()).format("YYYY-MM-DD");
        const thisWeek = moment().day(1 + 7).format("YYYY-MM-DD");
        const entries = Object.entries(eventList)
        const weekevents = entries.reduce((acc, item) => {
          if(item[0] > todayDate && item[0] <= thisWeek){
            acc[item[0]] = item[1];
          }
          return acc;
        }, {})
        return weekevents;
      }
      // const entries = Object.entries(eventList)
      return eventList;
    }
    if (agencyResponse) {
      let agencyDataSorted = EventHandler(agencyData);
      agencyDataSorted = filterEvents(agencyDataSorted);
      // return <EventListComponent events={agencyDataSorted} zipCode={zipCode} showHeader= {false}/>;
      return <EventListComponent targetUrl={RENDER_URL.REGISTRATION_EVENT_DETAILS_URL} events={agencyDataSorted} zipCode={zipCode} showHeader= {false} />;
    }
    return <SpinnerComponent variant = "small" />;
  };

  return (
    <div>
      <section className="gray-bg">
        <div className="container pt-150 pb-150">
          <div className="search-area text-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <SearchComponent
                register={register}
                errors={errors}
                onSubmitHandler={onSubmit}
                searchData={searchDetails}
              />
            </form>
            {loading && (
              <div className="pt-4">
                <ProgressBar animated now={100} data-testid="loading" />
              </div>
            )}
          </div>
          <div className="foodbank-and-events">
            <LocalFoodBankComponent />
            {/* <RegisteredEventsComponents /> */}
            <EventNearByComponent EventList= {EventList}/> 
          </div>
          {/* {!loading && <EventList />} */}
        </div>
      </section>
    </div>
  );
};

export default withRouter(HomeContainer);
          