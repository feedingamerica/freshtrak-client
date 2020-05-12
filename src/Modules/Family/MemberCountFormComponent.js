import React from "react";

const MemberCountFormComponent = (props) => {
    const [countSenior, setCountSenior] = React.useState(0);
    const [countAdult, setCountAdult] = React.useState(0);
    const [countKids, setCountKids] = React.useState(0);
    const [isChanged, setIsChanged] = React.useState('');
    
    React.useEffect(() => {
        handleChange();
    }, [isChanged]);

    const handleChange = () => {
        let  childFamilyData= { memberCountData :{
                countSenior: countSenior,
                countAdult: countAdult,
                countKids: countKids,
            }
        };
        props.onSelectedChild(childFamilyData);
    };

    const handleClick = (event) => {
        event.preventDefault();
        let name = event.target.name;
        setIsChanged(name);
        switch (name) {
            case 'count_senior_inc' :   if(countSenior < 13) 
                                            setCountSenior(countSenior + 1);  
                                        break;
            case 'count_senior_dec' :   if (countSenior > 0)
                                            setCountSenior(countSenior - 1);
                                        break;

            case 'count_adult_inc'  :   if(countAdult < 13) 
                                            setCountAdult(countAdult + 1);  
                                        break;
            case 'count_adult_dec'  :   if (countAdult > 0)
                                            setCountAdult(countAdult - 1);
                                        break;
            case 'count_kids_inc'   :   if(countKids < 13) 
                                            setCountKids(countKids + 1);  
                                        break;
            case 'count_kids_dec'   :   if (countKids > 0)
                                            setCountKids(countKids - 1);
                                        break;
            default                 :   break;
        }
    };

    /*const seniorDecrementFunction=(e)=> {
        e.preventDefault();
        if (countSenior) {
            setCountSenior(countSenior - 1)
        }
    };*/
    /*const seniorIncrementFunction=(e)=> {
        e.preventDefault();

        if (countSenior<13) {
            setCountSenior(countSenior + 1)
        }
    };*/
    /*const adultDecrementFunction=(e)=> {
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
    };*/
    /*const kidDecrementFunction=(e)=> {
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
    };*/

    return (
        <div>
            <div className="form-sub-title font-weight-bold">
                Total Number of Household Members
                <div className="mt-3 pt-1">
                    <div className="d-flex align-items-center pt-2 pb-2">
                        <div className="member-age">Seniors (65+)</div>
                        <div className="button-wrap d-flex flex-grow-1">
                            <button onClick={handleClick} name="count_senior_dec" className="rounded-button" type="button">-</button>
                            <input type="text" name="senior_count_input"  readOnly className="number member-count" value={countSenior} max="13" placeholder="senior_count_input" required></input>
                            <button onClick={handleClick} name="count_senior_inc" className="rounded-button">+</button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 pb-2">
                        <div className="member-age">Adults (18+)</div>
                        <div className="button-wrap d-flex flex-grow-1">
                            <button onClick={handleClick} name="count_adult_dec" className="rounded-button">-</button>
                            <input type="text" name="adult_count_input" readOnly className="number member-count" value={countAdult}  max="13"  placeholder="adult_count_input" required ></input>
                            <button onClick={handleClick} name="count_adult_inc" className="rounded-button">+</button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 pb-2">
                        <div className="member-age">Kids (Under 18)</div>
                        <div className="button-wrap d-flex flex-grow-1">
                            <button onClick={handleClick} name="count_kids_dec" className="rounded-button">-</button>
                            <input type="text" name="kids_count_input" readOnly className="number member-count" value={countKids} max="13" placeholder="kids_count_input"  required ></input>
                            <button onClick={handleClick} name="count_kids_inc" className="rounded-button">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )};
export default MemberCountFormComponent;
