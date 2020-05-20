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
import CheckboxQstnComponent from './CheckboxQstnComponent';
import SelectQstnComponent from './SelectQstnComponent';
import FinishAssessComponent from './FinishAssessComponent';
// import progress bar bootstrap.
import ProgressBar from 'react-bootstrap/ProgressBar'
// import ContextApi
import WellnessContext from './WellnessContext';

const WellnessContainer = (props) => {
	const [currPage, setCurrPage] = useState(0);
	const [prevPage,setPrevPage] = useState(0);
	const [progress,setProgress] = useState(0);
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
			case 7 : return <SelectQstnComponent content={qstns.mainInsurance}/>
			break;
			case 8 : return <YesOrNoQstnComponent content={qstns.insuranceReferral}/>
			break;
			case 9 : return <SelectQstnComponent content={qstns.currInsurer}/>
			break;
			case 10 : return <YesOrNoQstnComponent content={qstns.doctor}/>
			break;
			case 11 : return <YesOrNoQstnComponent content={qstns.doctorReferral}/>
			break;
			case 12 : return <YesOrNoQstnComponent content={qstns.addSupport}/>
			break;
			case 13 : return <FinishAssessComponent />
			break;
			default: return;
		}
	}


	const handleProgress = () =>{
		switch(currPage){
					case 5: setProgress(40);
					break;
					case 8: setProgress(70);
					break;
					case 9: setProgress(70);
					break;
					case 11: setProgress(90);
					break;
					case 12: setProgress(90);
					break;
					default:setProgress(10*currPage)
				}
	}
	const handlePageTransition = (type) => {

		

		switch(type) {
			case 'next': goToNextPage();
						break;
			case 'prev': goToPrevPage();
						break;
		}
		

	}


	const goToNextPage = ()=>{
		if(currPage ===4 && (answers[currPage]=='no' || answers[currPage]=='')) 
			{
				setCurrPage(6);
				setPrevPage(4);
				return;
			}

		if(currPage ===7 && (answers[currPage]!== qstns.mainInsurance.options[0] || answers[currPage] === '')) 
			{
				setCurrPage(10);
				setPrevPage(7);
				return;
			}

		if(currPage ===10 && (answers[currPage]=== 'no' || answers[currPage]=== '')) 
			{
				setCurrPage(13);
				setPrevPage(10);
				return;
			}
		setCurrPage((prevState)=>prevState+1);
		setPrevPage(0);
		handleProgress();
	}

	const goToPrevPage = () => {
		if(prevPage!=0){
			setCurrPage(prevPage);
			setPrevPage(0)
			return;
		}
		setCurrPage((prevState)=>prevState-1);
		setPrevPage(0);
		handleProgress(); 
	}

    return (
		<>   
				<div style={{marginTop:'60px',padding:'100px'}}>
				{currPage > 0 && <a style={{fontSize:'1rem'}} onClick={()=>handlePageTransition('prev')}>LAST QUESTION</a>}
			
					{ currPage >0 && <ProgressBar now={progress} label={`${progress}%`} />}
						
						{loadPage()}
					{ currPage!=13 && 
						<><ButtonComponent value={currPage!=0?'Next Question' : 'Begin Assessment'} name="assess_btn" className = 'btn custom-button search-button' onClickfunction={()=>handlePageTransition('next')} />
						<div style={{textAlign:'center'}}><a>Skip</a></div>
						</>
					}
				</div>     		                   
				
		</>
    )

};

export default WellnessContainer;
