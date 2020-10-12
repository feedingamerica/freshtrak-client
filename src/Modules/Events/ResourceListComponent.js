import React from 'react';
// import { Button } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { RENDER_URL } from '../../Utils/Urls';
import { useSelector } from 'react-redux';
import { selectZip } from '../../Store/Search/searchSlice';
import FoodbankTextComponent from '../General/FoodbankTextComponent';

const ResourceListComponent = ({ dataToChild }) => {
  const [foodBankArray, setFoodBankArray] = React.useState([]);
  const searchedZip = useSelector(selectZip);

  const foodBankDisplay = () => {
    switch (foodBankArray.length) {
      case 0:
        return 'No Food Banks found within the zip code';
      case 1:
        return `Food bank serving zip code [${searchedZip}]`;
      default:
        return `Food banks serving zip code [${searchedZip}]`;
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
            // id,
            foodbank_texts,
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
                <div className="link-wrap">
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
            <ul className="list-group">
              {foodbank_texts.map((value, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    <FoodbankTextComponent
                      text={value.text}
                      imageUrl={value.image_resource}
                      LinkUrl={value.link_href}
                      linkText={value.link_text}
                    />
                  </li>
                );
              })}
            </ul>
            {/* Out of Scope
          <div className="row mt-2">
              <LinkContainer to={`${RENDER_URL.AGENCY_EVENT_LIST}/${id}`}>
                <Button variant="link">
                  View all of our upcoming distributions
                </Button>
              </LinkContainer>
            </div> */}
          </div>
        );
      })}
    </section>
  );
};
export default ResourceListComponent;
