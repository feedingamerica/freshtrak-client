import React from "react";

const MemberCountFormComponent = (props) => {
    const [countSenior, setCountSenior] = React.useState(0);
    const [countMiddle, setCountMiddle] = React.useState(0);
    const [countJunior, setCountJunior] = React.useState(0);
    const [value, setValue] = React.useState(0);


    React.useEffect(() => {
        handleChange();
    }, [countSenior, countMiddle, countJunior]);

    const handleChange = () => {
        let  childFamilyData= { memberCountData :{
                countSenior: countSenior,
                countMiddle: countMiddle,
                countJunior: countJunior,
            }
        };
        props.onSelectedChild(childFamilyData);
    };

    const seniorDecrementFunction=(e)=> {
        e.preventDefault();
        if (countSenior) {
            setCountSenior(countSenior - 1)
        }
    };
    const seniorIncrementFunction=(e)=> {
        e.preventDefault();

        if (countSenior<13) {
            setCountSenior(countSenior + 1)
        }
    };
    const adultDecrementFunction=(e)=> {
        e.preventDefault();
        if (countMiddle) {
            setCountMiddle(countMiddle - 1)
        }
    };

    const adultIncrementFunction=(e)=> {
        e.preventDefault();

        if (countMiddle<13) {
            setCountMiddle(countMiddle + 1)
        }
    };
    const kidDecrementFunction=(e)=> {
        e.preventDefault();
        if (countJunior) {
            setCountJunior(countJunior - 1)
        }
    };

    const kidIncrementFunction=(e)=> {
        e.preventDefault();

        if (countJunior<13) {
            setCountJunior(countJunior + 1)
        }
    };

    return (
        <div>
            <div className="form-sub-title font-weight-bold">
                Total Number of Household Members
                <div className="mt-3 pt-1">
                    <div className="d-flex align-items-center pt-2 pb-2">
                        <div className="member-age">Seniors (65+)</div>
                        <div className="button-wrap d-flex flex-grow-1">
                            <button onClick={seniorDecrementFunction} name="count_senior_dec" className="rounded-button" type="button"><span>-</span></button>
                            <input type="text" name="senior_count_input" readOnly className="number member-count" value={countSenior} required></input>
                            <button onClick={seniorIncrementFunction} name="count_senior_inc" className="rounded-button"><span>+</span></button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 pb-2">
                        <div className="member-age">Adults (18+)</div>
                        <div className="button-wrap d-flex flex-grow-1">
                            <button onClick={adultDecrementFunction} name="count_adult_inc" className="rounded-button"><span>-</span></button>
                            <input type="text" name="adult_count_input" readOnly className="number member-count" value={countMiddle} required ></input>
                            <button onClick={adultIncrementFunction} name="count_adult_dec" className="rounded-button"><span>+</span></button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 pb-2">
                        <div className="member-age">Kids (Under 18)</div>
                        <div className="button-wrap d-flex flex-grow-1">
                            <button onClick={kidDecrementFunction} name="count_kids_inc" className="rounded-button"><span>-</span></button>
                            <input type="text" name="junior_count_input" readOnly className="number member-count" value={countJunior} required ></input>
                            <button onClick={kidIncrementFunction} name="count_kids_dec" className="rounded-button"><span>+</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )};
export default MemberCountFormComponent;
