/**
 * Created by Ashik on 20/5/20.
 */
import React, {useState} from 'react';

// import general components
import ButtonComponent from '../../General/ButtonComponent';
// import all pages.
import BeginAssessComponent from './BeginAssessComponent';
import MealsQstnComponent from './MealsQstnComponent';
import MonthlyIncomeQstnComponent from './MonthlyIncomeQstnComponent';
import AnnualIncomeQstnComponent from './AnnualIncomeQstnComponent';
// import progress bar bootstrap.
import ProgressBar from 'react-bootstrap/ProgressBar'
// import ContextApi
import {WellnessProvider} from './WellnessContext';

const WellnessContainer = (props) => {
	const [currPage, setCurrPage] = useState(0);

	const loadPage = () => {

		

		switch(currPage){
			case 0 : return <BeginAssessComponent />
			break;
			case 1 : return <MealsQstnComponent />
			break;
			case 2 : return <MonthlyIncomeQstnComponent />
			break;
			case 3 : return <AnnualIncomeQstnComponent />
			break;
			case 4 : return <MonthlyIncomeQstnComponent />
			break;
			case 5 : return <MonthlyIncomeQstnComponent />
			break;
			case 6 : return <MonthlyIncomeQstnComponent />
			break;
			case 7 : return <MonthlyIncomeQstnComponent />
			break;
			case 8 : return <MonthlyIncomeQstnComponent />
			break;
			case 9 : return <MonthlyIncomeQstnComponent />
			break;
			case 10 : return <MonthlyIncomeQstnComponent />
			break;
			case 11 : return <MonthlyIncomeQstnComponent />
			break;
			default: return;
		}
	}

	const handlePageTransition = (type) => {

		switch(type) {
			case 'next': if(currPage ===10) return;
						setCurrPage((currPage)=>currPage+1);
						loadPage();
						break;
			case 'prev': if(currPage ===1) return;
						setCurrPage((currPage)=>currPage-1);
						loadPage();
						break;
		}
		

	}

    return (
		<>   
				<div style={{marginTop:'60px',padding:'100px'}}>
				{currPage > 0 && <a style={{fontSize:'1rem'}} onClick={()=>handlePageTransition('prev')}>LAST QUESTION</a>}
			
					{ currPage >0 && <ProgressBar now={10*currPage} label={`${10*currPage}%`} />}
						
						{loadPage()}
					<ButtonComponent value={currPage!=0?'Next Question' : 'Begin Assessment'} name="assess_btn" className = 'btn custom-button search-button' onClickfunction={()=>handlePageTransition('next')} />
					<div style={{textAlign:'center'}}><a>Skip</a></div>
				</div>     		                   
				
		</>
    )

};

export default WellnessContainer;
