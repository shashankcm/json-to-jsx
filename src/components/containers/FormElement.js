import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";

import {
  Input,
  Checkbox,
  Select,
  Radio
} from "../HTMLElementComponents/allHtmlElements";

class FormElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {}
    };
  }
  handleCheckBox = e => {
    const newSelection = e.target.value;
    let name = e.target.name;
    let newSelectionArray;

    if (this.state.newUser.name.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.name.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newUser.name, newSelection];
    }
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, name: newSelectionArray }
    }));
  };
  handleRadioButton = value => {
    let lableName = "";
    this.props.htmlElements.sections.map(fe => {
      let fields = fe.fields;
      fields.map(keyname => {
        if (keyname.component === "radio") {
          return keyname.options.map(te => {
            if (te.value === value) {
              lableName = keyname.name;
              return lableName;
            }
          });
        }
      });
    });
    let name = lableName;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  };
  handleChange(e) {
    //console.log("HandleChange Called");
    let value = e.target.value;
    let name = e.target.name;
    //console.log("value", value, "name", name);
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log("Final Values", this.state);
  };
  render() {
    const props = this.props;
    //console.log("Props", props);
    /* let stepsDisplay = props.htmlElements.map((item, index) => {
      return (
        <span key={index}>
          {item.name}
          {item.name !== "" ? "-------->" : ""}
        </span>
      );
    }); */
    let htmlNodes = "";
    let singleItem = props.htmlElements;
    htmlNodes = (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <h3>{item.name}</h3> */}
          {/* <h1>{item.title}</h1> */}
          {singleItem.sections.map((it, index) => {
            return (
              <div key={index} className="form-row">
                <h2>{it.caption}</h2>
              </div>
            );
          })}
          {singleItem.sections.map((it, index) => {
            return (
              <div key={index} className="form-group row">
                {it.fields.map((fe, index) => {
                  return (
                    <div key={index} className="col-md-6">
                      {fe.component === "input" ? (
                        <Input
                          name={fe.name}
                          id={fe.name}
                          type={fe.type}
                          placeholder={fe.placeholder}
                          value={this.state.newUser[fe.name]}
                          handleChange={this.handleChange.bind(this)}
                          caption={fe.caption}
                        />
                      ) : fe.component === "select" ? (
                        <Select
                          name={fe.name}
                          id={fe.name}
                          handleChange={this.handleChange.bind(this)}
                          placeholder={fe.placeholder}
                          options={fe.options}
                          caption={fe.caption}
                        />
                      ) : fe.component === "checkbox" ? (
                        <Checkbox
                          name={fe.name}
                          handleChange={this.handleCheckBox}
                          value={this.state.newUser[fe.name]}
                          selectedOptions={this.state.newUser[fe.name]}
                          options={fe.options}
                        />
                      ) : fe.component === "radio" ? (
                        <React.Fragment>
                          <label>{fe.caption}</label>
                          <RadioGroup onChange={this.handleRadioButton}>
                            {fe.options.map((op, index) => {
                              return (
                                <RadioButton key={index} value={op.value}>
                                  {op.title}
                                </RadioButton>
                              );
                            })}
                          </RadioGroup>
                        </React.Fragment>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );

    //console.log(htmlNodes);
    return (
      <div>
        {/* {stepsDisplay} */}
        <span>completed</span>
        {htmlNodes}
      </div>
    );
  }
}
export default FormElement;
