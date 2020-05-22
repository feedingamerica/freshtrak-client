
import React from 'react';
import ButtonComponent from '../../General/ButtonComponent'
const CheckboxQstnComponent = (props) => {
let {qstn,id} = props.content;
    return (
		<React.Fragment>

							<div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{qstn} </span>
                                    <p className="mt-2">You can choose more than one.</p>
                                    <div className="mt-4 checkbox-wrapper">
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" id="part-time"/>
                                                <label for="part-time">Working for pay part-time  (Less than 30 hours per week) </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" id="pay-full-time"/>
                                                <label for="pay-full-time">Working for pay full-time   (30 hours per week or more)</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" id="pension"/>
                                                <label for="pension">Pension</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" id="social-security"/>
                                                <label for="social-security">Social Security</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" id="unemployment"/>
                                                <label for="unemployment">Unemployment compensation</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                <input type="checkbox" id="disability"/>
                                                <label for="disability">Disability (SSDI), workman’s compensation, or Supplemental Security Income (SSI)</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                    <input type="checkbox" id="general-assistance"/>
                                                    <label for="general-assistance">General assistance</label>
                                                </div>
                                            </div>
                                        <div className="form-group">
                                             <div className="checkbox-custom">
                                                    <input type="checkbox" id="temporary-assistance"/>
                                                    <label for="temporary-assistance">Temporary Assistance to Needy Families also called TANF, formally AFDC</label>
                                                </div>
                                            </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                    <input type="checkbox" id="government-assistance"/>
                                                    <label for="government-assistance">Government assistance with child care costs</label>
                                                </div>
                                            </div>
                                        <div className="form-group">
                                            <div className="checkbox-custom">
                                                    <input type="checkbox" id="child-support"/>
                                                    <label for="child-support">Child support or alimony</label>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
		</React.Fragment>
    )

};

export default CheckboxQstnComponent;
