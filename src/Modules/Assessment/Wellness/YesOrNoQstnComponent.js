
import React,{useContext, useEffect,useState} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const YesOrNoQstnComponent = (props) => {
let {question,assessment_qn_id,go_to_page,option_id,previous_page,next_page} = props.content;
let context = useContext(WellnessContext);
const [selected,setSelected] = useState(null); 
const setValue = (e) =>{
//Object.keys(context.answers).map((value,index)=>{
    //if(value == assessment_qn_id-1) {
        context.answers[assessment_qn_id-1] = e.target.value;
        console.log("context.answers[value] >>",context.answers[assessment_qn_id-1])
        setSelected(e.target.value)
        if(e.target.value == "yes"){
             
            context.option_id[assessment_qn_id-1] = option_id[0];
            context.go_to_page[assessment_qn_id-1] = (go_to_page[0])-1;
            console.log("go_to_page true | yes case>>",context.go_to_page[assessment_qn_id-1])
            // console.log("value is >>",value)
            // console.log("assessment_qn_id-1 is >>",assessment_qn_id-1)
        }
        else{
            context.option_id[assessment_qn_id-1] = option_id[1];
            context.go_to_page[assessment_qn_id-1] = (go_to_page[1])-1;
            console.log("go_to_page false | no case >>",context.go_to_page[assessment_qn_id-1])
            //console.log("value as index is >>",value)
        }
        
        //console.log("context.option_id[value] >>",context.option_id[value])
    //}
    
//});


}
useEffect(()=>{
    setSelected(context.answers[assessment_qn_id-1])
    context.previous_page[assessment_qn_id-1] = previous_page-1;
    context.next_page[assessment_qn_id-1] = next_page-1;
    
		console.log("next_page in yes/no cmpnt set to >>",context.next_page[assessment_qn_id-1])
        console.log("prev_page in yes/no cmpnt set to >>",context.previous_page[assessment_qn_id-1])
},[props.content.question,props.content.assessment_qn_id])
    return (
		<>
                            <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{question}</span>
                                    <div className="radio-button-wrapper">
                                        <div className="form-group">
                                            <label htmlFor="yes" className="radio">
                                                <input 
                                                onChange={setValue} 
                                                type="radio" 
                                                id="yes" 
                                                name="yesorno" 
                                                value="yes" 
                                                checked={selected === "yes"}/>
                                                <span>Yes</span>
                                              </label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="no" className="radio">
                                                <input 
                                                onChange={setValue} 
                                                type="radio" 
                                                id="no" 
                                                name="yesorno" 
                                                value="no" 
                                                checked={selected === "no"}/>
                                                <span>No</span>
                                              </label> 
                                        </div>
                                        
                                                                                   
                                    </div>
                                </div>
                            </div>				  
			
		</>
    )

};

export default YesOrNoQstnComponent;
