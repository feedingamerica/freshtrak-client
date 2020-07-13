import React, { Fragment, forwardRef } from "react";
import StateDropdownComponent from "./StateDropdownComponent";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const AddressComponent = forwardRef(({ register, errors }, ref) => {
  const [addressLine1, setAddressLine1] = React.useState("");
  const [cityName, setCity] = React.useState("");
  const [stateName, setStateName] = React.useState("");
  const [shortStateName,setShortStateName] = React.useState("");
  const [zip, setZip] = React.useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    let destructuredAddress = getDestructured(results[0]["address_components"]);
    setCity(destructuredAddress["locality"]);
    setZip(destructuredAddress["postal_code"]);
    setStateName(destructuredAddress["administrative_area_level_1"]);
    setShortStateName(destructuredAddress["administrative_area_level_1_short"]);
    setAddressLine1(destructuredAddress["street_number"]!==undefined?`${destructuredAddress["street_number"]} ${destructuredAddress["route"]}`:'');
    
  };

  const getDestructured = address_components => {
    let destructured = {};
    address_components.filter(component => {
      switch (component["types"][0]) {
        case "neighborhood":
          destructured["neighborhood"] = component.long_name;
          break;
        case "street_number":
          destructured["street_number"] = component.long_name;
          break;
        case "route":
          destructured["route"] = component.long_name;
          break;
        case "locality":
          destructured["locality"] = component.long_name;
          break;
        case "administrative_area_level_1":
          destructured["administrative_area_level_1"] = component.long_name;
          destructured["administrative_area_level_1_short"] = component.short_name;
          break;
        case "country":
          destructured["country"] = component.long_name;
          break;
        case "postal_code":
          destructured["postal_code"] = component.long_name;
          break;
          default:return null;
      }
    });
    return destructured;
  };

  return (
    <Fragment>
      <h2>Where you live</h2>
      <div className="form-group relative">
        <label htmlFor="address_line_1">Street Address</label>
        <PlacesAutocomplete
          value={addressLine1}
          onChange={setAddressLine1}
          onSelect={handleSelect}
        >
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
                  {suggestions.map(suggestion => {
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
            value={cityName}
            onChange={(e)=>setCity(e.target.value)}
            ref={register({ required: true })}
          />
          {errors.city && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <StateDropdownComponent
          register={register}
          errors={errors}
          shortNameChange={setShortStateName}
          nameChange={setStateName}
          value={shortStateName}
          defaultValue={stateName}
        />

        <div className="form-group ml-2">
          <label htmlFor="zip_code">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zip_code"
            value={zip}
            onChange={(e)=>setZip(e.target.value)}
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