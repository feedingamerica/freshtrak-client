import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = () =>{
  return <div className="qrcode">
  <h2>
    Your QR Code <br />
    <center><QRCode value= "https://secure.pantrytrak.com/mobile/qr_code_processing.php?code={code.toUpperCase()}"/></center>
  </h2>
  <br />
</div>
}

export default QRCodeComponent;
