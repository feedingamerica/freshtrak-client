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
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

const EventNearByComponent = props => {
  
  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
        Events Nearby Today
      </h2>
      <div>
        {/* <div className="events-nearby-header">
          Events Within your area.
        </div> */}
        {/* <div className="events-nearby-header">
          Events Within your area.
        </div> */}
      </div>
  <Accordion defaultActiveKey="0">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        Today Events
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
      <Card.Body> 
        <props.EventList filter="today"/>
      </Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1">
        Next Week Events
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Next Week Events Loading......</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="2">
        Next Month Events
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="2">
        <Card.Body><props.EventList /></Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
    </Fragment>
  );
};

export default withRouter(EventNearByComponent);
