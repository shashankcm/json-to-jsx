import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  //console.log(props);
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.caption}
      </label>
      <input
        className="form-control"
        name={props.name}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

const { string, func, number, oneOfType } = PropTypes;

Input.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  type: string.isRequired,
  //onChange: func.isRequired,
  placeholder: string,
  value: oneOfType([string, number])
};

export default Input;
