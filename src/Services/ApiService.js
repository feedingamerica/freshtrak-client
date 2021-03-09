//API call services will come here

import axios from "axios";
import { API_URL } from '../Utils/Urls';
import { CONFIRMATION_EMAIL } from '../Utils/Constants'

export const sendRegistrationConfirmationEmail = async user => {
  const { SEND_EMAIL } = API_URL;
  let identification_code =  user['identification_code']
  let from = CONFIRMATION_EMAIL['FROM']
  let subject = CONFIRMATION_EMAIL['SUBJECT']
  let to = user['email']
  let content = CONFIRMATION_EMAIL['CONTENT'] + `${identification_code.toUpperCase()}.`
  try {
    await axios.post(SEND_EMAIL, { from, subject, to, content});
  } catch (e) {
    console.log(e);
  }
}
