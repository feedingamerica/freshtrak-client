/**
 * Created by Basil on 6/1/20.
 */
import React from 'react';
import DashboardCreateAccountComponent from '../Dashboard/DashboardCreateAccountComponent';
import DashBoardFoodBankComponent from '../Dashboard/DashBoardFoodBankComponent';
import SignInComponent from './SignInComponent';
const SigInContainer = (props) => {
    return (
		<React.Fragment>
			<section>
				<div className="container pt-100 pb-100 register-confirmation">
					<div className="sign-in-wrapper">
						<SignInComponent />	
					</div>        		                   
					<div className="mt-5">						
                		<h2 className="mb-5 font-weight-bold mobile-text-left text-center">Haven’t Registered Yet?</h2>
                		<DashboardCreateAccountComponent />
					</div>
				</div>
			</section>
			<section className="gray-bg">            	
				<DashBoardFoodBankComponent/>
			</section>
		</React.Fragment>
    )

};

export default SigInContainer;
