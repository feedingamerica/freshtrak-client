/**
 * Created by Basil on 06/04/20.
 */
import React from 'react';
import LogoComponent from '../General/LogoComponent';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
const FooterComponent = (props) => {
    let history = useHistory();
    return (
    	<div className="container pt-50">
                <div className="row">
                    <LogoComponent/>
                    <div className="col-lg-6 col-xl-6">
                        <div className="row">
                            <div className="col-md-6">
                                <span className="list-title">FIND RESOURCES</span>
                                <ul>
                                    <li onClick={()=>history.push('/freshtrak-about')}>About FreshTrak</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <span className="list-title">FOR FOODBANKS</span>
                                <ul>
                                    <li onClick={()=>history.push('freshtrak-working')}>Working with FreshTrak</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-2 pb-3">
                    <div className="col-md-12">
                        <p className="copy-right">© 2020 FreshTrak</p>
                    </div>
                </div>
            </div>
    )
};

export default withRouter(FooterComponent);