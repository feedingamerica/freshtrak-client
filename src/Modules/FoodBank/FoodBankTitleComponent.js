/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import MainHeadingComponent from '../General/MainHeadingComponent';

const FoodBankTitleComponent = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <NavigationBtnComponent />
                </div>
            </div>
            <div className="row">
                <div className="col-12">                   
                    <MainHeadingComponent text ="Foodbanks Working For a Common Cause" />
                </div>
            </div> 
        </div>
    )
};
export default FoodBankTitleComponent;
