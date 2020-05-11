import React, { useState, useContext,useEffect } from 'react';
import EventContainer from './EventContainer';
import MapContainer  from './MapContainer';

import EventContext, { EventProvider } from '../../Store/ContextApi/EventContext';
import ImageViewModal from '../General/ImageViewModal';

const EventMapContainer = props => {
    let isSearchData = !!props.location.state;

    const [showEventDetails, toggleEventDetails] = useState(false);
    const[eventDetails,setEventDetails] = useState({});
    const [showImage, setShowImage] = useState(false);
    // Context
    const eventContext = useContext(EventContext);


    useEffect(() => {
        if (isSearchData){
            props.history.replace({ state: null });
        }
    }, []);

    return(    <EventProvider value={{
        setCurrentEvent: setEventDetails,
        event:eventDetails,
        showEventDetails:toggleEventDetails,
        eventDetails : showEventDetails,
        setShowImage:setShowImage,
        showImage:showImage
    }}>
        <div className="d-flex h-100">
            <div className="left-box">
                <div className="search-area-left-block-contents h-100">

                    
                    <EventContainer {...props} />
                </div>
            </div>

            <div className="map-container flex-grow-1">
                <MapContainer/>
            </div>
        </div>
        {showImage === true && (
        <ImageViewModal
          src={"/pantry1.jpg"}
          close={() => setShowImage(false)}
        />
      )}
        </EventProvider>

    )
};

export default EventMapContainer;