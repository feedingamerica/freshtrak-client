import React, { forwardRef, Fragment } from 'react';

const ContactInformationComponent = forwardRef(
  ({ register, errors, getValues, watch }, ref) => {
  const showPhonePermissions = watch('no_phone_number');
  const showEmailPermissions = watch('no_email');
  return(
    <Fragment>
      <h2>How to Contact You</h2>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          id="phone"
          ref={register({
            validate: value => {
              const { no_phone_number } = getValues();
              if (!value && !no_phone_number) {
                return false;
              }
            },
          })}
        />
        {errors.phone && (
          <span className="text-danger" data-testid="no phone error">
            This field is required. If you have no phone check "No Phone
            Available".
          </span>
        )}
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="no_phone_number"
          id="no_phone_number"
          value=""
          ref={register}
        />
        <label htmlFor="no_phone_number" className="form-check-label">
          No Phone Available
        </label>
      </div>
      {!showPhonePermissions && (
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="permission_to_text"
            id="permission_to_text"
            value=""
            ref={register}
          />
            <label htmlFor="permission_to_text" className="form-check-label">
            <small data-testid="phone permission">
              Is it okay to contact you with updates and information about your
              registration, and updates to our network?
            </small>
          </label>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="email"
          autoComplete="off"
          ref={register({
            validate: value => {
              const { no_email } = getValues();
              if (!value && !no_email) {
                return false;
              }
            }
          })}
        />
        <small className="text-muted">
          No Email?{' '}
          <a
            href="https://support.google.com/mail/answer/56256"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get one free from Google.
          </a>
        </small>
        <br />
        {errors.email && (
          <span className="text-danger" data-testid="no email error">This field is required</span>
        )}
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="no_email"
          id="no_email"
          value=""
          ref={register}
        />
        <label htmlFor="no_email" className="form-check-label">
          No Email Available
        </label>
      </div>
      {!showEmailPermissions && (
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="permission_to_email"
            id="permission_to_email"
            value=""
            ref={register}
          />
          <label htmlFor="permission_to_email" className="form-check-label">
            <small data-testid="email permission">
              Is it okay to email you with updates and information about your
              registration, and updates to our network?
            </small>
          </label>
        </div>
      )}
    </Fragment>
  );
});

export default ContactInformationComponent;
