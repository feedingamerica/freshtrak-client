import React, { useEffect, useState, forwardRef } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
} from "react-places-autocomplete";
const AddressComponent = forwardRef(({ register, errors, addressData, states, setValue, watch }, props) => {
    const address_line_1 = watch('address_line_1') || '';
    const city = watch('city') || '';
    const state_code = watch('state_code') || '';
    const zip_code = watch('zip_code') || '';

    const [invalidStreet, setInvalidStreet] = useState(false)
    const [address_line_2, setAddress_line_2] = React.useState("");
    useEffect(() => {
        if (addressData) {
            let addressInfo = { ...addressData }
            setValue('address_line_1', addressInfo.address1);
            setValue('city', addressInfo.city);
            setValue('state_code', addressInfo.state);
            setValue('zip_code', addressInfo.zipcode);
            setAddress_line_2(addressInfo.address2)


        }
    }, [addressData])



    const handleSelect = async value => {

        const results = await geocodeByAddress(value);
        let destructuredAddress = getDestructured(results[0]["address_components"]);
        if (destructuredAddress["street_number"] !== undefined) {
            delete errors.city
            delete errors.zip_code
            delete errors.state_code
            setInvalidStreet(false)
            setValue('address_line_1', destructuredAddress["street_number"] !== undefined ? `${destructuredAddress["street_number"]} ${destructuredAddress["route"]}` : '');
            setValue('city', destructuredAddress["locality"]);
            setValue('state_code', destructuredAddress["administrative_area_level_1_short"]);
            setValue('zip_code', destructuredAddress["postal_code"]);
        } else {
            setValue('address_line_1', '');
            setValue('city', '');
            setValue('state_code', '');
            setValue('zip_code', '');
            setInvalidStreet(true)
        }
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
                default: return null;
            }
        });
        return destructured;
    };
   

    return (<div>
        <div className="form-group">
            <label>Address</label>
            <PlacesAutocomplete
                value={address_line_1}
                onChange={(value) => setValue('address_line_1', value)}
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
                                    {suggestions.map((suggestion, i) => {
                                        return (
                                            <div  {...getSuggestionItemProps(suggestion)} key={i} >
                                                <div className="mt-3 pointer">{suggestion.description}</div>
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
                name="address_line_2"
                id="address_line_2"
                ref={register}
                defaultValue={address_line_2}
            />

        </div>



        <div className="form-group">
            <label>City</label>
            <input
                className="form-control"
                type="text"
                name="city"
                id="city"
                value={city}
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
        //value={state_code}
        //onSelect={handleSelect}
        //defaultValue={state_code}
        //onChange={(e) => setValue('state_code', e.target.value)}
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
      {/* {errors.state && <span className="text-danger">This field is required</span>} */}
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
                value={zip_code}
            />
            {errors.zip_code && (
                <span className="text-danger">This field is required</span>
            )}
        </div>

    </div>)
})
export default AddressComponent
