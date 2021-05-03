import React from 'react';
import QRCode from 'qrcode.react';
//import {useParams} from 'react-router-dom';

const QRCodeComponent = () =>{
  //const {code}  = useParams();

  return <div className="qrcode">
  <h2>
    Your QR Code <br />
    <center><QRCode value= "https://secure.pantrytrak.com/mobile/qr_code_processing.php?code={code.toUpperCase()}"/></center>
  </h2>
  <br />
</div>
}

export default QRCodeComponent;


// https://secure.pantrytrak.com/mobile/qr_code_processing.php?code={code}&event_date_id={event_date_id}