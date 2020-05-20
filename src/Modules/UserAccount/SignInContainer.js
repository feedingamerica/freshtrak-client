/**
 * Created by Basil on 6/1/20.
 */
import React from 'react';
import DashboardCreateAccountComponent from '../Dashboard/DashboardCreateAccountComponent';
import DashBoardFoodBankComponent from '../Dashboard/DashBoardFoodBankComponent';
import SignInComponent from './SignInComponent';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import '../../Assets/scss/main.scss';
const SigInContainer = (props) => {
    return (
		<React.Fragment>
			<section>
				<div className="container pt-100 pb-100 register-confirmation">
					<NavigationBtnComponent />
					<SignInComponent />	        		                   
					<DashboardCreateAccountComponent />
				</div>
			</section>
			<section className="gray-bg">            	
				<DashBoardFoodBankComponent/>
			</section>			
			
		</React.Fragment>
    )

};

export default SigInContainer;
