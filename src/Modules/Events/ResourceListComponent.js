import React from 'react';
import mofcLogo from '../../Assets/img/MOFC-Logo.svg';

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
    }

    React.useEffect(() => {
        if(dataToChild){
            const { foodbanks }  = dataToChild;
            let foodBankArray = foodbanks.map(foodbank => {
                return {foodbank}
            });
            setFoodBankArray(foodBankArray);
        }
    },[dataToChild]);

    return (
        <div className="search-results">
            <div className="search-list-title">{foodBankDisplay()}</div>
            {foodBankArray.map((value, index) => {
                const { foodbank: { name, address, city, state, zip, phone, display_url } } = value;
                return(
                    <div className="row align-items-center mt-2" key={index}>
                        <div className="col-lg-4 col-sm-6 search-left-box-fields">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="search-list-logo ml-auto"><img alt="Mid-Ohio Foodbank logo" src={mofcLogo}/></span>
                                <span className="font-weight-bold food-pantry-name">{name}</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 caption-text search-left-box-fields">
                            {address} {city}, {state} {zip}
                        </div>
                        <div className="col-lg-4 col-sm-6 caption-text search-left-box-fields">
                            <div className="text-underline">{phone}</div>
                            <div className="text-underline"><a href={display_url} target="_blank" rel="noopener noreferrer">{display_url}</a></div>
                        </div>
                    </div>
                )
            })  }
        </div>
    )
};
export default ResourceListComponent;

