import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RENDER_URL } from '../../Utils/Urls';

const ResourceListComponent = ({ dataToChild }) => {
  const [foodBankArray, setFoodBankArray] = React.useState([]);

  const foodBankDisplay = () => {
    switch (foodBankArray.length) {
      case 0:
        return 'No Food Banks found within the zip code';
      case 1:
        return 'Your Local Food Bank';
      default:
        return 'Your Local Food Banks';
    }
  };

  React.useEffect(() => {
    if (dataToChild) {
      const { foodbanks } = dataToChild;
      let foodBankArray = foodbanks.map(foodbank => {
        return { foodbank };
      });
      setFoodBankArray(foodBankArray);
    }
  }, [dataToChild]);

  return (
    <section className="search-results" aria-live="polite">
      <div className="search-list-title">{foodBankDisplay()}</div>
      {foodBankArray.map((value, index) => {
        const {
          foodbank: {
            name,
            address,
            city,
            state,
            zip,
            phone,
            display_url,
            logo,
            id,
          },
        } = value;
        return (
          <div key={index}>
            <div className="row align-items-center mt-2">
              <div className="col-lg-4 col-sm-6">
                <div className="d-flex align-items-center">
                  <span className="search-list-logo">
                    <img alt="logo" src={logo} />
                  </span>
                  <span className="font-weight-bold ml-2">{name}</span>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 caption-text">
                {address} {city}, {state} {zip}
              </div>
              <div className="col-lg-4 col-sm-6 caption-text">
                <div>{phone}</div>
                <div>
                  <a
                    href={display_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {display_url}
                  </a>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <LinkContainer to={`${RENDER_URL.AGENCY_EVENT_LIST}/${id}`}>
                <Button variant="link">
                  View all of our upcoming distributions
                </Button>
              </LinkContainer>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default ResourceListComponent;
