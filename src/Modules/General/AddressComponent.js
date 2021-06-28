
import React, { useEffect,Fragment, useState, forwardRef } from 'react';
import localization from '../Localization/LocalizationComponent'
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const AddressComponent = forwardRef(({ register, errors, addressData, watch, setValue }, ref) => { //register, errors, addressData, states, setValue, watch
  const addressLine1 = watch('line_1') || '';
  const cityName = watch('city') || '';
  const zip = watch('zip_code') || '';
  const stateCode = watch('state_code') || '';
  const [invalidStreet, setInvalidStreet] = useState(false);
const [line_2, setAddress_line_2] = useState("");


       useEffect(() => {
         if (addressData) {
             let addressInfo = { ...addressData }
             setValue('line_1', addressInfo.line_1);
             setValue('city', addressInfo.city);
             setValue('state_code', addressInfo.state);
             setValue('zip_code', addressInfo.zip_code);
             setAddress_line_2(addressInfo.line_2);
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [addressData])


  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    //remove errors when selecting a new address
    delete errors.city
    delete errors.zip_code
    let destructuredAddress = getDestructured(results[0]["address_components"]);
    if (destructuredAddress["street_number"] !== undefined) {
                     setInvalidStreet(false)
                 }
                 else{
                     setInvalidStreet(true)
                 }
    setValue('line_1', destructuredAddress["street_number"]!==undefined?`${destructuredAddress["street_number"]} ${destructuredAddress["route"]}`:'');
    setValue('city', destructuredAddress["locality"]);
    setValue('state_code', destructuredAddress["administrative_area_level_1_short"]);
    setValue('zip_code', destructuredAddress["postal_code"]);
  };



  const getDestructured = address_components => {
    let destructured = {};
    // eslint-disable-next-line array-callback-return
    address_components.filter(component => {
      switch (component["types"][0]) {
        case "neighborhood":
          destructured["neighborhood"] = component.long_name;
          break;
        case "street_number":
          destructured["street_number"] = component.long_name;
          break;
        case "route":
          destructured["route"] = component.short_name;
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
      <h2>{localization.register_where_you_live}</h2>
      <div className="form-group relative">
      <label>Address</label>
        <PlacesAutocomplete
          value={addressLine1}
          onChange={(e) => setValue('line_1', e)}
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
                className= {`form-control ${errors.line_1 && 'invalid'}`}
                name="line_1"
                id="line_1"
                {...getInputProps()}
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.line_1 && (
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
                  {suggestions.map((suggestion,i) => {
                    return (
                      <div {...getSuggestionItemProps(suggestion)} key={i} >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </PlacesAutocomplete>
        {invalidStreet && <span className="text-danger">Street Choosen is invalid</span>}
      </div>



      <div className="form-group">
             <label>Address 2</label>
             <input
                 className="form-control"
                 type="text"
                 name="line_2"
                 id="line_2"
                 ref={register}
                 defaultValue={line_2}
             />

         </div>


            <div className="form-group">
             <label>City</label>
             <input
                 className="form-control"
                 type="text"
                 name="city"
                 id="city"
                 defaultValue={cityName}
                 onChange={(e) => setValue('city', e.target.value)}
                 ref={register({ required: true })}
             />
             {errors.city && (
                 <span className="text-danger">This field is required</span>
             )}
         </div>

       

        <div className="form-group">
       <label htmlFor="state">State<span className="text-danger">*</span></label>
       

       <select
         className="form-control"
         name="state_code"
         id="state_code"
         defaultValue={stateCode}
         onChange={(e) => setValue('state_code', e.target.value)}
         ref={register({ required: true })}
       >
         <option value="" defaultValue></option>
         <option value="AK">Alaska</option>
         <option value="AL">Alabama</option>
         <option value="AR">Arkansas</option>
         <option value="AZ">Arizona</option>
         <option value="CA">California</option>
         <option value="CO">Colorado</option>
         <option value="CT">Connecticut</option>
         <option value="DC">District of Columbia</option>
         <option value="DE">Delaware</option>
         <option value="FL">Florida</option>
         <option value="GA">Georgia</option>
         <option value="HI">Hawaii</option>
         <option value="IA">Iowa</option>
         <option value="ID">Idaho</option>
         <option value="IL">Illinois</option>
         <option value="IN">Indiana</option>
         <option value="KS">Kansas</option>
         <option value="KY">Kentucky</option>
         <option value="LA">Louisiana</option>
         <option value="MA">Massachusetts</option>
         <option value="MD">Maryland</option>
         <option value="ME">Maine</option>
         <option value="MI">Michigan</option>
         <option value="MN">Minnesota</option>
         <option value="MO">Missouri</option>
         <option value="MS">Mississippi</option>
         <option value="MT">Montana</option>
         <option value="NC">North Carolina</option>
         <option value="ND">North Dakota</option>
         <option value="NE">Nebraska</option>
         <option value="NH">New Hampshire</option>
         <option value="NJ">New Jersey</option>
         <option value="NM">New Mexico</option>
         <option value="NV">Nevada</option>
         <option value="NY">New York</option>
         <option value="OH">Ohio</option>
         <option value="OK">Oklahoma</option>
         <option value="OR">Oregon</option>
         <option value="PA">Pennsylvania</option>
         <option value="PR">Puerto Rico</option>
         <option value="RI">Rhode Island</option>
         <option value="SC">South Carolina</option>
         <option value="SD">South Dakota</option>
         <option value="TN">Tennessee</option>
         <option value="TX">Texas</option>
         <option value="UT">Utah</option>
         <option value="VA">Virginia</option>
         <option value="VT">Vermont</option>
         <option value="WA">Washington</option>
         <option value="WI">Wisconsin</option>
         <option value="WV">West Virginia</option>
         <option value="WY">Wyoming</option>
       </select>
       {errors.state && <span className="text-danger">This field is required</span>}
    </div>

               <div className="form-group">
             <label>Zip </label>
             <input
                 className="form-control"
                 type="text"
                 name="zip_code"
                 id="zip_code"
                 ref={register({ required: true })}
                 onChange={(e) => setValue('zip_code', e.target.value)}
                 defaultValue={zip}
             />
             {errors.zip_code && (
                 <span className="text-danger">This field is required</span>
             )}
         </div>

    </Fragment>
  );
});

export default AddressComponent;