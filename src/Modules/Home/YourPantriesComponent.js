import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
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
