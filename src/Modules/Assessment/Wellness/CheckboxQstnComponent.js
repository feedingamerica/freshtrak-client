
import React from 'react';
import ButtonComponent from '../../General/ButtonComponent'
const CheckboxQstnComponent = (props) => {
let {qstn,id} = props.content;
    return (
		<>

							<div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                                <div className="a-c-content flex-grow-1">
                                    <span className="font-weight-bold">{qstn} </span>
                                    <p className="mt-2">You can choose more than one.</p>
                                    <div className="mt-4 checkbox-wrapper">
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Working for pay part-time  (Less than 30 hours per week) </span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Working for pay full-time   (30 hours per week or more)</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Pension</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Social Security</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Unemployment compensation</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Disability (SSDI), workman’s compensation, or Supplemental Security Income (SSI)</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>General assistance</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Temporary Assistance to Needy Families also called TANF, formally AFDC</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Government assistance with child care costs</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" className="checkbox" />
                                                <span>Child support or alimony</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
		</>
    )

};

export default CheckboxQstnComponent;
