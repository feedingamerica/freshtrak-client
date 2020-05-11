import React from 'react';
// import './image_modal_style.css'
const ImageViewModal = (props)=>{
    return (
        <React.Fragment>
            <div id="myModal" className="image-modal">
               <div className="image-modal-wrap">
               <span className="close close-show" id="imageView" style={{}} onClick={props.close} >&times;</span>
               <div className="image-viewser">
               <img className="image-modal-content" id="img01" src={props.src} />
               </div>
               </div>
            </div>
        </React.Fragment>
    );
};

export default ImageViewModal;