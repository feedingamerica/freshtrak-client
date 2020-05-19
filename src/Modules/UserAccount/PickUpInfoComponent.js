import React from "react";
import { useHistory } from "react-router-dom";
const PickUpInfoComponent = () => {
    let history = useHistory();
    return (
        <React.Fragment>
            <div className="content-wrapper">
                <div className=" d-flex flex-wrap mb-3">
                    <div className="flex-grow-1 medium-title font-weight-bold">
                        Pickup Information
                    </div>
                    <div data-testid="pickup-info-edit-btn"
                        className="ml-auto"
                        onClick={() => {
                        history.push("/account/edit", {
                        page: "pickup-info",
                        title: "Your Pickup Info",
                        btntext: "Continue",
                        });
                        }}>
                        <span className="cursor text-underline" >Edit</span>
                    </div>
                </div>
                <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                    <div className="d-flex">
                        <span>Recipient:</span>
                        <span>Zak Orner</span>
                    </div>
                    <div className="d-flex">
                        <span>License Plate:</span>
                        <span>EJF 5442</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PickUpInfoComponent;
