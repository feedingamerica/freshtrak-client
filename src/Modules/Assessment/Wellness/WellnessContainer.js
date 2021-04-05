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
import {RENDER_URL} from '../../../Utils/Urls';
import axios from 'axios';
import moment from 'moment';


const WellnessContainer = (props) => {
	// state to trigger rerender;
	// Since there is no state updation for certain pages,
	// we might have to trigger updation.
	// check handleProgress() function.
	// we use context.currPage to track currPage.
	const [currPage,setCurrPage] = useState(-1);
	const [startTime,setStartTime] = useState(null);
	const [endTime,setEndTime] = useState(null);
	const [dataLength,setDataLength] = useState(0);
	//useState
	const {closeModal} = props;
	const context = useContext(WellnessContext);
	let answers = context.answers;
	const [progress,setProgress] = useState(0);
	const [totalMainQstns,setTotalMainQstns] = useState(0);
	const [assessmentData,setAssessmentData] = useState(null);
	const [type,setType] = useState("next");
	

	
    const setAssessmentQuestions = async() => {
			let assessmentUri = RENDER_URL.QUESTIONS;
            try {
                const resp = await axios.get(assessmentUri);
				if(resp && resp.data && 
					resp.data.data.length > 0 
					&& assessmentData == null){
						context.total_questions = resp.data.data.length;
					setAssessmentData(resp.data.data)
					setDataLength(resp.data.data.length)
					if(dataLength == 0){
						let num = 0;
						for(let i =0;i<resp.data.data.length;i++){
							context.isSkipped[i] = true;
							if(resp.data.data[i].is_main){
								num = num+1;
							}
							if(resp.data.data[i].question_type == "Check Box"){
							context.answers[i]= [];
						}else {
							context.answers[i]= " ";
						}
						}
						setTotalMainQstns(num)
					}
				}
				
            } catch (err) {
            }
		};

	    
    useEffect(() => {
		setAssessmentQuestions()
		handleProgress(type);

		},[currPage]);

		// useEffect(()=>{
		// 	context.go_to_page[currPage] = 0;
		// },[])

	const loadPage = (currPage) => {
	// 	if(currPage == -1){
	// 		return <BeginAssessComponent/>
	// 	}else{
					
	// 		if(assessmentData[currPage] && assessmentData[currPage].question_type == "Enter Value"){
	// 				return <RangeQstnComponent content={assessmentData[currPage]}/>
	// 		}else if (assessmentData[currPage] && assessmentData[currPage].question_type == "Radio Button"){
	// 				return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
	// 		}else if (assessmentData[currPage] && assessmentData[currPage].question_type == "Check Box"){
	// 				return <CheckboxQstnComponent  content={assessmentData[currPage]}/>
	// 		}else if (assessmentData[currPage] && assessmentData[currPage].question_type == "Select Box"){
	// 				return <SelectQstnComponent content={assessmentData[currPage]}/>
	// 		}else{
	// 				return <FinishAssessComponent />
	// 		}
	// }




	if(currPage == -1){
		return <BeginAssessComponent/>
	}else if(currPage == dataLength){
		return <FinishAssessComponent />
	}
	else{
				
		if(assessmentData[currPage] && assessmentData[currPage].question_type == "Enter Value"){
				return <RangeQstnComponent content={assessmentData[currPage]}/>
		}else if (assessmentData[currPage] && assessmentData[currPage].question_type == "Radio Button"){
				return <YesOrNoQstnComponent content={assessmentData[currPage]}/>
		}else if (assessmentData[currPage] && assessmentData[currPage].question_type == "Check Box"){
				return <CheckboxQstnComponent  content={assessmentData[currPage]}/>
		}else{
				return <SelectQstnComponent content={assessmentData[currPage]}/>
		}
}
	
	}

//handle page nos
	const handleProgress = (type) =>{
		if(currPage !== -1 && assessmentData[currPage] && assessmentData[currPage].is_main){
			let progression = 100/(totalMainQstns);
			if(type == "prev"){
				setProgress(progress-progression);
			}else{
				setProgress(progress+progression);
			}
			
		}

		// switch(currPage){
		// 	case -1: return setProgress(0);
		// 	break;
		
				
	}
	


	const handlePageTransition = (type) => {
		if(type == "next" || type == "skip"){
			setType("next")
			let page = currPage + 1;
			setCurrPage(page)
			context.isSkipped[currPage] = type == "skip" ? true : false;
			goToNextPage(page)
			
		}else{
			let page = currPage - 1;
				setType("prev")
		 	  setCurrPage(page)
		 	 	goToPrevPage(page)
				
		}
	}

	const handleSubmit = async()=>{
		let assessmentUri = RENDER_URL.SUBMIT_ASSESSMENT;
		const userToken = localStorage.getItem('userToken');
		let ansArray = [];
		Object.keys(context.answers).map((item,index )=>{	
			let data = {
				"assment_qn_id": index,
				//"is_answered": context.answers[index] == "" ? false : true,
				"is_answered": context.isSkipped[index] == true ? false : true,
				"option_id": context.option_id[index],
				"answer": context.isSkipped[index] == true ? "" : context.answers[index],
			};
			ansArray.push(data);
			});

		let body = {
			assessment_id : 1,
			user_id : "dummyUserID",
			start_time : context.start_time,
			question_source_id : 1,
			end_time : moment().format('YYYY-MM-DD hh:mm'),
			answers : ansArray
		}
		console.log("skipped array is >>",context.isSkipped)

		
    // try {
    //   const resp = await axios({
		// method: 'post',
		// url: assessmentUri,
		// data: body,
		// headers: { 'Content-Type': 'application/json' }
	  // });

    // } catch (e) {
    // } 
		
		console.log("body is >>",body)
	}
		    
   

	const goToNextPage = async(currpage)=>{
		if(currpage == assessmentData.length){
			handleSubmit()
		}
		else if(currpage == 0){
			setCurrPage(0)
		}
		else{
			if(context.go_to_page[currPage] == [] || context.go_to_page[currPage] == undefined){
				setCurrPage(context.next_page[currpage-1])
			}else{
				setCurrPage(context.go_to_page[currpage-1])
			}
			
		}



	}



	const goToPrevPage = async (currpage) => {
		setCurrPage(context.previous_page[currPage])
	
			//handleProgress("prev");
	}
    return (  
			
  		    
<>

	<div className="modal1 assessment-modal h-100 w-100" id="assessment" 
	style={{zIndex:1100,position:'absolute',top:0}}>
        <div className="modal-dialog h-100" role="document">
						<div className={currPage == dataLength ? "modal-content h-100 bg-green" 
						: "modal-content h-100"}>
                <div className="modal-header">
										<div className="modal-title d-flex" id="assessment" 
										onClick={()=>handlePageTransition('prev')}>
										{/* <div className="modal-title d-flex" id="assessment" onClick={()=>backAction()}> */}
                        { currPage >0 && currPage !== dataLength && 
												<span className="back-arrow"><img src={backBtn} 
												className="img-fluid" /></span>}
                       
												{currPage >0 && currPage !== dataLength &&  
												<span className="text-uppercase ml-2">Previous Question</span>}
												{/* <span className="text-uppercase ml-2">{currPage}</span> */}
                    </div>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">
                            <img src={closeBtn} className="img-fluid"  onClick={closeModal}/>
                        </span>
                    </button>
                </div>
                <div className="modal-body d-flex flex-column h-100">
                    <div className="assessment-title">
                        {currPage !== dataLength ? context.assessmentTitle : ""}
                    </div>
										{/* replaced 14 with dataLength */}

                  

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
              { currPage!= dataLength &&  <div className="modal-footer">
                    <div className="d-flex flex-column align-items-center w-100">
					  {context.answers[currPage+1] == "" || context.answers[currPage+1] == " " || context.answers[currPage+1] !== undefined ? <button className="btn w-100 btn-green pl-4 pr-4" 
					  onClick={()=>handlePageTransition('next')}>


							{currPage == -1? 'Begin Assessment' : currPage == (dataLength-1)? 'Submit' : 'Next Question' }</button> : 
							<button className="btn w-100 btn-green pl-4 pr-4" 
							onClick={()=>handlePageTransition('next')}>


								{currPage == -1? 'Begin Assessment' : currPage == (dataLength-1)? 'Submit' : 'Next Question' }</button>
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
