import React from "react";
import qrCode from "../../Assets/img/qr.png";
import carrot from "../../Assets/img/carrot.png";

const YourReservationsComponent = () => {
  return (
    <>
      <h5 className="font-weight-bold">Your Reservations</h5>
      <p>You have an event coming up</p>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-12">
          <div className="card p-3">
            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="font-weight-bold mb-0 profile-title">
                  Family Love Pantry
                </div>
                <div>Mid Ohio Market at Heart</div>
                <div className="d-flex small">
                  <span>Aug 4, 2020</span>
                  <span className="pl-3">3.30 PM</span>
                </div>
                <div className="mt-2">
                  <span className="badge badge-info">In Person</span>
                </div>
              </div>
              <div className="ml-4 d-flex flex-column justify-content-between align-items-end">
                <div className="qr-code">
                  <img src={qrCode} />
                </div>
                <div className="carrot text-right">
                  <img src={carrot} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-12">
          <div className="card p-3">
            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="font-weight-bold mb-0 profile-title">
                  Family Love Pantry
                </div>
                <div>Mid Ohio Market at Heart</div>
                <div className="d-flex small">
                  <span>Aug 4, 2020</span>
                  <span className="pl-3">3.30 PM</span>
                </div>
                <div className="mt-2">
                  <span className="badge badge-info">In Person</span>
                </div>
              </div>
              <div className="ml-4 d-flex flex-column justify-content-between align-items-end">
                <div className="qr-code">
                  <img src={qrCode} />
                </div>
                <div className="carrot text-right">
                  <img src={carrot} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default YourReservationsComponent;
