import React from "react";
import PropTypes from "prop-types";

const Radio = props => {
  //console.log(props.options);
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.caption}</label>
      {props.options.map((option, index) => {
        return (
          <React.Fragment key={index}>
            <input
              type="radio"
              name={option.title}
              onClick={props.handleChange}
              value={option.value}
              checked={props.checked}
            />
            <label htmlFor={option.title}>{option.title}</label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const { string, func, number, oneOfType } = PropTypes;

Radio.propTypes = {
  name: string.isRequired,
  //type: string.isRequired,
  //onChange: func.isRequired,
  placeholder: string,
  value: oneOfType([string, number])
};

export default Radio;
