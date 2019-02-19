import React from "react";
import PropTypes from "prop-types";

const Select = props => {
  console.log(props);
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.caption}</label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-control"
      >
        {/*         <option value="--Please Select--" disabled>
          {props.placeholder}
        </option> */}
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.value} label={option.title}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const { string, func, number, oneOfType } = PropTypes;

Select.propTypes = {
  name: string.isRequired,
  //type: string.isRequired,
  //onChange: func.isRequired,
  placeholder: string,
  value: oneOfType([string, number])
};

export default Select;
