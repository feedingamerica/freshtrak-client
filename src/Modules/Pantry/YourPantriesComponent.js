import React, { useState, useEffect, Fragment } from 'react';
// import { useForm } from 'react-hook-form';
import { useParams, withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { ProgressBar } from 'react-bootstrap';
// import SearchComponent from '../General/SearchComponent';
// import ResourceListComponent from './ResourceListComponent';
// import EventListContainer from './EventListContainer';
// import { API_URL } from '../../Utils/Urls';
// import { setCurrentZip } from '../../Store/Search/searchSlice';
// import axios from 'axios';
import '../../Assets/scss/main.scss';

const YourPantriesComponent = props => {
  

  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
        Your Pantries
      </h2>
      <div className="yourpantries-name">
        Once you visted a pantry.Your Pantries will populate here!.Explore the events below to get started!
      </div>
    </Fragment>
  );
};

export default withRouter(YourPantriesComponent);
