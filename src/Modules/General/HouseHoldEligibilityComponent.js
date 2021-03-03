import React, { useState } from "react";
import EligibilityModalComponent from "./EligibilityModalComponent";

const HouseHoldEligibilityComponent = ({ header, body, footer }) => {
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  let columnData = [];
  let rowsData = [];
  let addOnData = '';

  if (body) {
    const { columns, rows, addon } = JSON.parse(body);
    columnData = columns && Array.isArray(columns) ? columns : [];
    rowsData = rows && Array.isArray(rows) ? rows : [];
    addOnData = addon ? addon : '';
  }

  return (
    <div className="row align-items-center mt-2">
      <div className="col-lg-12 col-sm-10">
        <div className="d-flex align-items-center">
          <span className="font-weight-bold ml-2">
            To view eligibility requirements for our programs click here:
          </span>
          <span className="font-weight-bold ml-2">
            <a
              href={() => false}
              className="link"
              rel="noopener noreferrer"
              onClick={() => setShowEligibilityModal(true)}
            >
              View Eligibility Guidelines
            </a>
          </span>
        </div>
      </div>
      <EligibilityModalComponent
        show={showEligibilityModal}
        close={() => setShowEligibilityModal(false)}
        columnData={columnData}
        rowsData={rowsData}
        addOnData={addOnData}
        header={header}
        footer={footer}
      />
    </div>
  );
};

export default HouseHoldEligibilityComponent;
