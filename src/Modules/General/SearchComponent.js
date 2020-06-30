import React, { forwardRef } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchComponent = forwardRef(({ register, errors }, ref) => {
  const [address, setAddress] = React.useState("");
  const [zip] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [long, setLong] = React.useState("");
  const [showAddress, setShowAddress] = React.useState(false);
  const handleSelect = async value => {
    setAddress(value);
    const results = await geocodeByAddress(value);

    //  Here we get the coordinates lat and long.
    const coordinates = await getLatLng(results[0]);
    setLat(coordinates.lat);
    setLong(coordinates.lng);
  };

  return (
    <div className=" row align-items-end">
      <div className="col-sm-6 col-md-6 col-lg-7 col-xl-8 search-order-1">
        <div className="d-flex">
          {showAddress && (
            <div className="form-group flex-grow-1" data-testid="search-street">
              <label htmlFor="street">Street</label>
              <PlacesAutocomplete
                onSelect={handleSelect}
                value={address}
                onChange={setAddress}
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
                      name="street"
                      id="street"
                      {...getInputProps({ placeholder: "Type Address" })}
                      ref={register}
                    />

                    {/* No spinners are set here as of now. You can re-use the loader from EventContainer page; 
                    though the size of the spinner is set as 10em,fixed in main.scss file. */}
                    {loading ? "Loading..." : null}

                    {suggestions.length > 0 && (
                      <div
                        data-testid="suggestions"
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
          )}
          <div className={showAddress ? "form-group" : "form-group zip-code"}>
            <label htmlFor="zip_code">Zip</label>
            <input
              type="text"
              className="form-control zip"
              id="zip_code"
              name="zip_code"
              defaultValue={zip}
              onChange={e =>
                e.target.value.length > 4
                  ? setShowAddress(true)
                  : setShowAddress(false)
              }
              ref={register({ required: true })}
            />

            {errors.zip_code && (
              <span className="validationError">This field is required</span>
            )}
          </div>
          <input
            type="hidden"
            defaultValue={lat || ""}
            ref={register}
            name="lat"
          />
          <input
            type="hidden"
            defaultValue={long || ""}
            ref={register}
            name="long"
          />
        </div>
      </div>
      <div className="col-sm-6 col-md-6 col-lg-5 col-xl-4 text-right search-order-3">
        <button
          type="submit"
          name="searchForResources"
          dataid=""
          id="search-resource"
          value="Search For Resources"
          className="btn custom-button search-button"
        >
          Search For Resources
        </button>
      </div>
      <div className="col-12 search-order-2 mt-2">
        {address.length === 0 && showAddress && (
          <p>Enter your address for customized results (Optional) </p>
        )}
      </div>
    </div>
  );
});
export default SearchComponent;
