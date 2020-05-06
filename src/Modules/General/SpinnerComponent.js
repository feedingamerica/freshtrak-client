import React from 'react';

const SpinnerComponent = () => (
  <div className="d-flex justify-content-center mb-4" data-testid="spinning component">
    <div className="spinner-border loading-spinner-height" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default SpinnerComponent;
