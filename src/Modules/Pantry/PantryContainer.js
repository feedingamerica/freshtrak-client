import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import SearchComponent from '../General/SearchComponent';
import LocalFoodBankComponent from '../Events/LocalFoodBankComponent';
import YourPantriesComponent from '../Events/YourPantriesComponent';
import EventNearByComponent from '../Events/EventNearByComponent';
import { API_URL } from '../../Utils/Urls';
import { setCurrentZip } from '../../Store/Search/searchSlice';
import axios from 'axios';
import '../../Assets/scss/main.scss';

const PantryContainer = props => {
  const { zipCode } = useParams();
  // const [foodBankResponse, setFoodBankResponse] = useState(false);
  // let [foodBankData, setFoodBankData] = useState({});
  let [searchDetails, setSearchDetails] = useState({});
  // const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (zipCode) {
      dispatch(setCurrentZip(zipCode));
    }
  }, [zipCode, dispatch]);

  const { register, errors, handleSubmit } = useForm();


  const onSubmit = data => {
    if (data) {
      const { zip_code } = data;
      props.history.push({
        pathname: `/home/${zip_code}`,
      });
    }
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
          <LocalFoodBankComponent />
          <YourPantriesComponent />
          <EventNearByComponent /> 
        </div>
      </section>
    </div>
  );
};

export default withRouter(PantryContainer);
