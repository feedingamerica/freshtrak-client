import moment from 'moment';

export const EventHandler = agencies => EventDateSorterByDate(EventObjectBuilder(AgencyHandler(agencies)));

const EventDateSortByDistance = arrayOfEvents => arrayOfEvents
  .sort((a,b) => (a.estimated_distance? a.estimated_distance: Infinity) - (b.estimated_distance? b.estimated_distance: Infinity));

export const EventDateSorterByDate = eventObj => {
  const eventOrderByDate = {};
  Object.keys(eventObj).sort((a, b) => {
    return moment(a, 'YYYY/MM/DD').toDate() - moment(b, 'YYYY/MM/DD').toDate();
  }).forEach(key => {
    eventOrderByDate[key] = EventDateSortByDistance(eventObj[key]);
  });
  return eventOrderByDate;
}

export const EventObjectBuilder = events => {
  const eventSortedByDate = {};
  events.forEach(event => {
    if (event.date in eventSortedByDate) {
      eventSortedByDate[event.date].push(event);
    } else {
      eventSortedByDate[event.date] = [event];
    }
  });
  return eventSortedByDate;
}

const eventDateMapper = (event, phone, name, estimated_distance) => {
  const { event_dates } = event;
  if (event_dates && event_dates.length > 0) {
    return event_dates.map(dateOfEvent => {
      const { id, event_id, accept_reservations, accept_interest, start_time, end_time, date } = dateOfEvent;
      return {
        id,
        eventId: event_id,
        acceptReservations: accept_reservations,
        acceptInterest: accept_interest,
        startTime: start_time,
        endTime: end_time,
        date,
        eventAddress: event.address,
        eventCity: event.city,
        eventState: event.state,
        eventZip: event.zip,
        phoneNumber: phone,
        agencyName: name,
        eventName: event.name,
        eventService: event.service,
        estimated_distance,
        eventDetails: event.event_details,
      }
    });
  } else {
    return [];
  }
}

export const AgencyHandler = agencies => {
  if (!agencies || !agencies.length > 0) {
    return [];
  }
  const eventDates = [];

  agencies.forEach(agency => {
    const { events, phone, name, estimated_distance } = agency;
    if (events && events.length > 0) {
      events.forEach(event => {
        eventDateMapper(event, phone, name, estimated_distance).forEach(x => eventDates.push(x));
      });
    }
  });
  return eventDates;
}
