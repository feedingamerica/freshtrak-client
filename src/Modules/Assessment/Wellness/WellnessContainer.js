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
	//let response = context.response;
	const [progress,setProgress] = useState(0);
	//console.log("progress is >>",progress)
	const [assessmentData,setAssessmentData] = useState(null);
	

	
    const setAssessmentQuestions = async() => {
			let assessmentUri = RENDER_URL.QUESTIONS;
            try {
                const resp = await axios.get(assessmentUri);
				if(resp && resp.data && 
					resp.data.data.length > 0 
					&& assessmentData == null){
						console.log("resp data is>>",resp.data.data)
					setAssessmentData(resp.data.data)
					setDataLength(resp.data.data.length)
					if(dataLength ==0){
						for(let i =0;i<resp.data.data.length;i++){
							console.log("setting answers aarray as null")
							if(resp.data.data[i].question_type == "Check Box"){
							context.answers[i]= [];
						}else {
							context.answers[i]= " ";
						}
						}
					}
				}
				
            } catch (err) {
				//console.log("ERROR LOADING QUESTIONS",err)
            }
		};

	    
    useEffect(() => {
		//console.log("currPage in useeffect is >>",currPage)
		setAssessmentQuestions()
		handleProgress();

		},[currPage]);

		// useEffect(()=>{
		// 	context.go_to_page[currPage] = 0;
		// },[])

	const loadPage = (currPage) => {
			switch(currPage){
			case -1 : return <BeginAssessComponent/>
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
		switch(currPage){
			case -1: return setProgress(0);
			break;
			case 0: return setProgress(11.1);	//1
			break;
			case 1: return setProgress(22.22);	//2
			break;
			case 2: return setProgress(33.33);	//3
			break;
			case 3: return setProgress(44.44);	//4
			break;
			case 4: return setProgress(44.44);	//4
			break;
			case 5: return setProgress(55.55);	//5
			break;
			case 6: return setProgress(66.66);	//6
			break;
			case 7: return setProgress(66.66);	//6
			break;
			case 8: return setProgress(66.66);	//6
			break;
			case 9: return setProgress(77.77);	//7
			break;
			case 10:return  setProgress(77.77);	//7
			break;
			case 11: return setProgress(77.77);	//7
			break;
			case 12: return setProgress(88.88);	//8
			break;
			case 13: return setProgress(100);	//9
			break;
			default: return setProgress(10*currPage);
				}
				
	}


	const handlePageTransition = (type) => {
		if(type == "next"){
			//console.log("type of currPage in handlePageTransition >>",typeof(currPage))
			let page = currPage + 1;
			setCurrPage(page)
			//console.log("current page in type == next")
			goToNextPage(page)
			
		}
		else{
			let page = currPage - 1;
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
				"is_answered": context.answers[index] == "" ? false : true,
				"option_id": context.option_id[index],
				"answer": context.answers[index],
			};
			ansArray.push(data);
			});

		let body = {
			assessment_id : 1,
			user_id : "dummyUserID",
			start_time : context.start_time,
			end_time : moment().format('YYYY-MM-DD hh:mm'),
			answers : ansArray
		}

		
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
		// console.log("currpage is >>",currpage)
		// console.log("currPage is >>",currPage)
		// console.log("assessmentData is >>",assessmentData.length)
		if(currpage == assessmentData.length){
		console.log("currpage == assessmentData-1")
			handleSubmit()
		}
		else if(currpage == 0){
			//context.go_to_page[currpage]
			setCurrPage(0)
		}
		else{
			//debugger
			//console.log("currpage in else is >>",currpage)
			//console.log("context.gotopage of currpage -1 is >>",context.go_to_page[currpage -1])


			if(context.go_to_page[currPage] == [] || context.go_to_page[currPage] == undefined){
				//console.log("context.gotopage IF CHECK >>",context.go_to_page[currpage-1])
				setCurrPage(context.next_page[currpage-1])
			}else{
				setCurrPage(context.go_to_page[currpage-1])
			}
			
		}





		// if(currPage==3 && 
		// 	(context.answers[currPage]=='no' ||
		// 	context.answers[currPage]=='') ) {
		// 		console.log("inside condion, setting currpage to 5")
		// 		//console.log("type is ",type)
		// 		setCurrPage(5)
		// 		//handleProgress();
		// }

		// if(currPage == 6 && 
		// 	(context.answers[currPage] == assessmentData[currPage].option[0] ||
		// 		context.answers[currPage] === '') ){
		// 		//	console.log("none/uninsured selected going to qstn 7")
				
		// 		setCurrPage(7)
		// 		//handleProgress();
		// 		}


		// if(currPage ==6 && 
		// 	(context.answers[currPage] == assessmentData[currPage].option[1] ||
		// 		context.answers[currPage] === '') ){
		// 	//	console.log("medicaid selected going to qstn 8")
				
		// 		setCurrPage(8)
		// 		//handleProgress();
		// 		}

		// if(currPage == 6 && 
		// 	(context.answers[currPage]!== assessmentData[currPage].option[0] && 
		// 		context.answers[currPage]!== assessmentData[currPage].option[1] ||
		// 		context.answers[currPage] === '') ){
		// 		//	console.log("otheroption selected going to qstn 9")
				
		// 		setCurrPage(9)
		// 		//handleProgress();
		// 		}


		// if(currPage ==7 && 
		// 	(context.answers[currPage] == 'yes' || context.answers[currPage] === 'no' ||
		// 		context.answers[currPage] === '') ){
		// 	//	console.log("yes/no selected going to qstn 9")
			
		// 		setCurrPage(9)
		// 	//	handleProgress(); 
		// 		}

		// if(currPage ===9 && 
		// 	(context.answers[currPage]=== 'yes' ||
		// 	context.answers[currPage]=== '')){
				
		// 		setCurrPage(12)
		// 		//handleProgress();
		// 				}
	}



	const goToPrevPage = async (currpage) => {
		setCurrPage(context.previous_page[currPage])
		//handleProgress();
		//console.log("GOING TO >>",currPage)
		//console.log("previous_page to go  >>",context.previous_page[currPage-1])
		//setCurrPage(context.previous_page[currpage-1])
		// if(currpage === 5){
		// 		setCurrPage(3)
		// 		//handleProgress();
		// 				}

		// if(currpage === 9 || 
		// 	currpage === 8 || 
		// 	currpage === 7){
		// 		setCurrPage(6)
		// 		//handleProgress();
		// 				}

		// if(currpage ===12){
		// 		setCurrPage(9)
		// 		//handleProgress();
		// 				}
			handleProgress();
	}
	//console.log("context.answers is >>",context.answers)
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
              { currPage!=14 &&  <div className="modal-footer">
                    <div className="d-flex flex-column align-items-center w-100">
					  {context.answers[currPage+1] == "" || context.answers[currPage+1] !== undefined ? <button className="btn w-100 btn-green pl-4 pr-4" 
					  onClick={()=>handlePageTransition('next')}>
						{/* <button className="btn w-100 btn-green pl-4 pr-4" 
					  onClick={()=>frontAction()}> */}
							{currPage == -1? 'Begin Assessment' : currPage == 13? 'Submit' : 'Next Question' }</button> : 
							<button className="btn w-100 btn-green pl-4 pr-4" 
							onClick={()=>handlePageTransition('next')}>
							{/* <button className="btn w-100 btn-green pl-4 pr-4" 
							onClick={()=>frontAction()}> */}
								{currPage == -1? 'Begin Assessment' : currPage == 13? 'Submit' : 'Next Question' }</button>
							}

						{ currPage !== -1 && currPage !== 13 && <div className="mt-2 text-uppercase pointer" 
						onClick={()=>handlePageTransition('skip')}>Skip</div>}
						{/* { currPage !== -1 && currPage !== 13 && <div className="mt-2 text-uppercase pointer" 
						onClick={()=>frontAction()}>Skip</div>} */}
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
