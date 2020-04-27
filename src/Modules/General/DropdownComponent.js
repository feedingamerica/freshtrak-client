import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';


const DropdownComponent = ({ name, id, title ='Select' ,selectClassName, optionClassName,
                               items=[], onChangefunction, defaultValue='' }) => {
	return (<Form.Control as="select" onChange={onChangefunction} className={selectClassName} id={id} name={name} value={defaultValue || ''} items={items} title={title}>
                <option className={optionClassName} value="">{title}</option>
                {
                    items.map((item, i) => {
                           return (<option className={optionClassName} key={i} value={item.key}>{item.value}</option>)

                    })
                }
         </Form.Control>);
};

DropdownComponent.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onChangefunction: PropTypes.func.isRequired,
};

export default DropdownComponent;