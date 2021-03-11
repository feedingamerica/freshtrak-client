//API call services will come here

import axios from "axios";
import { API_URL } from '../Utils/Urls';
import { CONFIRMATION_EMAIL } from '../Utils/Constants'

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const getReservationText = (location) => {
  return location.state? `Your reservation time is at ${location.state.event_slot.start_time} - ${location.state.event_slot.end_time} on ${location.state.event_date}. `: "";
}

const getCodeURL = (identification_code) => {
  return `Your QRCode for the Reservation ${CLIENT_URL}qrcode/${identification_code}`;
}

export const sendRegistrationConfirmationEmail = async (user, location) => {
  const { SEND_EMAIL } = API_URL;
  let identification_code =  user['identification_code']
  let from = CONFIRMATION_EMAIL['FROM']
  let subject = CONFIRMATION_EMAIL['SUBJECT']
  let to = user['email']
  let content = `You have successfully registered for FreshTrak, ${getReservationText(location)} Your confirmation code is ${identification_code.toUpperCase()}.
  ${getCodeURL(identification_code)}`
  try {
    await axios.post(SEND_EMAIL, { from, subject, to, content });
  } catch (e) {
    console.log(e);
  }
}
