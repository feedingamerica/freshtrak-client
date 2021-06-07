import React from 'react'
const SideTrayComponent = (props) => {
    return (
        props.show && <div className="overlay">
            <div className="edit-tray">
                <div className="d-flex tray-header align-items-center">
                    {props && props.header ? <div className="tray-title text-capitalize">{props.header}</div> : null}
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