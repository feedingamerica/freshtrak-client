import React, { forwardRef } from "react";
import { Fragment } from "react";
import closeIcon from '../../Assets/img/close.svg';

const FilterComponent = forwardRef(({distance, serviceCat, closeFilter}, ref) => {
 
  return (
      <Fragment>
        { (distance.show || serviceCat.show) && (
        <div className="advance-search-results search-results px-5">
          <div className="row">
            <div className="col-md-12">
              <span className="search-list-title">Refine your results</span>
              {/* <span
                className="day-view-title float-right"
                onClick={ (e) => closeFilter(e)}
              > close</span> */}
               <button className="filter-close float-right" onClick={ (e) => closeFilter(e)}>
                <img alt="close filter" src={closeIcon}/>
              </button>
            </div>
          </div>
          <div className=" row align-items-end pt-3">
            <div className="col-sm-3 search-order-1">
              { distance.show && (
                <div className="form-group" >
                  <label htmlFor="distance">by Distance</label>
                  <select
                    className= {`form-control`}
                    name="distance"
                    id="distance"
                    defaultValue={distance.defaultValue}
                    onChange={ (e) => {
                      distance.onChangeHandler(e)
                      }
                    }
                  >
                    <option value="" defaultValue></option>
                    <option value="3">3 mi</option>
                    <option value="5">5 mi</option>
                    <option value="10">10 mi</option>
                    <option value="25">25 mi</option>
                    <option value="50">50 mi</option>
                  </select>
                </div>
              )}
            </div>
            <div className="col-sm-3 search-order-1">
              { serviceCat.show && (
                <div className="form-group" >
                  <label htmlFor="distance">by Service Category</label>
                  <select
                    className= {`form-control`}
                    name="serviceCat"
                    id="serviceCat"
                    defaultValue={serviceCat.defaultValue}
                    onChange={ (e) => {
                      serviceCat.onChangeHandler(e)
                      }
                    }
                  >
                    <option value="" defaultValue></option>
                    <option value="Choice Pantry">Choice Pantry</option>
                    <option value="Prepack Pantry">Prepack Pantry</option>
                    <option value="Produce">Produce</option>
                    <option value="Meal">Meal</option>
                    <option value="Supportive Services">Supportive Services</option>
                    <option value="CSFP">CSFP</option>
                    <option value="Case Management">Case Management</option>
                    <option value="Water">Water</option>
                    <option value="Purchased Products">Purchased Products</option>
                  </select>
                </div>
              )}
            </div>
            <div className="col-sm-3 search-order-1">
            </div>
            <div className="col-sm-3 search-order-1">
            </div>
          </div>
        </div>
        )}
      </Fragment>
  );
});

export default FilterComponent;
