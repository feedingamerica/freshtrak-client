
import React,{useState} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContainer from './WellnessContainer';
const TriggerAssess = (props) => {
	const [showModal, setShowModal] = useState(false);

    return (
		<>
	<div className="main-wrapper">
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-lg-4 col-xl-4">
                    <div className="wellness-assessment">
                        <div className="p-3">
                            <h3 className="mt-3 mb-3">Take the Wellness Assessment</h3>
                            <button className="btn mt-2 custom-button w-100" data-toggle="modal"
                            data-target="#assessment" onClick={()=>setShowModal(true)}>Begin Assessment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 


    {showModal && <WellnessContainer closeModal={()=>setShowModal(false)}/>}
			
		</>
    );

}

export default TriggerAssess;
