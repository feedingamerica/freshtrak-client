import React, { useState, useEffect, Fragment } from 'react';
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

const LocalFoodBankComponent = props => {
  

  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
              Your Local Food Bank
      </h2>
      <div className="local-foodbank">
        <h2 className="foodbank-name">
        Mid-Ohio Foodbank
        </h2>
        <div className="foodbank-address">
        3960 Brookham Dr Grove City, OH 43123
        </div>
        <div className="foodbank-contact">
        Get Directions
        </div>
        <div className="foodbank-contact">
        Visit website
        </div>
        <div className="foodbank-contact">
        Call(614) 277-3663
        </div>
        </div>
    </Fragment>
  );
};

export default withRouter(LocalFoodBankComponent);
