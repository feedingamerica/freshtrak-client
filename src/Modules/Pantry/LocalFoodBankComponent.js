import React, { useState, useEffect, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../Utils/Urls';

import { setCurrentZip } from '../../Store/Search/searchSlice';
import axios from 'axios';
import '../../Assets/scss/main.scss';

const LocalFoodBankComponent = props => {
  let [foodBankData, setFoodBankData] = useState({});
  const [ setFoodBankResponse] = useState(false);
  const [setServerError] = useState(false);
  const { zipCode } = useParams();
  const dispatch = useDispatch();
  const [setLoading] = useState(false);
  let [setSearchDetails] = useState({});

useEffect(() => {
  if (zipCode) {
    dispatch(setCurrentZip(zipCode));
    getFoodbanks(zipCode);
  }
}, [zipCode, dispatch]);

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
      <div className="local-foodbank">
        <h2 className="foodbank-name">
        {foodBankData.company}
        </h2>
        <div className="foodbank-address">
        {foodBankData.address} {foodBankData.city} {foodBankData.state} {foodBankData.zip}
        </div>
        <div className="foodbank-contact">
        Get Directions
        </div>
        <div className="foodbank-contact">
        <a href={foodBankData.display_url}>Visit Website</a>
        </div>
        <div className="foodbank-contact">
        Call {foodBankData.phone}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(LocalFoodBankComponent);
