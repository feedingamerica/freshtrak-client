/**
 * Created by Ashik on 20/5/20.
 */
import React, {useState,useContext} from 'react';

// import general components
import ButtonComponent from '../../General/ButtonComponent';
// import all pages.
import BeginAssessComponent from './BeginAssessComponent';
import RangeQstnComponent from './RangeQstnComponent';
import YesOrNoQstnComponent from './YesOrNoQstnComponent';
import CheckboxQstnComponent from './CheckboxQstnComponent'
// import progress bar bootstrap.
import ProgressBar from 'react-bootstrap/ProgressBar'
// import ContextApi
import WellnessContext from './WellnessContext';

const WellnessContainer = (props) => {
	const [currPage, setCurrPage] = useState(0);
	const wellnessContext = useContext(WellnessContext);
	let qstns = wellnessContext.qstns;
	let answers = wellnessContext.answers;
	const loadPage = () => {

		

		switch(currPage){
			case 0 : return <BeginAssessComponent />
			break;
			case 1 : return <RangeQstnComponent content={qstns.meals} />
			break;
			case 2 : return <RangeQstnComponent content={qstns.monthlyIncome} />
			break;
			case 3 : return <RangeQstnComponent content={qstns.annualIncome} />
			break;
			case 4 : return <YesOrNoQstnComponent content={qstns.covid}/>
			break;
			case 5 : return <YesOrNoQstnComponent content={qstns.jobExpect}/>
			break;
			case 6 : return <CheckboxQstnComponent  content={qstns.moneySources}/>
			break;
			case 7 : return <YesOrNoQstnComponent content={qstns.jobExpect}/>
			break;
			case 8 : return <YesOrNoQstnComponent content={qstns.jobExpect}/>
			break;
			case 9 : return <YesOrNoQstnComponent content={qstns.jobExpect}/>
			break;
			case 10 : return <YesOrNoQstnComponent content={qstns.jobExpect}/>
			break;
			case 11 : return <YesOrNoQstnComponent content={qstns.jobExpect}/>
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
