import React, { useState, useEffect, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../Utils/Urls';
import SpinnerComponent from '../General/SpinnerComponent';
import { setCurrentZip } from '../../Store/Search/searchSlice';
import axios from 'axios';
import '../../Assets/scss/main.scss';

const LocalFoodBankComponent = props => {
  let [foodBankData, setFoodBankData] = useState({});
  const [ foodBankResponse, setFoodBankResponse] = useState(false);
  const [serverError, setServerError] = useState(false);
  // const { zipCode } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let [searchDetails, setSearchDetails] = useState({});

useEffect(() => {
  const zipCode = localStorage.getItem("zip_code")
  if (zipCode) {
    dispatch(setCurrentZip(zipCode));
    getFoodbanks(zipCode);
  }
}, [dispatch]);

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
        setFoodBankData(data?.foodbanks?.[0]||{});
        setFoodBankResponse(true);
        setLoading(false);
      } catch (err) {
        setServerError(true);
        setLoading(false);
      }
    }
  };
  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
              Your Local Food Bank
      </h2>
      {Object.keys(foodBankData).length === 0 ? <SpinnerComponent/>: 
       <div className="row align-items-center mt-2">
          <div className="col-lg-4 col-sm-6">
            <div className="d-flex align-items-center">
              <span className="search-list-logo">
                <img alt="logo" src={foodBankData.logo} />
              </span>
              <span className="font-weight-bold ml-2">{foodBankData.name}</span>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 caption-text">
            {foodBankData.address} {foodBankData.city}, {foodBankData.state} {foodBankData.zip}
          </div>
          <div className="col-lg-4 col-sm-6 caption-text">
            <div>{foodBankData.phone}</div>
            <div className="link-wrap">
              <a
                href={foodBankData.display_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {foodBankData.display_url}
              </a>
            </div>
          </div>
        </div>
  }
  </Fragment>
  );
};

export default withRouter(LocalFoodBankComponent);
