import React, { Fragment, forwardRef } from "react";
import StateDropdownComponent from "./StateDropdownComponent";
import PlacesAutocomplete from "react-places-autocomplete";

const AddressComponent = forwardRef(({ register, errors }, ref) => {
  const [addressLine1, setAddressLine1] = React.useState("");

  return (
    <Fragment>
      <h2>Where you live</h2>
      <div className="form-group relative">
        <label htmlFor="address_line_1">Street Address</label>
        <PlacesAutocomplete value={addressLine1} onChange={setAddressLine1}>
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <>
              <input
                type="text"
                className="form-control"
                name="address_line_1"
                id="address_line_1"
                {...getInputProps()}
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.address_line_1 && (
                <span className="text-danger">This field is required</span>
              )}
              {/* No spinners are set here as of now. You can re-use the loader from EventContainer page; 
                    though the size of the spinner is set as 10em,fixed in main.scss file. */}
              {loading ? "Loading..." : null}
              {suggestions.length > 0 && (
                <div
                  data-testid="suggestions"
                  id="suggestions"
                  name="suggestions"
                  className="suggestions-container"
                >
                  {suggestions.map((suggestion) => {
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion)}
                        key={suggestion.id}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </PlacesAutocomplete>
      </div>

      <div className="form-group">
        <label htmlFor="address_line_2">apt/lot/suite</label>
        <input
          type="text"
          className="form-control"
          name="address_line_2"
          id="address_line_2"
          ref={register}
        />
      </div>

      <div className="d-flex city-state-form">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            id="city"
            ref={register({ required: true })}
          />
          {errors.city && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <StateDropdownComponent register={register} errors={errors} />

        <div className="form-group ml-2">
          <label htmlFor="zip_code">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zip_code"
            id="zip_code"
            ref={register({ required: true })}
          />
          {errors.zip_code && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
      </div>
    </Fragment>
  );
});

export default AddressComponent;
