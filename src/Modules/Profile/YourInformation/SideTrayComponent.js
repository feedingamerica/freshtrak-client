import React from 'react'
const SideTrayComponent = (props) => {
//console.log("in side tray")
    return (
        props.show && <div className="overlay">
            <div className="edit-tray">
                <div className="d-flex tray-header align-items-center">
                    <div className="tray-title text-capitalize">{props.header}</div>
                    <div className="ml-auto f-18 pointer" 
                    onClick={props.onClose}>
                        <i className="icon-close"></i>
                    </div>
                </div>
                {props.children !== undefined && props.children}
            </div>
        </div>
    )
}

export default SideTrayComponent