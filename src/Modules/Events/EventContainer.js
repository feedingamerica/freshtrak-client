import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import SearchComponent from '../General/SearchComponent';
import ResourceListComponent from './ResourceListComponent';
import EventListContainer from './EventListContainer';
import { API_URL } from '../../Utils/Urls';
import { setCurrentZip } from '../../Store/Search/searchSlice';
import axios from 'axios';
import '../../Assets/scss/main.scss';

const EventContainer = props => {
  const { zipCode } = useParams();
  const [foodBankResponse, setFoodBankResponse] = useState(false);
  let [foodBankData, setFoodBankData] = useState({});
  let [searchDetails, setSearchDetails] = useState({});
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (zipCode) {
      dispatch(setCurrentZip(zipCode));
      getFoodbanks(zipCode);
    }
  }, [zipCode, dispatch]);

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

  const getFoodbanks = async zip => {
    if (zip) {
      setLoading(true);
      let foodBankUri = API_URL.FOODBANK_LIST;
      setSearchDetails(zip);

      try {
        const resp = await axios.get(foodBankUri, {
          params: { zip_code: zip },
        });
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

  const onSubmit = data => {
    if (data) {
      const { zip_code } = data;
      props.history.push({
        pathname: `/events/list/${zip_code}`,
      });
    }
  };
  const localUserToken = localStorage.getItem('userToken');
  localStorage.setItem('search_zip', `${zipCode}`);

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
            {!loading && <ResourceList />}
          </div>
          { <EventListContainer zipCode={zipCode} />}
        </div>
      </section>
    </div>
  );
};

export default withRouter(EventContainer);
