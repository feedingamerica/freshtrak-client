import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import '../../Assets/scss/main.scss';

const TermsComponent = props => {
  

  return (
    <Fragment>
      <div>
      <h2 className="font-weight-bold mobile-text-left">
      FreshTrak Privacy Policy
      </h2>
      <p>Effective Date: November **, 2020</p>
      <p>
      Your privacy is very important to us. Accordingly, we have developed this Privacy Policy in order for you
      to understand how we collect, use, communicate, and disclose your personal information. This Privacy
      Policy applies to our Website and to our communications with you. Throughout this Policy, we may refer
      to FreshTrak as “we,” “us,” or “our.” “Website” refers to https://freshtrak.com/ and any other
      microsites or mobile websites we operate or use.
      </p>
      <h4>
      Information We Collect
      </h4>
      <p>
      When you visit our Website, certain information may be collected about you. This information can include: 
      </p>
      <ul>
        <li>
        <strong>Device Information:</strong> When you visit our Website, we learn about your IP address, browser type, domain names, access times, and referring website addresses. 
        </li>
        <li>
        <strong>Website Interactions:</strong> We also keep track of the websites and pages users visit within our Website in order to determine what services are the most popular.  
        </li>
        <li>
        <strong>Website Interactions:</strong> We also keep track of the websites and pages users visit within our Website in order to determine what services are the most popular.  
        </li>
        <li>
        Device Information: When you visit our Website, we learn about your IP address, browser type, domain names, access times, and referring website addresses. 
        </li>
        <li>
        Device Information: When you visit our Website, we learn about your IP address, browser type, domain names, access times, and referring website addresses. 
        </li>
      </ul>
    </div>
    </Fragment>
  );
};

export default withRouter(TermsComponent);
