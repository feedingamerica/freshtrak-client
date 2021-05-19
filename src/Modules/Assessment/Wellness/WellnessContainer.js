/**
 * Created by Ashik on 20/5/20.
 */
import React, {useState,useContext,useEffect} from 'react';
import { useSelector } from 'react-redux';

// import general components
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
import {API_URL} from '../../../Utils/Urls';
import axios from 'axios';
import moment from 'moment';
import { selectUser } from '../../../Store/userSlice';


const WellnessContainer = (props) => {
	// state to trigger rerender;
	// Since there is no state updation for certain pages,
	// we might have to trigger updation.
	// check handleProgress() function.
	// we use context.currPage to track currPage.
	const [currPage,setCurrPage] = useState(-1);
	const [dataLength,setDataLength] = useState(0);
	//useState
	const {closeModal} = props;
	const context = useContext(WellnessContext);
	const [progress,setProgress] = useState(0);
	const [assessmentData,setAssessmentData] = useState(null);
	const [type,setType] = useState("next");
	const currentUser = useSelector(selectUser);
	//const [user, setUser] = useState(currentUser);
	

	
    const setAssessmentQuestions = async() => {
			let assessmentUri = API_URL.QUESTIONS;
            try {
								const resp = await axios.get(assessmentUri, {
									params: { zip_code: '43219'}
								});
								
				if(resp && resp.data && 
					resp.data.data.length > 0 
					&& assessmentData == null){
						if(context.question_source_id == null || context.assessment_id == null){
							context.question_source_id = resp.data.data[0].question_source_id;
							context.assessment_id = resp.data.data[0].assessment_id;
						}
					setAssessmentData(resp.data.data)
					setDataLength(resp.data.data.length)
					if(dataLength === 0){
						for(let i =0;i<resp.data.data.length;i++){
							context.isSkipped[i] = true;
							if(resp.data.data[i].question_type === "Check Box"){
							context.answers[i]= [];
						}else {
							context.answers[i]= " ";
						}
						}
						
					}
				}
				
            } catch (err) {
            }
		};
    
	useEffect(()=>{
		setAssessmentQuestions()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	    
    useEffect(() => {		
		handleProgress(type);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[currPage]);

	const loadPage = (currPage) => {

	if(currPage === -1){
		return <BeginAssessComponent/>
	}else if(currPage === dataLength){
		return <FinishAssessComponent />
	}
	else{
				
		if(assessmentData[currPage] && assessmentData[currPage].question_type === "Enter Value"){
				return <RangeQstnComponent content={assessmentData[currPage]}/>
		}else if (assessmentData[currPage] && assessmentData[currPage].question_type === "Radio Button"){
				return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
		}else if (assessmentData[currPage] && assessmentData[currPage].question_type === "Check Box"){
				return <CheckboxQstnComponent  content={assessmentData[currPage]}/>
		}else{
				return <SelectQstnComponent content={assessmentData[currPage]}/>
		}
	}
	
	}

//handle page nos
	const handleProgress = (type) =>{
		if(currPage !== -1){
			let progress = 100/dataLength;
			if(assessmentData && assessmentData[currPage] 
				&& assessmentData[currPage].assessment_qn_id 
				&& assessmentData[currPage].is_main){
				let progression = progress * assessmentData[currPage].assessment_qn_id;
				setProgress(progression);
			}

		}
	
				
	}
	


	const handlePageTransition = (type) => {
		if(type === "next" || type === "skip"){
			setType("next")
			let page = currPage + 1;
			setCurrPage(page)
			context.isSkipped[currPage] = type === "skip" ? true : false;
			goToNextPage(page)
			
		}else{
				setType("prev")
		 	 	goToPrevPage()
		}
	}

	const handleSubmit = async()=>{
		context.previous = []
		let assessmentUri = API_URL.SUBMIT_ASSESSMENT;
		const authToken = localStorage.getItem('authToken');
		let ansArray = [];
			Object.keys(context.answers).forEach((item,index)=>{	
			let data = {
				"assment_qn_id": (index)+1,
				"is_answered": context.isSkipped[index] === true ? false : true,
				"option_id": [context.option_id[index]],
				"answer": context.isSkipped[index] === true ? "" : context.answers[index],
			};
			ansArray.push(data);
			});

		let body = {
			assessment_id : context.assessment_id,
			user_id : currentUser && currentUser.id ? currentUser.id : null,
			start_time : context.start_time,
			question_source_id : context.question_source_id,
			end_time : moment().format('YYYY-MM-DD hh:mm'),
			answers : ansArray
		}

		
    try {
    await axios({
		method: 'post',
		url: assessmentUri,
		data: body,
		headers: { Authorization: `${authToken}` }
	  });

    } catch (e) {
    } 
		
	}
		    
   

	const goToNextPage = async(currpage)=>{
		if(currpage === (assessmentData && assessmentData.length)){
			handleSubmit()
		}
		else if(currpage === 0){
			setCurrPage(0)
		}
		else{
			if(context.go_to_page[currPage] === [] || context.go_to_page[currPage] === undefined){
				setCurrPage(context.next_page[currpage-1])
			}else{
				setCurrPage(context.go_to_page[currpage-1])
			}
			
		}



	}



	const goToPrevPage = async () => {
		if(assessmentData[currPage].question_type === "Check Box"){
			context.answers[currPage] = [];
			context.option_id.splice(currPage,1);
		}else{
			context.answers[currPage] = " ";
			context.option_id.splice(currPage,1);
		}
		let index = context.previous.length-2;
		setCurrPage(context.previous[index])
		context.previous.pop()
	}
    return (  
			
  		    
<>

	<div className="modal1 assessment-modal h-100 w-100" id="assessment">
        <div className="modal-dialog h-100" role="document" style={{position: 'fixed', left:'50%', top:0, transform: 'translateX(-50%)', zIndex: 1031  }}>
						<div className={currPage === dataLength ? "modal-content h-100 bg-green" 
						: "modal-content h-100"}>
                <div className="modal-header">
										<div className="modal-title d-flex" id="assessment" 
										onClick={()=>handlePageTransition('prev')}>
                        { currPage >0 && currPage !== dataLength && 
												<span className="back-arrow"><img alt="backbutton" src={backBtn} 
												className="img-fluid" /></span>}
                       
												{currPage >0 && currPage !== dataLength &&  
												<span className="text-uppercase ml-2">Previous Question</span>
												}
                    </div>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">
                            <img alt="closebutton" src={closeBtn} className="img-fluid"  onClick={closeModal}/>
                        </span>
                    </button>
                </div>
                <div className="modal-body d-flex flex-column h-100">
                    <div className="assessment-title">
                        {currPage !== dataLength ? context.assessmentTitle : ""}
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
              {
							currPage!== dataLength &&  <div className="modal-footer">
                    <div className="d-flex flex-column align-items-center w-100">
					  {(context.answers[currPage+1] !== undefined && context.answers[currPage+1].length === false) || 
						 (context.answers[currPage+1] !== undefined && context.answers[currPage+1].length === 1) ?  
						<button className="btn w-100 btn-green pl-4 pr-4" 
					  onClick={()=>handlePageTransition('next')}>


							{currPage === -1? 'Begin Assessment' : currPage === (dataLength-1)? 'Submit' : 'Next Question' }</button> : 
							<button className="btn w-100 btn-green pl-4 pr-4" 
							onClick={()=>handlePageTransition('next')}>


								{currPage === -1? 'Begin Assessment' : currPage === (dataLength-1)? 'Submit' : 'Next Question' }</button>
							}

						{ currPage !== -1 && currPage < (dataLength-1) && <div className="mt-2 text-uppercase pointer" 
						onClick={()=>handlePageTransition('skip')}>Skip</div>}
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
