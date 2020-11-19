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
//API CALL FOR ASSESSMENT QUESTIONS
import {ASSESSMENT_URL} from '../../../Utils/Urls';
import axios from 'axios';


const WellnessContainer = (props) => {
	// state to trigger rerender;
	// Since there is no state updation for certain pages,
	// we might have to trigger updation.
	// check handleProgress() function.
	// we use context.currPage to track currPage.
	const [currPage,setCurrPage] = useState(-1);
	//useState
	const {closeModal} = props;
	const context = useContext(WellnessContext);

	const [progress,setProgress] = useState(0);
	const [assessmentData,setAssessmentData] = useState(null);
	let answers = context.answers;
	
    const setAssessmentQuestions = async() => {
			let assessmentUri = ASSESSMENT_URL.QUESTIONS;
            try {
                const resp = await axios.get(assessmentUri);
				if(resp && resp.data && 
					resp.data.data.length > 0 
					&& assessmentData == null){
					setAssessmentData(resp.data.data)
				}
				
            } catch (err) {
				console.log("ERROR LOADING QUESTIONS",err)
            }
    };

	    
    useEffect(() => {
		setAssessmentQuestions()
    },[]);

	const loadPage = (currPage) => {
			switch(currPage){
			case -1 : return <BeginAssessComponent />
			break;
			case 0 : return <RangeQstnComponent content={assessmentData[currPage]} />
			break;
			case 1 : return <RangeQstnComponent content={assessmentData[currPage]} />
			break;
			case 2 : return <RangeQstnComponent content={assessmentData[currPage]} />
			break;
			case 3 : return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
			break;
			case 4 : return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
			break;
			case 5 : return <CheckboxQstnComponent  content={assessmentData[currPage]}/>
			break;
			case 6 : return <SelectQstnComponent content={assessmentData[currPage]}/>
			break;
			case 7 : return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
			break;
			case 8 : return <SelectQstnComponent content={assessmentData[currPage]}/>
			break;
			case 9 : return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
			break;
			case 10 : return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
			break;
			case 11 : return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
			break;
			case 12 : return <CheckboxQstnComponent content={assessmentData[currPage]}/>
			break;
			case 13 : return <CheckboxQstnComponent content={assessmentData[currPage]}/>
			break;
			case 14 : return <FinishAssessComponent />
			break;
			default: return;
		}
	
	}

//handle page nos
	const handleProgress = () =>{
		console.log("answers are >>",answers)
		switch(currPage){
			case -1: return setProgress(1);
			break;
			case 0: return setProgress(11);	//1
			break;
			case 1: return setProgress(22);	//2
			break;
			case 2: return setProgress(33);	//3
			break;
			case 3: return setProgress(44);	//4
			break;
			case 4: return setProgress(44);	//4
			break;
			case 5: return setProgress(55);	//5
			break;
			case 6: return setProgress(66);	//6
			break;
			case 7: return setProgress(66);	//6
			break;
			case 8: return setProgress(66);	//6
			break;
			case 9: return setProgress(77);	//7
			break;
			case 10:return  setProgress(77);	//7
			break;
			case 11: return setProgress(77);	//7
			break;
			case 12: return setProgress(88);	//8
			break;
			case 13: return setProgress(100);	//9
			break;
			default: return setProgress(10*currPage);
				}
				
	}


	const handleBackProgress = (page)=>{
		setProgress(page)
	}
	const handlePageTransition = (type) => {

		if(type == "next"){
			setCurrPage(currPage+1)
			goToNextPage()
			
		}else{
			setCurrPage(currPage-1)
			goToPrevPage()
		}
	
		//handleProgress();

	}

	const handleSubmit = ()=>{
		console.log("submit fn called")

		Object.keys(context.answers).map((item,index )=>{
		console.log(`context.answers`+`${[index]}`,context.answers[index])
		});
	}
		    
   

	const goToNextPage = async()=>{
		if(currPage==13){
			handleSubmit()
		}
		if(currPage==3 && 
			(context.answers[currPage]=='no' ||
			context.answers[currPage]=='')) {
				setCurrPage(5)

		}
		if(currPage ==6 && 
			(context.answers[currPage]!== assessmentData[currPage].option[0] ||
				context.answers[currPage] === '')){
				setCurrPage(9)

				}

		if(currPage ===9 && 
			(context.answers[currPage]=== 'yes' ||
			context.answers[currPage]=== '')){
				setCurrPage(12)
						}
		handleProgress();
	}

	const goToPrevPage = async () => {

		if(currPage ===5){
				setCurrPage(3)
				handleBackProgress(44)
						}

		else if(currPage ===9){
				setCurrPage(6)
				handleBackProgress(66)
						}

		else if(currPage ===12){
				setCurrPage(9)
				handleBackProgress(77)
						}
						else{
							console.log("calling handler for page >>",currPage)
							handleProgress()
						}
			//handleProgress()
	}

    return (  
  		    
<>

	<div className="modal1 assessment-modal h-100 w-100" id="assessment" style={{zIndex:1100,position:'absolute',top:0}}>
        <div className="modal-dialog h-100" role="document">
            <div className={currPage == 14 ? "modal-content h-100 bg-green" : "modal-content h-100"}>
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
                        {currPage !== 14 ? "Wellness Assessment" : ""}
                    </div>

                  

             		<div className="assessment-content-wrap flex-grow-1">
	                    	 <div className="a-c-item h-100">
	                    	  { currPage >=0 && <div className="progress-bar mt-2 mb-2">
                      			 <div className=""><ProgressBar now={progress} label={`${progress}%`} /></div>
			                    </div>
			                  }
			                    {loadPage(currPage)}

			                  
	                         

	                        </div>
                    </div> 
                </div>
              { currPage!=14 &&  <div className="modal-footer">
                    <div className="d-flex flex-column align-items-center w-100">
					  <button className="btn w-100 btn-green pl-4 pr-4" 
					  onClick={()=>handlePageTransition('next')}>
						  {currPage == -1? 'Begin Assessment' : currPage == 13? 'Submit' : 'Next Question' }</button>

						<div className="mt-2 text-uppercase pointer" 
						onClick={()=>handlePageTransition('next')}>Skip</div>
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
