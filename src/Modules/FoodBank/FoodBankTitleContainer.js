/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
/*import MainHeadingComponent from '../General/MainHeadingComponent';*/

const FoodBankTitleContainer = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <NavigationBtnComponent />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                   <div className="title-wrap">
                            <h1 className="big-title mt-5 mb-5 mobile-mb">
                                Foodbanks Working For a Common Cause
                            </h1>
                    </div>
                    {/*<MainHeadingComponent text ="Foodbanks Working For a Common Cause" />*/}
                </div>
            </div> 
        </div>
    )
};
export default FoodBankTitleContainer;
