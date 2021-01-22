
import React,{useContext,useEffect,useState} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContext from './WellnessContext';
const SelectQstnComponent = (props) => {
let {assessment_qn_id,question,description,option,option_id,go_to_page,previous_page,next_page} = props.content;
let context = useContext(WellnessContext);
const [selected,setSelected] = useState(null); 

const setValue = (e) =>{
// Object.keys(context.answers).map((value,index)=>{
//     if(value == assessment_qn_id-1){
        context.answers[assessment_qn_id-1] = e.target.value
    setSelected(e.target.value)

    let index = option.indexOf(e.target.value)
    // console.log("index found in selectqstn cmp is >>",index)
    // console.log("go_to_page[index] is >>",go_to_page[index])
    context.option_id[assessment_qn_id-1] = option_id[index] -1;
    context.go_to_page[assessment_qn_id-1] = go_to_page[index] -1;
    console.log("option_id set in select qstn cmp is >>",context.option_id[assessment_qn_id-1])

//     }
// });
}

useEffect(()=>{
    setSelected(context.answers[assessment_qn_id-1])
    context.previous_page[assessment_qn_id-1] = previous_page-1;
    context.next_page[assessment_qn_id-1] = next_page-1;
        console.log("prev_page in selectQstn cmpnt is >>",context.previous_page[assessment_qn_id-1])
        console.log("next_page in selectQstn cmpnt is >>",context.next_page[assessment_qn_id-1])
    //console.log("useEffect in YesOrNo",selected)
},[props.content.question,props.content.assessment_qn_id,props.content.option,props.content.previous_page])

    return (
		<>


<div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{question}</span>
                                    <p className="mt-2">{description}</p>
                                    <div className="radio-button-wrapper">
                                    {
                                    	option.map((value,index)=>{
                                        return <div key={index} className="form-group">
                                            <label htmlFor={index} className="radio">
                                                <input type="radio" 
                                                name="selection" 
                                                onChange={setValue} 
                                                value ={value} 
                                                id={index} 
                                                checked={selected === value}
                                                />
                                                <span>{value}</span>
                                              </label>
                                        </div>
        								})
                                    }	 
		
                                                                                   
                                    </div>
                                </div>
                            </div>
			
		</>
    );

};

export default SelectQstnComponent;
