/**
 * Created by Ashik on 20/5/20.
 */
import React, {useState,useContext,useEffect} from 'react';

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
import '../../../Assets/scss/main.scss';
import closeBtn from '../../../Assets/img/close.svg';
import backBtn from '../../../Assets/img/back-green.svg';
const WellnessContainer = (props) => {
	// state to trigger rerender;
	// Since there is no state updation for certain pages,
	// we might have to trigger updation.
	// check handleProgress() function.
	// we use context.currPage to track currPage.
	const [currPage, setCurrPage] = useState(0);
	
	const {closeModal} = props;
	const context = useContext(WellnessContext);
	const [progress,setProgress] = useState(context.currPage);

	let qstns = context.qstns;
	let answers = context.answers;

	const loadPage = () => {
			

		switch(context.currPage){
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

		setCurrPage(context.currPage)
		switch(context.currPage){
			case 5: return ;
			break;
			case 8: return ;
			break;
			case 9: return ;
			break;
			case 10:return  setProgress(90);
			break;
			case 11: return ;
			break;
			case 12: return ;
			break;
			case 13: return setProgress(100);
			break;
			default: return setProgress(10*context.currPage);
				}
				
	}
	const handlePageTransition = (type) => {

		

		switch(type) {
			case 'next': goToNextPage();
						break;
			case 'prev': goToPrevPage();
						break;
		}
		handleProgress();

	}


	const goToNextPage = async()=>{



		if(context.currPage ===4 && (answers[context.currPage]=='no' || answers[context.currPage]=='')) 
			{
				 context.currPage = 6 ;
				 context.prevPage = 4 ;
				return;
			}

		if(context.currPage ===7 && (answers[context.currPage]!== qstns.mainInsurance.options[0] || answers[context.currPage] === '')) 
			{
				context.currPage = 10 ;
				 context.prevPage = 7 ;
				return;
			}

		if(context.currPage ===10 && (answers[context.currPage]=== 'yes' || answers[context.currPage]=== '')) 
			{
				context.currPage = 13 ;
				 context.prevPage = 10 ;
				return;
			}
			context.currPage += 1 ;
			context.prevPage = 0 ;
			return;
	}

	const goToPrevPage = async () => {
		if(context.prevPage!=0){
			context.currPage = context.prevPage ;
				 context.prevPage = 0 ;
			return;
		}
		context.currPage -= 1 ;
			context.prevPage = 0 ;
			return;
	}

    return (  
  		    
<>

	<div className="modal1 assessment-modal h-100 w-100" id="assessment" style={{zIndex:1100,position:'absolute',top:0}}>
        <div className="modal-dialog h-100" role="document">
            <div className="modal-content bg-green h-100">
                <div className="modal-header">
                    <div className="modal-title d-flex" id="assessment" onClick={()=>handlePageTransition('prev')}>
                        <span className="back-arrow"><img src={backBtn} className="img-fluid" /></span>
                        <span className="text-uppercase ml-2">Last Question</span>
                    </div>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">
                            <img src={closeBtn} className="img-fluid"  onClick={closeModal}/>
                        </span>
                    </button>
                </div>
                <div className="modal-body d-flex flex-column h-100">
                    <div className="assessment-title">
                        Wellness Assessment
                    </div>

                  

             		<div className="assessment-content-wrap flex-grow-1">
	                    	 <div className="a-c-item h-100">
	                    	  { context.currPage >0 && <div className="progress-bar mt-2 mb-2">
                      			 <div className=""><ProgressBar now={progress} label={`${progress}%`} /></div>
			                    </div>
			                  }
			                    {loadPage()}

			                  
	                         

	                        </div>
                    </div> 
                </div>
              { context.currPage!=13 &&  <div className="modal-footer">
                    <div className="d-flex flex-column align-items-center w-100">
                      <button className="btn w-100 btn-green pl-4 pr-4" onClick={()=>handlePageTransition('next')}>{context.currPage!=0?'Next Question' : 'Begin Assessment'}</button>
                        <div className="mt-2 text-uppercase" onClick={()=>handlePageTransition('next')}>Skip</div>
                    </div>
                </div>
            }
            </div>
        </div>
    </div>               
			</>	
    )

};

export default WellnessContainer;
