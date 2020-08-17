import React from 'react';
const FoodbankTextComponent = ({ text ='', imageUrl = '', LinkUrl = '',linkText ='' }) => {
	 
    return (       
            <div className="row">
                <div className="col-1 item-icon d-flex align-items-center">
                    <img alt={text} src={imageUrl} />
                </div>
                <div className="col-8 item-details">
                    <p>{text}</p>
                </div>
                <div style={{"word-wrap": "break-word"}} className="col-3">
                    <a href={LinkUrl} target="_blank"> {linkText}</a>
                </div>
            </div>        
    )
};

export default FoodbankTextComponent;