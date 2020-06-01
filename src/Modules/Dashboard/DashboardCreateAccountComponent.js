import React from 'react';
import BoxComponent from '../General/BoxComponent';
// import ButtonComponent from '../General/ButtonComponent';
import CalenderIcon from '../../Assets/img/calendar.svg';
// import PreRegisteredIcon from '../../Assets/img/pre-register.svg';
import FindFoodIcon from '../../Assets/img/findfood.svg';
// import { RENDER_URL } from '../../Utils/Urls';
import '../../Assets/scss/main.scss';
const DashboardCreateAccountComponent = () => {
  return (
    <div>
      <h2 className="mb-5 font-weight-bold mobile-text-left text-center">
        FreshTrak is here to help!
      </h2>
      <div className="row text-center justify-content-between">
        <BoxComponent
          title="Stay Up to Date"
          content="Make a FreshTrak account to stay up to date on local food access events."
          imageUrl={CalenderIcon}
          className="stay-up-to-date"
        />
        {/* Out of scope */}
        {/* <BoxComponent
          title="Pre-Register"
          content="Make a FreshTrak account to stay up to date on local food access events."
          imageUrl={PreRegisteredIcon}
          className="pre-register"
        /> */}
        <BoxComponent
          title="Find Food"
          content="Enter your zip code and get connected to food access resources in your community."
          imageUrl={FindFoodIcon}
          className="find-food"
        />
      </div>
      {/* Out of scope */}
      {/* <div className="row mt-5 text-center">
        <div className="col-12">
          <ButtonComponent
            type="button"
            name="createAnAccount"
            dataid=""
            id="search-resource"
            value="Create an Account"
            className="btn custom-button"
          />
        </div>
      </div> */}
    </div>
  );
};

export default DashboardCreateAccountComponent;
