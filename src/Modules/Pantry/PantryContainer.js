import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import SearchComponent from '../General/SearchComponent';
import LocalFoodBankComponent from '../Pantry/LocalFoodBankComponent';
import YourPantriesComponent from '../Pantry/YourPantriesComponent';
import EventNearByComponent from '../Pantry/EventNearByComponent';
import { setCurrentZip } from '../../Store/Search/searchSlice';
import '../../Assets/scss/main.scss';
import EventListComponent from '../Events/EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';
import axios from 'axios';
import { API_URL } from '../../Utils/Urls';
import '../../Assets/scss/main.scss';


const PantryContainer = props => {
  const [agencyResponse, setAgencyResponse] = useState(false);
  const [agencyData, setAgencyData] = useState({});
  const [zipCode, setZipCode] = useState(localStorage.getItem("zip_code"));
  // const { zipCode } = useParams();
  let [searchDetails, setSearchDetails] = useState({});
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

  const EventList = () => {
    if (agencyResponse) {
      const agencyDataSorted = EventHandler(agencyData);
      return <EventListComponent events={agencyDataSorted} zipCode={zipCode} />;
    }
    return null;
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
            <EventNearByComponent /> 
          </div>
          {!loading && <EventList />}
        </div>
      </section>
    </div>
  );
};

export default withRouter(PantryContainer);
          