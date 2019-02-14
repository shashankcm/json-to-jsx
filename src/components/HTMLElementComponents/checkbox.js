import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
  return (
    <div className="form-label">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <div className="checkbox-group">
        {props.options.map(option => {
          return (
            <label key={option}>
              <input
                className="form-checkbox"
                id={props.name}
                name={props.name}
                onChange={props.handleCheckBox}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type="checkbox"
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};

const { string, func, number, oneOfType } = PropTypes;

Checkbox.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  type: string.isRequired,
  onChange: func.isRequired,
  value: oneOfType([string, number])
};

export default Checkbox;
