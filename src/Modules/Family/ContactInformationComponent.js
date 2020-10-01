import React, { forwardRef, Fragment } from 'react';
import PhoneInputComponent from './PhoneInputComponent';

const ContactInformationComponent = forwardRef(
  ({ register, errors, getValues, setValue, watch }, ref) => {
    const showPhonePermissions = !watch('no_phone_number');
    const showEmailPermissions = !watch('no_email');
    const phone = watch('phone') || '';
    const email = watch('email') || '';

    return (
      <Fragment>
        <h2>How to Contact You</h2>
        {showPhonePermissions && (
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Mobile Preferred)</label>
            <PhoneInputComponent
              type="text"
              className="form-control"
              name="phone"
              placeholder="(xxx) xxx-xxxx"
              id="phone"
              value={phone}
              onChange={(e) => { console.log(e);setValue('phone', e) }}
              register={register}
            />
            {errors.phone && (
              <span className="text-danger">
                This field is required. If you have no phone check "No Phone
                Available".
              </span>
            )}
          </div>
        )}
        {phone === '' && (
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
        )}
        {showPhonePermissions && (
          <div className="form-check" data-testid="no phone error">
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
                Is it okay to contact you with updates and information about
                your registration, and updates to our network?
							</small>
            </label>
          </div>
        )}
        {showEmailPermissions && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={e => setValue('email', e.target.value)}
              ref={register({
                validate: (value) => {
                  const { no_email: noEmail } = getValues();
                  return value.length > 0 || noEmail;      
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
              <span className="text-danger" data-testid="no email error">
                This field is required. If you have no email check "No Email
                Available".
              </span>
            )}
          </div>
        )}
        {email === '' && (
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
        )}
        {showEmailPermissions && (
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
  }
);

export default ContactInformationComponent;
