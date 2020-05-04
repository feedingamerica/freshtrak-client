import React from "react";



export const EventContext = React.createContext({
    event: null,
    showEventDetails: false
});

export const EventProvider = EventContext.Provider;
export const EventConsumer = EventContext.Consumer;

export default EventContext;
