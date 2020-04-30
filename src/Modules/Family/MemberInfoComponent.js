import React from 'react';
import '../../Assets/scss/main.scss';

const MemberInfoComponent = (props) => {

    const [countJunior, setJunior] = React.useState('3');
    const [countSenior, setSenior] = React.useState('');
    const [countAdult, setAdult] = React.useState('');

    const JuniorMember = (props) => {
        let elementsJunior = Array.from(Array(countJunior).keys())
        return (
            <div>
                {elementsJunior.map((value, index) => {
                    return <div key={index}>{
                        <div className="info-wraps">
                            <div className="form-title">
                                Your Information
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" name={"first_name_junior" + value} id="first_name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" className="form-control"
                                    name="middle_name" id="middle_name" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" name={"last_name_junior" + value} id={"last_name_junior" + value}
                                />
                                <div>
                                </div>

                            <div className="form-group">
                                <label>Suffix</label>
                                <select  id={"suffix_junior"+value} name={"suffix_junior"+value} className="form-control"  >
                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" name={"dob_junior"+value} id={"dob_junior"+value} />
                            </div>

                        </div>
                        </div>
                    }</div>
                })}
            </div>
        )
    };
    const AdultMember = (props) => {

        let elementsAdult = Array.from(Array(countAdult).keys())
        return (
            <div>
                {elementsAdult.map((value, index) => {
                    return <div key={index}>{
                        <div>
                            <div className="form-title">
                                Your Information
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" name={"first_name_adult" + value} id={"first_name_adult" + value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" className="form-control"
                                    name="middle_name" id="middle_name" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" name={"last_name_adult" + value} id={"last_name_adult" + value}
                                />
                            </div>

                            <div className="form-group">
                                <label>Suffix</label>
                                <select id={"suffix_adult" + value} name={"suffix_adult" + value} className="form-control"  >
                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" name={"dob_adult" + value} id={"dob_adult" + value} />
                            </div>
                        </div>
                    }</div>
                })}
            </div>
        )
    };

    const SeniorMember = (props) => {

        let elementSenior = Array.from(Array(countSenior).keys())
        return (
            <div>
                {elementSenior.map((value, index) => {
                    return <div key={index}>{
                        <div>
                            <div className="form-title">
                                Your Information
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" name={"first_name_senior" + value} id={"first_name_senior" + value}
                                />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" className="form-control"
                                    name="middle_name" id="middle_name" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" name={"last_name_senior" + value} id={"last_name_senior" + value}
                                />
                            </div>

                            <div className="form-group">
                                <label>Suffix</label>
                                <select className="form-control" name={"suffix_senior" + value} id={"suffix_senior" + value} >
                                    <option>Jr</option>
                                    <option>Sr</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" name={"dob_senior" + value} id={"dob_senior" + value} />
                            </div>
                        </div>

                    }</div>
                })}
            </div>
        )
    };

    return (
        <div>
            <JuniorMember />
            <AdultMember />
            <SeniorMember />
        </div>
    )
};

export default MemberInfoComponent;
