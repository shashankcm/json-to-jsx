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
      newUser: {},
      steps: props.steps,
      stepCount: 0
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
    let lableName = "",
      completeData = this.props.htmlElements;
    completeData.map(oneItem => {
      oneItem.sections.map(fe => {
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
    });
    let name = lableName;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  };
  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log("Final Values", this.state);
  };
  handleFormPage = () => {
    const props = this.props;
    let completeData = props.htmlElements;

    if (completeData.length > 0) {
      this.setState(prevState => ({ stepCount: prevState.stepCount + 1 }));
    }
  };
  handlePrevFormPage = () => {
    //let currentStepCount = this.state.stepCount
    this.setState(prevState => ({ stepCount: prevState.stepCount - 1 }));
  };

  getNavStyles = (indx, length) => {
    let styles = [];
    for (let i = 0; i < length; i++) {
      if (i < indx) {
        styles.push("done");
      } else if (i === indx) {
        styles.push("doing");
      } else {
        styles.push("todo");
      }
    }
    return styles;
  };
  render() {
    const props = this.props;

    let completeData = props.htmlElements,
      htmlNodes = "",
      singleItem = "";
    singleItem = completeData[this.state.stepCount];
    console.log(this.props, "State in render");

    let stepsDisplay = (
      <ol className="progtrckr">
        {this.state.steps.map((s, i) => (
          <li
            key={i}
            className={
              "progtrckr-" +
              this.getNavStyles(this.state.stepCount, this.state.steps.length)[
                i
              ]
            }
            style={{ listStyleType: "none" }}
          >
            {this.state.steps[i] + 1}
          </li>
        ))}
      </ol>
    );
    console.log(
      this.getNavStyles(this.state.stepCount, this.state.steps.length)
    );

    if (this.state.stepCount < this.state.steps.length) {
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
                            //value={this.state.newUser[fe.name]}
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
            <button
              className={
                this.state.stepCount <= 0
                  ? "btn btn-secondary btn-lg float-left"
                  : "btn btn-primary btn-lg float-left"
              }
              disabled={this.state.stepCount <= 0}
              onClick={this.handlePrevFormPage}
            >
              previous
            </button>
            {this.state.stepCount < this.state.steps.length - 1 ? (
              <input
                type="button"
                value="next"
                className="btn btn-primary btn-lg float-right"
                onClick={this.handleFormPage}
              />
            ) : (
              <input
                type="button"
                value="submit"
                className="btn btn-primary btn-lg float-right"
              />
            )}
          </form>
        </div>
      );
    } else {
      htmlNodes = <div>No Page Found</div>;
    }
    return (
      <div>
        {stepsDisplay}
        {htmlNodes}
      </div>
    );
  }
}
export default FormElement;
