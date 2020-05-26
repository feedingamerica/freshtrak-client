/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import FoodBankTitleContainer from './FoodBankTitleContainer';
import FoodBankDataContainer from './FoodBankDataContainer';

const FoodBankContainer = () => {
    return (        
        <section>
            <div className="container pt-100 pb-100 register-confirmation">
                <FoodBankTitleContainer />
                <FoodBankDataContainer />
            </div>   
        </section>        
    )
};

export default FoodBankContainer;
